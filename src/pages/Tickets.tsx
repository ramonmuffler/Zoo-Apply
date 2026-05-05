import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "../context/useAuth";
import "./Tickets.css";

const ticketTypes = [
  { id: "adults", label: "Erwachsene", price: 15 },
  { id: "children", label: "Kinder (6-12 Jahre)", price: 10 },
  { id: "family", label: "Familienpaket", price: 42 },
] as const;

type TicketForm = {
  visitDate: string;
  adults: number;
  children: number;
  family: number;
  fullName: string;
};

const initialForm: TicketForm = {
  visitDate: "",
  adults: 2,
  children: 0,
  family: 0,
  fullName: "",
};

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const Tickets = () => {
  const { username } = useAuth();
  const [form, setForm] = useState<TicketForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const totalTickets = form.adults + form.children + form.family;

  const totalPrice = useMemo(
    () =>
      form.adults * ticketTypes[0].price +
      form.children * ticketTypes[1].price +
      form.family * ticketTypes[2].price,
    [form.adults, form.children, form.family]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setSubmitted(false);
    setFeedbackMessage("");

    try {
      const response = await fetch("http://localhost:5000/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          totalTickets,
          totalPrice,
          username,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFeedbackMessage(data.message || "Ticketbestellung konnte nicht gespeichert werden.");
        return;
      }

      setSubmitted(true);
      setFeedbackMessage(data.message || "Ticketbestellung erfolgreich gespeichert!");
      setForm(initialForm);
    } catch {
      setFeedbackMessage("Server nicht erreichbar!");
    } finally {
      setIsSaving(false);
    }
  };

  const updateForm = <K extends keyof TicketForm>(field: K, value: TicketForm[K]) => {
    setSubmitted(false);
    setFeedbackMessage("");
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  return (
    <div className="tickets">
      <section className="tickets-hero">
        <h2>Tickets bestellen</h2>
        <p>
          Planen Sie Ihren Zoobesuch bequem online und sichern Sie sich Ihre
          Eintrittstickets im Voraus.
        </p>
      </section>

      <section className="tickets-layout">
        <article className="tickets-card tickets-prices">
          <h3>Eintrittspreise</h3>
          <div className="tickets-price-list">
            {ticketTypes.map((ticket) => (
              <div key={ticket.id} className="tickets-price-row">
                <span>{ticket.label}</span>
                <strong>{ticket.price} CHF</strong>
              </div>
            ))}
          </div>
          <p className="tickets-note">
            Kinder unter 6 Jahren erhalten kostenlosen Eintritt und benötigen
            kein separates Ticket.
          </p>
        </article>

        <article className="tickets-card">
          <h3>Bestellformular</h3>
          <form className="tickets-form" onSubmit={handleSubmit}>
            <label className="tickets-field tickets-date-field">
              Besuchsdatum
              <input
                className="tickets-date-input"
                type="date"
                value={form.visitDate}
                min={getToday()}
                onChange={(event) => updateForm("visitDate", event.target.value)}
                required
              />
            </label>

            <div className="tickets-quantity-grid">
              <label>
                Erwachsene
                <input
                  type="number"
                  min="0"
                  value={form.adults}
                  onChange={(event) =>
                    updateForm("adults", Number(event.target.value))
                  }
                />
              </label>

              <label>
                Kinder
                <input
                  type="number"
                  min="0"
                  value={form.children}
                  onChange={(event) =>
                    updateForm("children", Number(event.target.value))
                  }
                />
              </label>

              <label>
                Familienpakete
                <input
                  type="number"
                  min="0"
                  value={form.family}
                  onChange={(event) =>
                    updateForm("family", Number(event.target.value))
                  }
                />
              </label>
            </div>

            <label className="tickets-field">
              Vollständiger Name
              <input
                type="text"
                value={form.fullName}
                onChange={(event) => updateForm("fullName", event.target.value)}
                placeholder="Max Muster"
                required
              />
            </label>

            <div className="tickets-summary">
              <div>
                <span>Anzahl Tickets</span>
                <strong>{totalTickets}</strong>
              </div>
              <div>
                <span>Gesamtpreis</span>
                <strong>{totalPrice} CHF</strong>
              </div>
            </div>

            <button
              type="submit"
              className="tickets-submit"
              disabled={totalTickets === 0 || isSaving}
            >
              {isSaving ? "Speichert..." : "Jetzt bestellen"}
            </button>
          </form>

          {feedbackMessage && (
            <div
              className={submitted ? "tickets-success" : "tickets-note"}
              role="status"
            >
              {submitted ? (
                <>
                  <h4>Bestellung erfasst</h4>
                  <p>{feedbackMessage}</p>
                  <p>Unser Team kann die Bestellung nun weiterbearbeiten.</p>
                </>
              ) : (
                <p>{feedbackMessage}</p>
              )}
            </div>
          )}
        </article>
      </section>
    </div>
  );
};

export default Tickets;
