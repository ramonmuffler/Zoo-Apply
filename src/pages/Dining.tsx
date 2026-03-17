import "./Dining.css";

const Dining = () => {
  const restaurants = [
    {
      name: "Restaurant Pantanal",
      type: "Bedientes Restaurant",
      description:
        "Moderne Küche mit Blick auf die Tieranlagen – ideal für ein entspanntes Mittag- oder Abendessen während des Zoobesuchs.",
    },
    {
      name: "Restaurant Masoala",
      type: "Self-Service",
      description:
        "Buffet und warme Speisen direkt am Masoala-Regenwald – perfekt, um zwischen zwei Entdeckungstouren Energie zu tanken.",
    },
    {
      name: "Restaurant Altes Klösterli",
      type: "Schweizer Küche",
      description:
        "Historisches Ambiente mit regionalen Spezialitäten und viel Charme oberhalb des Zoos.",
    },
    {
      name: "Zoo Caffè & Ristorante",
      type: "Caffè & Bistro",
      description:
        "Kaffee, Kuchen und leichte Gerichte – ideal für einen Start in den Tag oder eine Pause zwischendurch.",
    },
    {
      name: "Thailodge",
      type: "Themenrestaurant",
      description:
        "Asiatisch inspirierte Küche mit Blick auf den Elefantenpark – besonders geeignet für spezielle Anlässe und Gruppen.",
    },
  ];

  const quickBites = [
    {
      name: "Verpflegungsstände & Kioske",
      description:
        "Über das ganze Gelände verteilt finden Sie Stände mit Snacks, Glacé, Sandwiches und Getränken – ideal für den kleinen Hunger zwischendurch.",
    },
    {
      name: "Take-away-Angebote",
      description:
        "Viele Speisen erhalten Sie auch zum Mitnehmen, damit Sie flexibel bleiben und überall im Zoo eine Pause einlegen können.",
    },
  ];

  return (
    <div className="dining">
      <section className="dining-hero">
        <h2>Essen &amp; Trinken im Zoo</h2>
        <p>
          Ob gemütliches Restaurant, schneller Snack oder Kaffee mit Aussicht –
          im Zoo finden Sie vielfältige Verpflegungsmöglichkeiten für jeden
          Geschmack und jedes Budget.
        </p>
        <p>
          Mit Ihrem Besuch in den Restaurants und Shops unterstützen Sie
          gleichzeitig die Naturschutzprojekte des Zoos, denn ein fester Anteil
          der Einnahmen fliesst direkt in diese Arbeit.
        </p>
      </section>

      <section className="dining-section">
        <h3>Restaurants</h3>
        <p className="dining-section-intro">
          Geniessen Sie eine Pause in einem unserer Restaurants – von
          klassischer Küche über Selbstbedienung bis hin zu thematisch
          gestalteten Lokalen.
        </p>
        <div className="dining-grid">
          {restaurants.map((restaurant) => (
            <article key={restaurant.name} className="dining-card">
              <h4>{restaurant.name}</h4>
              <span className="dining-tag">{restaurant.type}</span>
              <p>{restaurant.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dining-section">
        <h3>Schnelle Verpflegung</h3>
        <p className="dining-section-intro">
          Für den kurzen Halt zwischen zwei Tieranlagen bieten verschiedene
          Stände und Kioske eine unkomplizierte Auswahl an Snacks und Getränken.
        </p>
        <div className="dining-grid">
          {quickBites.map((offer) => (
            <article key={offer.name} className="dining-card">
              <h4>{offer.name}</h4>
              <p>{offer.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dining-section dining-section-alt">
        <div className="dining-two-column">
          <div>
            <h3>Picknick &amp; Selbstverpflegung</h3>
            <p>
              Im Zoo gibt es ausgewiesene Picknickbereiche, in denen Sie Ihre
              eigene Verpflegung geniessen können. Bitte achten Sie darauf, den
              Abfall korrekt zu entsorgen und die Tiere nicht zu füttern.
            </p>
          </div>
          <div>
            <h3>Nachhaltige Gastronomie</h3>
            <p>
              Die Gastronomie im Zoo setzt auf einen verantwortungsvollen Umgang
              mit Ressourcen, saisonale Produkte und kurze Transportwege, wo
              immer möglich. So wird Ihr Restaurantbesuch zum Genuss mit gutem
              Gewissen.
            </p>
          </div>
        </div>
      </section>

      <section className="dining-section">
        <h3>Anlässe &amp; Gruppen</h3>
        <p>
          Für Firmenanlässe, Geburtstage oder andere Feiern stehen verschiedene
          Locations und Catering-Angebote zur Verfügung. In Kombination mit
          einer Führung oder einem Spezialprogramm wird Ihr Anlass im Zoo zu
          einem besonderen Erlebnis.
        </p>
      </section>
    </div>
  );
};

export default Dining;
