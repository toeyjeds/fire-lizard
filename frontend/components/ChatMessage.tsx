import type { ChatMessage as ChatMessageType } from "@/types/chat";

type ChatMessageProps = {
  message: ChatMessageType;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "80%",
        background: isUser ? "#2563eb" : "#f3f4f6",
        color: isUser ? "#ffffff" : "#111827",
        borderRadius: 16,
        padding: "0.9rem 1rem",
        boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
      }}
    >
      {message.content}
    </div>
  );
}
