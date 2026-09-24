"use client";

import { useState } from "react";
import { ChatInput } from "@/components/ChatInput";
import { ChatWindow } from "@/components/ChatWindow";
import { Loading } from "@/components/Loading";
import { sendChatMessage } from "@/services/api";
import type { ChatMessage } from "@/types/chat";

const initialMessages: ChatMessage[] = [
  { role: "assistant", content: "Hello! How can I help you?" },
];

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) {
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: trimmedMessage }]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await sendChatMessage(trimmedMessage);
      setMessages((prev) => [...prev, { role: "assistant", content: response.message }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: error instanceof Error ? error.message : "Unable to process AI request." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          background: "#ffffff",
          borderRadius: 24,
          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.12)",
          padding: 24,
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <p style={{ margin: 0, color: "#2563eb", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            AI Hackathon Demo
          </p>
          <h1 style={{ margin: "0.5rem 0 0", fontSize: "clamp(2rem, 5vw, 3rem)" }}>Start a conversation</h1>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <ChatWindow messages={messages} />
          {isLoading ? (
            <div style={{ paddingTop: 8 }}>
              <Loading />
            </div>
          ) : null}
          <ChatInput value={message} onChange={setMessage} onSubmit={handleSubmit} disabled={isLoading} />
        </div>
      </div>
    </main>
  );
}
