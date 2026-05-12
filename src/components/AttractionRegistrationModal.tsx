import React, { useState } from 'react';
import './AttractionRegistrationModal.css';

interface Attraction {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: string;
}

interface Props {
  attraction: Attraction;
  registeredCount: number;
  maxCapacity?: number;
  onClose: () => void;
  onSubmit?: (personName: string, email: string, personCount: number) => Promise<void> | void;
}

const AttractionRegistrationModal: React.FC<Props> = ({ attraction, registeredCount, maxCapacity = 100, onClose, onSubmit }) => {
  const [personName, setPersonName] = useState('');
  const [email, setEmail] = useState('');
  const [personCount, setPersonCount] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const remaining = Math.max(0, maxCapacity - registeredCount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!personName.trim()) {
      setError('Bitte Namen eingeben.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Bitte eine gültige E-Mail eingeben.');
      return;
    }
    if (personCount < 1) {
      setError('Anzahl der Personen muss mindestens 1 sein.');
      return;
    }
    if (personCount > remaining) {
      setError(`Nur noch ${remaining} Plätze verfügbar.`);
      return;
    }

    try {
      setSubmitting(true);

      // Wenn ein externer onSubmit-Handler vorhanden ist, nutze ihn (vermeidet doppelte POST)
      if (onSubmit) {
        await onSubmit(personName.trim(), email.trim(), personCount);
      } else {
        // Versuche die Registrierung über das Backend selbst zu senden
        const response = await fetch('http://localhost:5000/register-attraction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            attractionId: attraction.id,
            attractionTitle: attraction.title,
            personName: personName.trim(),
            email: email.trim(),
            personCount,
            maxCapacity
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Fehler beim Buchen.');
        }
      }

      setSuccess('Buchung erfolgreich. Vielen Dank!');

      // Formular zurücksetzen
      setPersonName('');
      setEmail('');
      setPersonCount(1);

      // Schließe Modal kurz nach erfolgreicher Buchung
      setTimeout(() => onClose(), 1000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Fehler beim Absenden.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="arm-overlay" role="dialog" aria-modal="true">
      <div className="arm-modal">
        <header className="arm-header">
          <h3>{attraction.icon} {attraction.title}</h3>
          <button className="arm-close" onClick={onClose} aria-label="Schließen">✕</button>
        </header>

        <div className="arm-body">
          <p className="arm-description">{attraction.description}</p>
          <p className="arm-time"><strong>⏰ {attraction.time}</strong></p>

          <div className="arm-capacity">
            <p>Angemeldet heute: <strong>{registeredCount}</strong></p>
            <p>Max. Teilnehmer gesamt: <strong>{maxCapacity}</strong></p>
            <p>Verfügbar: <strong>{remaining}</strong></p>
          </div>

          <form className="arm-form" onSubmit={handleSubmit}>
            <label>
              Dein Name
              <input name="personName" placeholder="Vor- und Nachname" required type="text" value={personName} onChange={e => setPersonName(e.target.value)} disabled={submitting} />
            </label>

            <label>
              E-Mail
              <input name="email" placeholder="name@beispiel.de" required type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={submitting} />
            </label>

            <label>
              Personen
              <input name="personCount" placeholder="1" required type="number" min={1} max={remaining} value={personCount} onChange={e => setPersonCount(Number(e.target.value))} disabled={submitting} />
            </label>

            {error && <p className="arm-error" role="alert">{error}</p>}
            {success && <p className="arm-success" role="status">{success}</p>}

            <div className="arm-actions">
              <button type="button" className="btn-secondary" onClick={onClose} disabled={submitting}>Abbrechen</button>
              <button type="submit" className="btn-primary" disabled={submitting || remaining <= 0}>
                {submitting ? 'Sende...' : 'Anmelden'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AttractionRegistrationModal;
