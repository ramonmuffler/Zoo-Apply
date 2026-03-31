import React from 'react';
import './Animals.css';
import loeweImg from '../picture/loewe.jpg';
import elefantImg from '../picture/elefant.jpg';
import pandaImg from '../picture/panda.jpg';
import giraffeImg from '../picture/giraffe.jpg';
import tigerImg from '../picture/tiger.jpg';
import kaenguruImg from '../picture/kaenguru.jpg';
import pinguinImg from '../picture/pinguin.webp';
import koalaImg from '../picture/koala.jpg';
import gorillaImg from '../picture/gorilla.jpg';
import affeImg from '../picture/affe.jpg';
import papageiImg from '../picture/papagei.jpg';
import kleinkaninchenImg from '../picture/kleinscheckenkaninchen.jpg';

type Slot = { id: string; time: string; location: string;  };
type Animal = {
  name: string;
  description: string;
  image: string;
  total: number;
  juveniles: number;
  subtitle: string;
  feedable: boolean;
  slots?: Slot[];
};

const DAY_MAP: Record<string, string> = {
  Mo: 'Montag',
  Di: 'Dienstag',
  Mi: 'Mittwoch',
  Do: 'Donnerstag',
  Fr: 'Freitag',
  Sa: 'Samstag',
  So: 'Sonntag'
};

function formatSlotSingle(raw: string, withPrefix = false) {
  const lower = raw.toLowerCase();
  if (lower.includes('täglich')) {
    const m = raw.match(/(\d{1,2}:\d{2})/);
    const time = m ? m[1] : '';
    return withPrefix ? ` Täglich um ${time}` : `Täglich ${time}`;
  }
  const parts = raw.split(' ');
  const dayAbbr = parts[0];
  const time = parts[1] || '';
  const dayFull = DAY_MAP[dayAbbr] || dayAbbr;
  return withPrefix ? `Am ${dayFull} um ${time}` : `${dayFull} ${time}`;
}

// Hilfsfunktion: extrahiere die Uhrzeit (HH:MM) aus einem Slot-String
function extractTimeOfDay(raw: string): string | null {
  const m = raw.match(/(\d{1,2}:\d{2})/);
  return m ? m[1] : null;
}

