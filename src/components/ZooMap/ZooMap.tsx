import { zooCategoryLabels } from "../../data/zooLocations";
import type { ZooLocation } from "../../types/zoo";

interface ZooMapProps {
  locations: ZooLocation[];
  selectedLocationId: string | null;
  onSelectLocation: (locationId: string) => void;
}

const ZooMap = ({
  locations,
  selectedLocationId,
  onSelectLocation,
}: ZooMapProps) => {
  return (
    <div className="zoo-map-board" role="img" aria-label="Schematische Zoo-Karte">
      <div className="zoo-map-board__path zoo-map-board__path--horizontal" />
      <div className="zoo-map-board__path zoo-map-board__path--vertical" />
      <div className="zoo-map-board__zone zoo-map-board__zone--savannah">
        Savanne
      </div>
      <div className="zoo-map-board__zone zoo-map-board__zone--forest">
        Tropenhaus
      </div>
      <div className="zoo-map-board__zone zoo-map-board__zone--family">
        Familienbereich
      </div>

      {locations.map((location) => {
        const isActive = location.id === selectedLocationId;

        return (
          <button
            key={location.id}
            type="button"
            className={`zoo-map-marker${isActive ? " zoo-map-marker--active" : ""}`}
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
            onClick={() => onSelectLocation(location.id)}
            aria-pressed={isActive}
            aria-label={`${location.name}, ${zooCategoryLabels[location.category]}`}
          >
            <span className="zoo-map-marker__label">{location.markerLabel}</span>
            <span className="zoo-map-marker__tooltip">
              {location.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ZooMap;
