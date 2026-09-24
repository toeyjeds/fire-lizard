"use client";

import { useEffect, useState } from "react";
import { getGatewayHealth } from "../services/health-service";

type Status = "CHECKING" | "UP" | "UNAVAILABLE";

export function ServiceStatus() {
  const [status, setStatus] = useState<Status>("CHECKING");

  useEffect(() => {
    let active = true;
    getGatewayHealth().then((result) => {
      if (active) {
        setStatus(result ? "UP" : "UNAVAILABLE");
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <article className="status-card">
      <p className="status-label">Gateway</p>
      <p className="status-value" data-state={status === "UP" ? "up" : status === "UNAVAILABLE" ? "down" : undefined}>{status}</p>
    </article>
  );
}