import { ServiceStatus } from "../components/service-status";

export default function HomePage() {
  return (
    <main className="shell">
      <section className="masthead">
        <p className="kicker">Cash Delivery Service</p>
        <h1>CDS Operations</h1>
        <p className="subtitle">Delivery network readiness</p>
      </section>
      <section aria-label="Service status" className="status-grid">
        <ServiceStatus />
      </section>
    </main>
  );
}