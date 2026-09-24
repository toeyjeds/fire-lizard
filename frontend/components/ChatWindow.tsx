import { ChatMessage } from "@/components/ChatMessage";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

type ChatWindowProps = {
  messages: ChatMessageType[];
};

export function ChatWindow({ messages }: ChatWindowProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        minHeight: 300,
        maxHeight: 420,
        overflowY: "auto",
        padding: 16,
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 18,
      }}
    >
      {messages.map((message) => (
        <ChatMessage key={`${message.role}-${message.content}-${Math.random()}`} message={message} />
      ))}
    </div>
  );
}
