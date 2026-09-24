type ChatResponse = {
  success: boolean;
  message: string;
  error?: {
    code: string;
    message: string;
  };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/api/v1/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const payload = (await response.json()) as ChatResponse;

  if (!response.ok || payload.success === false) {
    const messageText = payload.error?.message || "Unable to process AI request";
    throw new Error(messageText);
  }

  return payload;
}