const Animals: React.FC = () => {
    const animals: Animal[] = [
        {name: 'Löwe', description: 'Der König der Tiere, lebt in Afrika.', image: loeweImg, total: 5, juveniles: 2, subtitle: 'Afrika', feedable: false},
        {name: 'Elefant', description: 'Das größte Landsäugetier, bekannt für sein Gedächtnis.', image: elefantImg, total: 4, juveniles: 1, subtitle: 'Asien/Afrika', feedable: true, slots: [
            {id: 'e1', time: 'Mo 10:00', location: 'Außenanlage Elefantenhaus'},
            {id: 'e2', time: 'Sa 14:00', location: 'Außenanlage Elefantenhaus'}
        ]},
        {name: 'Panda', description: 'Ein bedrohter Bär aus China, liebt Bambus.', image: pandaImg, total: 4, juveniles: 2, subtitle: 'China', feedable: false},
        {name: 'Giraffe', description: 'Das höchste Tier der Welt, mit langem Hals.', image: giraffeImg, total: 6, juveniles: 2, subtitle: 'Afrika', feedable: true, slots: [
            {id: 'g1', time: 'Täglich 11:00', location: 'Giraffenwiese'}
        ]},
        {name: 'Tiger', description: 'Eine majestätische Raubkatze aus Asien.', image: tigerImg, total: 3, juveniles: 1, subtitle: 'Asien', feedable: false},
        {name: 'Känguru', description: 'Ein Beuteltier aus Australien, bekannt für seine Sprünge.', image: kaenguruImg, total: 8, juveniles: 3, subtitle: 'Australien', feedable: true, slots: [
            {id: 'k1', time: 'Do 15:00', location: 'Känguru-Freilauf'}
        ]},
        {name: 'Pinguin', description: 'Ein flugunfähiger Vogel, der in kalten Regionen lebt.', image: pinguinImg, total: 10, juveniles: 6, subtitle: 'Antarktis/kalte Regionen', feedable: false},
        {name: 'Koala', description: 'Ein Beuteltier aus Australien, das Eukalyptusblätter frisst.', image: koalaImg, total: 5, juveniles: 1, subtitle: 'Australien', feedable: false},
        {name: 'Gorilla', description: 'Ein großer Menschenaffe, der in den Wäldern Afrikas lebt.', image: gorillaImg, total: 3, juveniles: 1, subtitle: 'Afrika', feedable: false},
        {name: 'Affe', description: 'Ein intelligentes Tier, das in verschiedenen Lebensräumen lebt.', image: affeImg, total: 12, juveniles: 4, subtitle: 'verschiedene Lebensräume', feedable: false},
        {name: 'Papagei', description: 'Ein bunter Vogel, der sprechen kann und in tropischen Regionen lebt.', image: papageiImg, total: 7, juveniles: 2, subtitle: 'Tropen', feedable: true, slots: [
            {id: 'p1', time: 'Täglich 10:30', location: 'Papageienhalle'}
        ]},
        {name: 'Kleinkaninchen', description: 'Ein kleines, niedliches Haustier, das gerne in Gärten lebt.', image: kleinkaninchenImg, total: 9, juveniles: 5, subtitle: 'Gärten/Farm', feedable: true, slots: [
            {id: 'kk1', time: 'Wann: Täglich 09:00', location: 'Kaninchengehege'}
        ]}
    ];

    const feedable = animals.filter(a => a.feedable);
    const notFeedable = animals.filter(a => !a.feedable);

    const renderSlots = (animal: Animal) => {
        if (!animal.slots || animal.slots.length === 0) return null;

        // prüfe, ob alle Slots dieselbe Uhrzeit (z. B. 09:00) haben
        const timesOfDay = (animal.slots || []).map(s => extractTimeOfDay(s.time));
        const uniqueTimes = Array.from(new Set(timesOfDay.filter(Boolean) as string[]));
        const commonTime = uniqueTimes.length === 1 ? uniqueTimes[0] : null;

        return (
            <div>
                {commonTime && (
                    <div className="slot-daily">Wann: Täglich um <strong>{commonTime}</strong></div>
                )}
                <ul className="slot-list">
                    {animal.slots.map((slot: Slot) => {
                        return (
                            <li className="slot" key={slot.id}>

                                <div className="slot-info">
                                    {!commonTime && (
                                        <div className="slot-time">{formatSlotSingle(slot.time, true)}</div>
                                    )}
                                    <div className="slot-location">Wo melden um das Tier zu füttern: <strong>{slot.location}</strong></div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    const renderCards = (list: Animal[]) => (
        <div className="animal-list">
                {list.map((animal, index) => {

                return (
                    <div key={animal.name + index} className="animal-card">
                        <img src={animal.image} alt={animal.name} className="animal-img" />
                        <div className="animal-body">
                            <h3>{animal.name}</h3>
                            <div className="subtitle-row">
                                <small className="animal-subtitle">{animal.subtitle}</small>
                                {animal.feedable && <span className="feedable-badge">Fütterbar</span>}
                            </div>

                            <p>{animal.description}</p>
                            <div className="animal-stats">
                                <span className="stat">Gesamt: <strong>{animal.total}</strong></span>
                                <span className="stat">Junge: <strong>{animal.juveniles}</strong></span>
                            </div>

                            {animal.feedable && (
                                <div className="feed-actions">
                                    {renderSlots(animal)}
                                </div>
                            )}

                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="animals">
            <h2>Unsere Tiere</h2>

            {notFeedable.length > 0 && (
                <section>
                    <h3 className="group-title">Nicht Fütterbar</h3>
                    {renderCards(notFeedable)}
                </section>
            )}

            {feedable.length > 0 && (
                <section>
                    <h3 className="group-title">Fütterbar unter Aufsicht</h3>
                    {renderCards(feedable)}
                </section>
            )}
        </div>
    );
};

export default Animals;
