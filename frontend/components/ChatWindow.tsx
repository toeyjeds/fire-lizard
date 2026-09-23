"use client";

import { useEffect, useState } from "react";

import { ChatInput } from "@/components/ChatInput";
import { ChatMessage } from "@/components/ChatMessage";
import { Loading } from "@/components/Loading";
import { checkHealth, sendMessage } from "@/services/api";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

const starters = [
  "Give me a bold hackathon idea",
  "Help me turn a rough thought into a plan",
  "What should I prototype this afternoon?",
];

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    checkHealth().then(setIsOnline);
  }, []);

  async function handleSubmit(content: string) {
    setError("");
    setIsLoading(true);
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: "user", content }]);

    try {
      const response = await sendMessage(content);
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: response.message }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="chat-shell" aria-label="AI conversation">
      <div className="chat-header">
        <div>
          <p className="eyebrow">CONVERSATION / 001</p>
          <h2>Make the next<br /><em>move.</em></h2>
        </div>
        <div className={`status ${isOnline ? "status-online" : "status-offline"}`}>
          <span className="status-dot" />
          {isOnline ? "SYSTEM ONLINE" : "CONNECTING"}
        </div>
      </div>

      <div className="conversation" aria-live="polite">
        {messages.length === 0 && !isLoading ? (
          <div className="empty-state">
            <div className="signal-mark" aria-hidden="true">+</div>
            <p className="empty-kicker">A clean page is a powerful thing.</p>
            <p className="empty-copy">Start with a prompt below. Lumen is here to help you find signal, momentum, and a sharper next step.</p>
            <div className="starter-list">
              {starters.map((starter) => (
                <button key={starter} type="button" onClick={() => handleSubmit(starter)}>{starter}<span>-&gt;</span></button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
            {isLoading && <Loading />}
          </>
        )}
      </div>

      {error && <p className="error-message" role="alert">{error}</p>}
      <ChatInput disabled={isLoading} onSubmit={handleSubmit} />
      <p className="composer-note">LUMEN CAN MAKE MISTAKES. CHECK IMPORTANT DETAILS.</p>
    </section>
  );
}
