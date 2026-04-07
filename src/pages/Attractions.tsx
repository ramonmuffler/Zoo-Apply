import './Attractions.css';

const Attractions = () => {
  const attractions = [
    {
      title: 'Giraffen-Fütterung',
      description: 'Hautnah dabei: Füttern Sie die Giraffen direkt aus der Hand und erleben Sie diese majestätischen Tiere aus nächster Nähe.',
      time: 'Täglich 10:00 & 14:00',
      icon: '🦒'
    },
    {
      title: 'Affengehege Tour',
      description: 'Eine interaktive Führung durch die verschiedenen Affengehege. Erfahren Sie faszinierende Fakten über das Verhalten und die Sozialstrukturen.',
      time: 'Täglich 11:00 & 15:00',
      icon: '🐵'
    },
    {
      title: 'Reptilien-Haus',
      description: 'Entdecken Sie eine beeindruckende Sammlung von Reptilien aus aller Welt. Unsere Experten zeigen euch die verschiedenen Arten und ihre Lebensräume.',
      time: 'Täglich geöffnet',
      icon: '🐍'
    },
    {
      title: 'Großkatzen-Beobachtung',
      description: 'Beobachten Sie Löwen, Tiger und Leoparden in ihren naturnahen Gehegen. Ideal zum Fotografieren und zur Naturbeobachtung.',
      time: 'Täglich von 8:00-18:00',
      icon: '🦁'
    },
    {
      title: 'Panda-Paradies',
      description: 'Unsere sanften Pandas in einem extra großen, naturnah gestalteten Gehege. Ein absolutes Highlight für Besucher jeden Alters.',
      time: 'Täglich geöffnet',
      icon: '🐼'
    },
    {
      title: 'Pinguin-Show',
      description: 'Erleben Sie eine spannende Show mit unseren Pinguinen. Lernen Sie Wissenswertes über ihr Leben in der Antarktis.',
      time: 'Mi, Sa, So 13:00',
      icon: '🐧'
    },
    {
      title: 'Spielplatz im Zoo',
      description: 'Großer Kinderspielplatz mit verschiedenen Spielgeräten, Kletterelementen und Abenteuerstationen für Kinder jeden Alters.',
      time: 'Täglich geöffnet',
      icon: '🎢'
    },
    {
      title: 'Vogel-Voliere',
      description: 'Ein begehbares Gehege mit exotischen Vögeln aus verschiedenen Kontinenten. Die Vögel fliegen frei umher.',
      time: 'Täglich geöffnet',
      icon: '🦅'
    },
    {
      title: 'Streichelzoo',
      description: 'Sanfte und domestizierte Tiere wie Kaninchen, Ziegen und Schafe - perfekt für kleine Tierliebhaber zum Streicheln und Füttern.',
      time: 'Täglich 10:00-17:00',
      icon: '🐰'
    },
    {
      title: 'Safari im Zoo',
      description: 'Fahren Sie mit der Zoo-Bahn durch verschiedene Gehege und erfahren Sie Spannendes über die Tiere von kundigen Führern.',
      time: 'Täglich (nur im Sommer)',
      icon: '🚂'
    },
    {
      title: 'Elefanten-Wasserspiele',
      description: 'Beobachten Sie die Elefanten beim Baden und Spielen im Wasser. Ein faszinierendes Naturschauspiel.',
      time: 'Täglich 12:00 & 16:00',
      icon: '🐘'
    },
    {
      title: 'Nachtsafari',
      description: 'Ein ganz besonderes Erlebnis: Entdecken Sie nachtaktive Tiere in ihrem natürlichen Rhythmus bei einer geführten Nachttour.',
      time: 'Freitag & Samstag 20:00',
      icon: '🌙'
    }
  ];

  return (
    <div className="attractions">
      <div className="attractions-header">
        <h2>Zoo Attraktionen</h2>
        <p>Entdecke die spannendsten und interaktivsten Attraktionen in unserem Zoo</p>
      </div>

      <div className="attractions-grid">
        {attractions.map((attraction, index) => (
          <div key={index} className="attraction-card">
            <div className="attraction-icon">{attraction.icon}</div>
            <div className="attraction-content">
              <h3>{attraction.title}</h3>
              <p className="attraction-description">{attraction.description}</p>
              <p className="attraction-time">
                <strong>⏰ {attraction.time}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attractions;

