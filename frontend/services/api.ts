import type { ChatResponse } from "@/types/chat";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function sendMessage(message: string): Promise<ChatResponse> {
  const response = await fetch(`${apiUrl}/api/v1/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("The AI service could not process that request.");
  }

  return response.json() as Promise<ChatResponse>;
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${apiUrl}/api/v1/health`, { cache: "no-store" });
    return response.ok;
  } catch {
    return false;
  }
}
