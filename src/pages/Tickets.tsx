import { useMemo, useState } from "react";
import type { FormEvent } from "react";
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
  const [form, setForm] = useState<TicketForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const totalTickets = form.adults + form.children + form.family;

  const totalPrice = useMemo(
    () =>
      form.adults * ticketTypes[0].price +
      form.children * ticketTypes[1].price +
      form.family * ticketTypes[2].price,
    [form.adults, form.children, form.family]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const updateForm = <K extends keyof TicketForm>(field: K, value: TicketForm[K]) => {
    setSubmitted(false);
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
              disabled={totalTickets === 0}
            >
              Jetzt bestellen
            </button>
          </form>

          {submitted && (
            <div className="tickets-success" role="status">
              <h4>Bestellung erfasst</h4>
              <p>
                Vielen Dank, {form.fullName}. Ihre Anfrage fuer den{" "}
                {form.visitDate || "gewaehlten Tag"} mit {totalTickets} Ticket
                {totalTickets === 1 ? "" : "s"} wurde vorbereitet.
              </p>
              <p>Unser Team kann die Bestellung nun weiterbearbeiten.</p>
            </div>
          )}
        </article>
      </section>
    </div>
  );
};

export default Tickets;
