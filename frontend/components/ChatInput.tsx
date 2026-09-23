"use client";

import { FormEvent, useState } from "react";

interface ChatInputProps {
  disabled: boolean;
  onSubmit: (message: string) => void;
}

export function ChatInput({ disabled, onSubmit }: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;
    onSubmit(trimmedMessage);
    setMessage("");
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="message">Ask Lumen anything</label>
      <textarea
        id="message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Ask a question, shape an idea, or start somewhere..."
        rows={1}
        maxLength={4000}
        disabled={disabled}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
      />
      <button type="submit" disabled={disabled || !message.trim()} aria-label="Send message">
        <span>{disabled ? "Working" : "Send"}</span>
        <span aria-hidden="true">-&gt;</span>
      </button>
    </form>
  );
}
