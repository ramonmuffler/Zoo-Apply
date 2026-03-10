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
        <p>Samstag - Sonntag: 10:00 - 19:00</p>
        <h3>Eintrittspreise</h3>
        <p>Erwachsene: 15€</p>
        <p>Kinder (6-12): 10€</p>
        <p>Kinder unter 6: kostenlos</p>
      </section>
    </div>
  );
};

export default Home;