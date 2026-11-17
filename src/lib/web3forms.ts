export interface Web3FormsResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

export async function submitWeb3Form(
  data: Record<string, unknown>
): Promise<Web3FormsResponse> {
  const accessKey =
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    "ab679522-85e0-4e84-8ca5-a5b980cd95e6";

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      botcheck: "",
      ...data,
    }),
  });

  const result = (await response.json()) as Web3FormsResponse;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "We could not send your submission. Please try again.");
  }

  return result;
}
