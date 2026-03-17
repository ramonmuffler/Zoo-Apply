import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact">
      <h2>Kontaktieren Sie uns!</h2>
      <p>Adresse: Zürichbergstrasse 221, 8044 Zürich</p>
      <p>Telefon: +49 44 254 25 00</p>
      <p>Email: <a href="mailto:zoo@zoo.ch?subject=Support Anfrage&body=Hallo lieber Zoo Zürich,%0A%0AIch habe folgendes Problem:%0A...%0A%0AVielen Dank.">zoo@zoo.ch</a></p>
      <h3>Öffnungszeiten</h3>
      <p>Montag - Freitag: 9:00 - 18:00</p>
      <p>Samstag - Sonntag: 9:00 - 18:00</p>
    </div>
  );
};

export default Contact;
