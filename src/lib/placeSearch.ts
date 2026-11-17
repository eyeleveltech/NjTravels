import { PLACE_ALIASES, PlaceItem } from "@/data/placeAliases";

/**
 * Place autocomplete, run in the browser so the site can be served as a static
 * export (no Node server). Local aliases first, then Photon (OpenStreetMap).
 */

function abortError() {
  return new DOMException("The search was cancelled.", "AbortError");
}

function searchLocal(query: string): PlaceItem[] {
  const groupA: PlaceItem[] = []; // Name starts with query
  const groupB: PlaceItem[] = []; // Alias starts with query
  const groupC: PlaceItem[] = []; // Name or alias contains query

  for (const place of PLACE_ALIASES) {
    const nameLower = place.name.toLowerCase();
    const aliasesLower = place.aliases.map((a) => a.toLowerCase());

    if (nameLower.startsWith(query)) {
      groupA.push(place);
    } else if (aliasesLower.some((a) => a.startsWith(query))) {
      groupB.push(place);
    } else if (nameLower.includes(query) || aliasesLower.some((a) => a.includes(query))) {
      groupC.push(place);
    }
  }

  const sortAlpha = (a: PlaceItem, b: PlaceItem) => a.name.localeCompare(b.name);
  return [...groupA.sort(sortAlpha), ...groupB.sort(sortAlpha), ...groupC.sort(sortAlpha)];
}

async function searchPhoton(query: string, signal?: AbortSignal): Promise<PlaceItem[]> {
  // Give the geocoder 1.8s; stop early if the caller cancels.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1800);
  const onAbort = () => controller.abort();
  signal?.addEventListener("abort", onAbort, { once: true });

  try {
    const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=10`, {
      signal: controller.signal,
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data?.features)) return [];

    return data.features
      .map((f: Record<string, unknown>, idx: number) => {
        const props = (f.properties as Record<string, string | undefined>) || {};
        const geometry = f.geometry as { coordinates?: [number, number] } | undefined;
        const coords = geometry?.coordinates || [0, 0];
        const name = props.name || props.city || "";
        if (!name) return null;

        const osmType = props.osm_value || props.type || "locality";
        const placeType =
          osmType === "aerodrome" || osmType === "airport"
            ? "airport"
            : osmType === "city" || osmType === "town"
            ? "city"
            : "locality";

        return {
          id: `geo-${props.osm_id || idx}-${name}`,
          name,
          region: props.state || props.county || props.district || props.city || "",
          country: props.country || "",
          countryCode: (props.countrycode || "XX").toUpperCase(),
          type: placeType,
          lat: coords[1] || 0,
          lng: coords[0] || 0,
          aliases: [name.toLowerCase()],
        } as PlaceItem;
      })
      .filter(Boolean);
  } catch {
    // Geocoder failed or timed out: carry on with local results only.
    return [];
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", onAbort);
  }
}

/** Up to 8 matches. Rejects with an AbortError if `signal` is aborted. */
export async function searchPlaces(rawQuery: string, signal?: AbortSignal): Promise<PlaceItem[]> {
  const query = rawQuery.trim().toLowerCase();
  if (query.length < 2) return [];

  const localMatches = searchLocal(query);
  const externalMatches = await searchPhoton(query, signal);
  if (signal?.aborted) throw abortError();

  // Merge and deduplicate by place id or name + country
  const seen = new Set<string>();
  const merged: PlaceItem[] = [];
  for (const item of [...localMatches, ...externalMatches]) {
    const key = `${item.name.toLowerCase()}|${item.country.toLowerCase()}`;
    if (!seen.has(key) && !seen.has(item.id)) {
      seen.add(key);
      seen.add(item.id);
      merged.push(item);
    }
    if (merged.length >= 8) break;
  }
  return merged;
}
