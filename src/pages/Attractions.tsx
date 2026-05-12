import './Attractions.css';
import { useState, useEffect } from 'react';
import AttractionRegistrationModal from '../components/AttractionRegistrationModal';

interface Registration {
  id: number;
  attractionId: string;
  attractionTitle: string;
  personName: string;
  personCount: number;
  timestamp: string;
}

interface Attraction {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: string;
}

const Attractions = () => {
  const attractions = [
    {
      id: '1',
      title: 'Giraffen-Fütterung',
      description: 'Hautnah dabei: Füttern Sie die Giraffen direkt aus der Hand und erleben Sie diese majestätischen Tiere aus nächster Nähe.',
      time: 'Täglich 10:00 & 14:00',
      icon: '🦒'
    },
    {
      id: '2',
      title: 'Affengehege Tour',
      description: 'Eine interaktive Führung durch die verschiedenen Affengehege. Erfahren Sie faszinierende Fakten über das Verhalten und die Sozialstrukturen.',
      time: 'Täglich 11:00 & 15:00',
      icon: '🐵'
    },
    {
      id: '3',
      title: 'Reptilien-Haus',
      description: 'Entdecken Sie eine beeindruckende Sammlung von Reptilien aus aller Welt. Unsere Experten zeigen euch die verschiedenen Arten und ihre Lebensräume.',
      time: 'Täglich geöffnet',
      icon: '🐍'
    },
    {
      id: '4',
      title: 'Großkatzen-Beobachtung',
      description: 'Beobachten Sie Löwen, Tiger und Leoparden in ihren naturnahen Gehegen. Ideal zum Fotografieren und zur Naturbeobachtung.',
      time: 'Täglich von 8:00-18:00',
      icon: '🦁'
    },
    {
      id: '5',
      title: 'Panda-Paradies',
      description: 'Unsere sanften Pandas in einem extra großen, naturnah gestalteten Gehege. Ein absolutes Highlight für Besucher jeden Alters.',
      time: 'Täglich geöffnet',
      icon: '🐼'
    },
    {
      id: '6',
      title: 'Pinguin-Show',
      description: 'Erleben Sie eine spannende Show mit unseren Pinguinen. Lernen Sie Wissenswertes über ihr Leben in der Antarktis.',
      time: 'Mi, Sa, So 13:00',
      icon: '🐧'
    },
    {
      id: '7',
      title: 'Spielplatz im Zoo',
      description: 'Großer Kinderspielplatz mit verschiedenen Spielgeräten, Kletterelementen und Abenteuerstationen für Kinder jeden Alters.',
      time: 'Täglich geöffnet',
      icon: '🎢'
    },
    {
      id: '8',
      title: 'Vogel-Voliere',
      description: 'Ein begehbares Gehege mit exotischen Vögeln aus verschiedenen Kontinenten. Die Vögel fliegen frei umher.',
      time: 'Täglich geöffnet',
      icon: '🦅'
    },
    {
      id: '9',
      title: 'Streichelzoo',
      description: 'Sanfte und domestizierte Tiere wie Kaninchen, Ziegen und Schafe - perfekt für kleine Tierliebhaber zum Streicheln und Füttern.',
      time: 'Täglich 10:00-17:00',
      icon: '🐰'
    },
    {
      id: '10',
      title: 'Safari im Zoo',
      description: 'Fahren Sie mit der Zoo-Bahn durch verschiedene Gehege und erfahren Sie Spannendes über die Tiere von kundigen Führern.',
      time: 'Täglich (nur im Sommer)',
      icon: '🚂'
    },
    {
      id: '11',
      title: 'Elefanten-Wasserspiele',
      description: 'Beobachten Sie die Elefanten beim Baden und Spielen im Wasser. Ein faszinierendes Naturschauspiel.',
      time: 'Täglich 12:00 & 16:00',
      icon: '🐘'
    },
    {
      id: '12',
      title: 'Nachtsafari',
      description: 'Ein ganz besonderes Erlebnis: Entdecken Sie nachtaktive Tiere in ihrem natürlichen Rhythmus bei einer geführten Nachttour.',
      time: 'Freitag & Samstag 20:00',
      icon: '🌙'
    }
  ]);

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedAttractionId, setSelectedAttractionId] = useState<string | null>(null);


  const loadRegistrations = async () => {
    try {
      const response = await fetch('http://localhost:5000/attraction-registrations');
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Anmeldungen:', error);
    }
  };

  // Lade Anmeldungen beim Component Mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const response = await fetch('http://localhost:5000/attraction-registrations');
        if (!mounted) return;
        if (response.ok) {
          const data = await response.json();
          setRegistrations(data);
        }
      } catch (error) {
        console.error('Fehler beim Laden der Anmeldungen:', error);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);


  const handleRegisterClick = (attractionId: string) => {
    setSelectedAttractionId(attractionId);
    loadRegistrations().then(r =>
    console.log('Registrations loaded:', r));
  };

  const handleSubmitRegistration = async (personName: string, email: string, personCount: number) => {
    const attraction = attractions.find(a => a.id === selectedAttractionId);
    if (!attraction) return;

    const response = await fetch('http://localhost:5000/register-attraction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        attractionId: attraction.id,
        attractionTitle: attraction.title,
        personName,
        email,
        personCount
      })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    await loadRegistrations();
  };

  const getTotalRegistrationsForAttraction = (attractionId: string): number => {
    return registrations
      .filter(reg => reg.attractionId === attractionId)
      .reduce((sum, reg) => sum + reg.personCount, 0);
  };
  ];

  return (
    <div className="attractions">
      <div className="attractions-header">
        <h2>Zoo Attraktionen</h2>
        <p>Entdecke die spannendsten und interaktivsten Attraktionen in unserem Zoo</p>
      </div>

      <div className="attractions-grid">
        {attractions.map((attraction) => {
          const totalRegistered = getTotalRegistrationsForAttraction(attraction.id);

          return (
            <div key={attraction.id} className="attraction-card">
              <div className="attraction-icon">{attraction.icon}</div>
              <div className="attraction-content">
                <h3>{attraction.title}</h3>
                <p className="attraction-description">{attraction.description}</p>
                <p className="attraction-time">
                  <strong>⏰ {attraction.time}</strong>
                </p>

                <div className="attraction-registration">
                  <p className="registration-count">
                    👥 <strong>{totalRegistered} Person{totalRegistered !== 1 ? 'en' : ''} angemeldet</strong>
                  </p>

                  <button
                    className="btn-register"
                    onClick={() => handleRegisterClick(attraction.id)}
                  >
                    Jetzt anmelden
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedAttractionId && (
        <AttractionRegistrationModal
          attraction={attractions.find(a => a.id === selectedAttractionId)!}
          registeredCount={getTotalRegistrationsForAttraction(selectedAttractionId)}
          maxCapacity={100}
          onClose={() => setSelectedAttractionId(null)}
          onSubmit={handleSubmitRegistration}
        />
      )}
    
    </div>
  );
};

export default Attractions;

