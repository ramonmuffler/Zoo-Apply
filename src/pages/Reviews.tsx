import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import "./Reviews.css";

type Review = {
  name: string;
  visitType: string;
  rating: number;
  message: string;
};

const initialReviews: Review[] = [
  {
    name: "Familie Keller",
    visitType: "Familienbesuch",
    rating: 5,
    message:
      "Die Anlagen waren gepflegt, die Wege kinderfreundlich und die Futtershow bei den Seeloewen ein Highlight.",
  },
  {
    name: "Noah, 14",
    visitType: "Schulausflug",
    rating: 4,
    message:
      "Besonders spannend waren die Elefanten und die Infotafeln. Mehr Sitzplaetze waeren fuer Pausen noch schoen.",
  },
  {
    name: "Sabrina Meier",
    visitType: "Wochenendtrip",
    rating: 5,
    message:
      "Online-Tickets, Gastronomie und Orientierung vor Ort haben super funktioniert. Wir kommen gerne wieder.",
  },
];

const ratingLabels: Record<number, string> = {
  1: "Verbesserungsbeduerftig",
  2: "In Ordnung",
  3: "Gut",
  4: "Sehr gut",
  5: "Hervorragend",
};

const Reviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState("");
  const [visitType, setVisitType] = useState("Familienbesuch");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const averageRating = useMemo(() => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newReview: Review = {
      name,
      visitType,
      rating,
      message,
    };

    setReviews((currentReviews) => [newReview, ...currentReviews]);
    setName("");
    setVisitType("Familienbesuch");
    setRating(5);
    setMessage("");
    setSubmitted(true);
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
          <p>{ratingLabels[Math.round(Number(averageRating))]}</p>
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
                  setSubmitted(false);
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
                  setSubmitted(false);
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
                      setSubmitted(false);
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
                  setSubmitted(false);
                }}
                placeholder="Was hat Ihnen besonders gefallen?"
                rows={5}
                required
              />
            </label>

            <button type="submit" className="reviews-submit">
              Bewertung senden
            </button>
          </form>

          {submitted && (
            <div className="reviews-success" role="status">
              Vielen Dank fuer Ihr Feedback. Ihre Bewertung ist jetzt auf der
              Seite sichtbar.
            </div>
          )}
        </article>

        <article className="reviews-panel">
          <h3>Aktuelle Bewertungen</h3>
          <div className="reviews-list">
            {reviews.map((review, index) => (
              <article key={`${review.name}-${index}`} className="review-card">
                <div className="review-card-header">
                  <div>
                    <strong>{review.name}</strong>
                    <span>{review.visitType}</span>
                  </div>
                  <span className="review-badge">{review.rating} / 5</span>
                </div>
                <p>{review.message}</p>
              </article>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Reviews;
