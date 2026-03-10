import './Events.css';

const Events = () => {
  const events = [
    { name: 'Tierfütterung', date: 'Täglich 14:00', description: 'Sehen Sie zu, wie unsere Tierpfleger die Tiere füttern.' },
    { name: 'Safari-Tour', date: 'Samstags 11:00', description: 'Eine geführte Tour durch den Zoo.' },
    { name: 'Kinder-Tag', date: 'Sonntags', description: 'Spezielle Aktivitäten für Kinder.' },
  ];

  return (
    <div className="events">
      <h2>Events und Aktivitäten</h2>
      <div className="event-list">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <h3>{event.name}</h3>
            <p><strong>Datum:</strong> {event.date}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;