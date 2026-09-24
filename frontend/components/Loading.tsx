export function Loading() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#374151" }}>
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          border: "3px solid #d1d5db",
          borderTopColor: "#2563eb",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span>Thinking...</span>
    </div>
  );
}
