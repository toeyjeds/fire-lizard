type ChatInputProps = {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function ChatInput({ value, disabled, onChange, onSubmit }: ChatInputProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !disabled) {
      onSubmit();
    }
  };

  return (
    <div style={{ display: "flex", gap: 12, width: "100%" }}>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={disabled}
        style={{
          flex: 1,
          border: "1px solid #d1d5db",
          borderRadius: 12,
          padding: "0.85rem 1rem",
          fontSize: 16,
          outline: "none",
          background: disabled ? "#f3f4f6" : "#ffffff",
        }}
      />
      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
        style={{
          border: "none",
          borderRadius: 12,
          padding: "0.85rem 1.25rem",
          background: disabled || !value.trim() ? "#9ca3af" : "#2563eb",
          color: "#ffffff",
          fontWeight: 600,
          cursor: disabled || !value.trim() ? "not-allowed" : "pointer",
        }}
      >
        {disabled ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
