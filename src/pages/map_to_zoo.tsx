import './map_to_zoo.css';

const MapToZoo = () => {
  return (
    <div className="map-to-zoo">
      <h2>Anfahrt zum Zoo Zürich</h2>
      <p>Hier findest du alle Informationen zur Anfahrt zum Zoo Zürich, einschliesslich einer interaktiven Karte, Parkmöglichkeiten und öffentliche Verkehrsmittel.</p>

      <h3>Interaktive Karte</h3>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2700.123456789012!2d8.574999999999999!3d47.38333333333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479aa0a7c6b6b6b7%3A0x123456789abcdef!2sZoo%20Z%C3%BCrich!5e0!3m2!1sen!2sch!4v1234567890123!5m2!1sen!2sch"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Karte zum Zoo Zürich"
        ></iframe>
      </div>

      <h3>Parkplätze</h3>
      <p>Der Zoo Zürich bietet verschiedene Parkmöglichkeiten für Autos:</p>
      <ul>
        <li><strong>Parkhaus Zoo:</strong> Direkt am Zoo-Eingang. Gebühren: CHF 5 pro Stunde, CHF 25 pro Tag.</li>
        <li><strong>Parkplatz Fluntern:</strong> Etwa 10 Minuten Fussweg. Kostenlos, aber begrenzt verfügbar.</li>
        <li><strong>Parkplatz beim Stadion Letzigrund:</strong> Etwa 15 Minuten Fussweg. Gebühren: CHF 2 pro Stunde.</li>
      </ul>
      <p>Hinweis: Während Spitzenzeiten kann es zu Engpässen kommen. Wir empfehlen die Anreise mit öffentlichen Verkehrsmitteln.</p>

      <h3>Öffentliche Verkehrsmittel (ÖV)</h3>
      <p>Vom Hauptbahnhof Zürich (HB) aus gibt es mehrere Möglichkeiten, den Zoo zu erreichen:</p>
      <ul>
        <li><strong>Tram:</strong> Linie 6 oder 10 bis Haltestelle "Zoo". Fahrtzeit: ca. 15-20 Minuten.</li>
        <li><strong>Bus:</strong> Linie 31 bis Haltestelle "Zoo". Fahrtzeit: ca. 20 Minuten.</li>
        <li><strong>S-Bahn:</strong> S6, S7, S12, S16 oder S20 bis Bahnhof Stadelhofen, dann Tram 6 oder 10. Fahrtzeit: ca. 25 Minuten.</li>
      </ul>
      <p>Fahrpläne und Tickets findest du auf der Website der SBB: <a href="https://www.sbb.ch" target="_blank" rel="noopener noreferrer">www.sbb.ch</a></p>
    </div>
  );
};

export default MapToZoo;