import { FARE_RATES, mapVehicleToFareCategory } from "@/data/fareRates";
import { getFallbackRouteDistance } from "@/data/routes";
import { PLACE_ALIASES } from "@/data/placeAliases";

/**
 * Indicative fare estimate, computed in the browser so the site can be served
 * as a static export (no Node server).
 */

export type EstimateResult =
  | {
      type: "calculated";
      total: number;
      billableKm: number;
      distanceCharge: number;
      driverBatta: number;
      nightAllowance: number;
      days: number;
      nights: number;
      distanceText?: string;
      distance?: number;
      returnDistance?: number;
      totalKm?: number;
      ratePerKm?: number;
      indicative?: boolean;
    }
  | {
      type: "team-to-confirm" | "local" | "error";
      message?: string;
      indicative?: boolean;
    };

type PlaceInput = string | { name?: string; countryCode?: string; lat?: number; lng?: number } | null | undefined;

export interface EstimateRequest {
  tripType?: string;
  from?: PlaceInput;
  to?: PlaceInput;
  travelDate?: string;
  returnDate?: string;
  timeSlot?: string;
  vehicleId?: string;
  vehicleCategory?: string;
}

const NIGHT_SLOTS = ["6–9 PM", "9 PM–12 AM", "12–4 AM"];

const TEAM_TO_CONFIRM: EstimateResult = {
  type: "team-to-confirm",
  message: "Our team will calculate the exact fare for this route and contact you.",
  indicative: true,
};

function isNightSlot(slot: string | undefined): boolean {
  if (!slot) return false;
  const norm = slot.replace("–", "-").trim();
  return NIGHT_SLOTS.some((ns) => ns.replace("–", "-") === norm);
}

