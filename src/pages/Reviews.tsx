import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "../context/useAuth";
import "./Reviews.css";

type Review = {
  _id?: string;
  name: string;
  visitType: string;
  rating: number;
  message: string;
};

const ratingLabels: Record<number, string> = {
  1: "Verbesserungsbeduerftig",
  2: "In Ordnung",
  3: "Gut",
  4: "Sehr gut",
  5: "Hervorragend",
};

const Reviews = () => {
  const { username } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [visitType, setVisitType] = useState("Familienbesuch");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/reviews");
        const data = await response.json();

        if (!response.ok) {
          setFeedbackMessage(data.message || "Bewertungen konnten nicht geladen werden.");
          return;
        }

        setReviews(data);
      } catch {
        setFeedbackMessage("Server nicht erreichbar!");
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return "0.0";
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setFeedbackMessage("");

    try {
      const response = await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          visitType,
          rating,
          message,
          username,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFeedbackMessage(data.message || "Bewertung konnte nicht gespeichert werden.");
        return;
      }

      setReviews((currentReviews) => [data.review, ...currentReviews]);
      setName("");
      setVisitType("Familienbesuch");
      setRating(5);
      setMessage("");
      setFeedbackMessage(data.message || "Bewertung erfolgreich gespeichert!");
    } catch {
      setFeedbackMessage("Server nicht erreichbar!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="reviews">
      <section className="reviews-hero">
        <div>
          <p className="reviews-eyebrow">Besucherstimmen</p>
          <h2>Wie hat Ihnen Ihr Zoobesuch gefallen?</h2>
          <p>
            Teilen Sie Ihre Eindruecke mit anderen Gaesten und helfen Sie uns,
            das Besuchserlebnis laufend weiterzuentwickeln.
          </p>
        </div>

        <div className="reviews-score-card">
          <strong>{averageRating} / 5</strong>
          <span>Durchschnitt aus {reviews.length} Bewertungen</span>
          <p>{ratingLabels[Math.max(1, Math.round(Number(averageRating)))]}</p>
        </div>
      </section>

      <section className="reviews-layout">
        <article className="reviews-panel">
          <h3>Bewertung abgeben</h3>
          <form className="reviews-form" onSubmit={handleSubmit}>
            <label>
              Ihr Name
              <input
                type="text"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setFeedbackMessage("");
                }}
                placeholder="Max Muster"
                required
              />
            </label>

            <label>
              Besuchsart
              <select
                value={visitType}
                onChange={(event) => {
                  setVisitType(event.target.value);
                  setFeedbackMessage("");
                }}
              >
                <option>Familienbesuch</option>
                <option>Schulausflug</option>
                <option>Paarbesuch</option>
                <option>Einzelbesuch</option>
              </select>
            </label>

            <fieldset className="reviews-rating">
              <legend>Ihre Bewertung</legend>
              <div className="reviews-stars" role="radiogroup" aria-label="Bewertung">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={value <= rating ? "is-active" : ""}
                    onClick={() => {
                      setRating(value);
                      setFeedbackMessage("");
                    }}
                    aria-pressed={value === rating}
                  >
                    Stern {value}
                  </button>
                ))}
              </div>
              <p>{ratingLabels[rating]}</p>
            </fieldset>

            <label>
              Ihr Feedback
              <textarea
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  setFeedbackMessage("");
                }}
                placeholder="Was hat Ihnen besonders gefallen?"
                rows={5}
                required
              />
            </label>

            <button type="submit" className="reviews-submit" disabled={isSaving}>
              {isSaving ? "Speichert..." : "Bewertung senden"}
            </button>
          </form>

          {feedbackMessage && (
            <div className="reviews-success" role="status">
              {feedbackMessage}
            </div>
          )}
        </article>

        <article className="reviews-panel">
          <h3>Aktuelle Bewertungen</h3>
          <div className="reviews-list">
            {isLoading ? (
              <p>Bewertungen werden geladen...</p>
            ) : reviews.length === 0 ? (
              <p>Noch keine Bewertungen vorhanden.</p>
            ) : (
              reviews.map((review, index) => (
                <article
                  key={review._id || `${review.name}-${index}`}
                  className="review-card"
                >
                  <div className="review-card-header">
                    <div>
                      <strong>{review.name}</strong>
                      <span>{review.visitType}</span>
                    </div>
                    <span className="review-badge">{review.rating} / 5</span>
                  </div>
                  <p>{review.message}</p>
                </article>
              ))
            )}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Reviews;
