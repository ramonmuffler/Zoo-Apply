import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h2>Willkommen im Zoo!</h2>
        <p>Entdecken Sie die wunderbare Welt der Tiere. Unser Zoo bietet eine Vielzahl von Arten und Erlebnissen für die ganze Familie.</p>
      </section>
      <section className="info">
        <h3>Öffnungszeiten</h3>
        <p>Montag - Freitag: 9:00 - 18:00</p>
        <p>Samstag - Sonntag: 9:00 - 18:00</p>
        <h3>Eintrittspreise</h3>
        <p>Erwachsene(18 Jahre): 32 CHF</p>
        <p>Jugendliche(13-17 Jahre): 27 CHF</p>
        <p>Kinder (6-12 Jahre): 18 CHF</p>
        <p>Kinder unter 6: Gratis</p>
      </section>
    </div>
  );
};

export default Home;