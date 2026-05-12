import { zooCategoryLabels } from "../../data/zooLocations";
import type { ZooLocation } from "../../types/zoo";

interface ZooLocationListProps {
  locations: ZooLocation[];
  selectedLocationId: string | null;
  onSelectLocation: (locationId: string) => void;
}

const ZooLocationList = ({
  locations,
  selectedLocationId,
  onSelectLocation,
}: ZooLocationListProps) => {
  if (locations.length === 0) {
    return (
      <div className="zoo-location-list__empty">
        Für diese Kategorie sind aktuell keine Orte hinterlegt.
      </div>
    );
  }

  return (
    <ul className="zoo-location-list">
      {locations.map((location) => {
        const isActive = location.id === selectedLocationId;

        return (
          <li key={location.id}>
            <button
              type="button"
              className={`zoo-location-card${isActive ? " zoo-location-card--active" : ""}`}
              onClick={() => onSelectLocation(location.id)}
            >
              <div className="zoo-location-card__header">
                <h3>{location.name}</h3>
                <span className="zoo-location-card__badge">
                  {zooCategoryLabels[location.category]}
                </span>
              </div>
              <p>{location.description}</p>
              <span className="zoo-location-card__meta">
                Bereich: {location.area}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ZooLocationList;