function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number | null {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface Coords {
  lat: number;
  lng: number;
}

function resolvePlaceCoords(place: PlaceInput, placeName: string): Coords | null {
  if (
    place &&
    typeof place === "object" &&
    typeof place.lat === "number" &&
    typeof place.lng === "number" &&
    place.lat !== 0 &&
    place.lng !== 0
  ) {
    return { lat: place.lat, lng: place.lng };
  }

  const query = (placeName || "").toLowerCase().trim();
  if (!query) return null;

  // Search local place database
  const match = PLACE_ALIASES.find((p) => {
    const pName = p.name.toLowerCase();
    const pId = p.id.toLowerCase();
    if (query === pName || query === pId) return true;
    if (p.aliases.some((a) => query === a.toLowerCase())) return true;
    if (query.includes(pName) || pName.includes(query)) return true;
    return false;
  });

  if (match && match.lat && match.lng) {
    return { lat: match.lat, lng: match.lng };
  }

  return null;
}

async function fetchOsrmDistance(
  fromLng: number,
  fromLat: number,
  toLng: number,
  toLat: number
): Promise<number | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${toLng},${toLat}?overview=false`;
    const res = await fetch(osrmUrl, { signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (data?.routes?.[0]?.distance) {
        return Math.round(data.routes[0].distance / 1000);
      }
    }
  } catch {
    // Graceful fallback
  }
  return null;
}

export async function estimateFare(req: EstimateRequest): Promise<EstimateResult> {
  try {
    const { tripType, from, to, travelDate, returnDate, timeSlot, vehicleId, vehicleCategory } = req;

    const fromName = typeof from === "string" ? from.trim() : from?.name?.trim() || "";
    const toName = typeof to === "string" ? to.trim() : to?.name?.trim() || "";
    const fromCountry = typeof from === "object" && from ? from.countryCode || "IN" : "IN";
    const toCountry = typeof to === "object" && to ? to.countryCode || "IN" : "IN";

    if (!fromName || !toName) return TEAM_TO_CONFIRM;

    // Either place outside India
    if (fromCountry !== "IN" || toCountry !== "IN") {
      return { type: "team-to-confirm", message: "Our team will quote international trips.", indicative: true };
    }

    // Resolve coordinates for accurate road routing
    const fromCoords = resolvePlaceCoords(from, fromName);
    const toCoords = resolvePlaceCoords(to, toName);

    // Same city (same normalised name, or under 5 km apart)
    const normFromName = fromName.toLowerCase().replace(/ airport.*$/i, "").trim();
    const normToName = toName.toLowerCase().replace(/ airport.*$/i, "").trim();
    let straightLineDist: number | null = null;
    if (fromCoords && toCoords) {
      straightLineDist = haversineDistanceKm(fromCoords.lat, fromCoords.lng, toCoords.lat, toCoords.lng);
    }

    if (normFromName === normToName || (straightLineDist !== null && straightLineDist < 5)) {
      return {
        type: "local",
        message: "Local trips are priced by package. Our team will confirm.",
        indicative: true,
      };
    }

    // Actual road distance via OSRM, with a fallback table
    let distance: number | null = null; // Outbound distance
    let returnDistance: number | null = null; // Return distance for round trips

    const tripTypeNorm = (tripType || "").toString().toLowerCase().trim();
    const isRoundTrip =
      tripTypeNorm === "round trip" ||
      tripTypeNorm === "round" ||
      tripTypeNorm === "round-trip" ||
      tripTypeNorm === "roundtrip";

    if (fromCoords && toCoords) {
      distance = await fetchOsrmDistance(fromCoords.lng, fromCoords.lat, toCoords.lng, toCoords.lat);
      if (distance !== null && isRoundTrip) {
        const retDist = await fetchOsrmDistance(toCoords.lng, toCoords.lat, fromCoords.lng, fromCoords.lat);
        returnDistance = retDist !== null ? retDist : distance;
      }
    }

    if (distance === null) {
      const fallbackDist = getFallbackRouteDistance(fromName, toName);
      if (fallbackDist !== null) {
        distance = fallbackDist;
        returnDistance = isRoundTrip ? fallbackDist : null;
      }
    }

    if (!distance) return TEAM_TO_CONFIRM;

    const categoryKey = mapVehicleToFareCategory(vehicleCategory || vehicleId || "Sedan");
    const rate = FARE_RATES[categoryKey] || FARE_RATES["Sedan"];

    let days = 1;
    if (isRoundTrip && travelDate && returnDate) {
      const d1 = new Date(travelDate + "T00:00:00");
      const d2 = new Date(returnDate + "T00:00:00");
      const diffDays = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
      days = Math.max(1, (diffDays >= 0 ? diffDays : 0) + 1);
    }

    const returnKm = returnDistance ?? distance;
    // Total Distance = Outbound + Return; Estimated Total = Total Distance × rate per km.
    // Driver batta, night allowance and min-km multipliers are not added to the displayed estimate.
    const totalKm = isRoundTrip ? distance + returnKm : distance;
    const distanceCharge = Math.round(totalKm * rate.ratePerKm);
    const driverBatta = rate.driverBattaPerDay * days;

    let nights = 0;
    let nightAllowance = 0;
    if (isNightSlot(timeSlot)) {
      nights = Math.max(1, days - 1);
      nightAllowance = rate.nightAllowancePerNight * nights;
    }

    return {
      type: "calculated",
      total: distanceCharge,
      distance,
      returnDistance: isRoundTrip ? returnKm : undefined,
      distanceText: isRoundTrip
        ? `About ${totalKm} km road trip (${distance} km outbound + ${returnKm} km return)`
        : `About ${distance} km by road`,
      totalKm,
      billableKm: totalKm,
      days,
      nights,
      ratePerKm: rate.ratePerKm,
      distanceCharge,
      driverBatta,
      nightAllowance,
      indicative: true,
    };
  } catch (err: unknown) {
    return { type: "error", message: err instanceof Error ? err.message : "Failed to calculate estimate" };
  }
}
