import { useMemo, useState } from "react";
import ZooCategoryFilter from "../components/ZooMap/ZooCategoryFilter";
import ZooLocationList from "../components/ZooMap/ZooLocationList";
import ZooMap from "../components/ZooMap/ZooMap";
import {
  zooCategoryLabels,
  zooCategoryOrder,
  zooLocations,
} from "../data/zooLocations";
import type { ZooLocationFilterValue } from "../types/zoo";
import "./ZooMapPage.css";

const ZooMapPage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<ZooLocationFilterValue>("all");
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    zooLocations[0]?.id ?? null,
  );

  const filterOptions = useMemo(() => {
    const availableCategories = zooCategoryOrder.filter((category) =>
      zooLocations.some((location) => location.category === category),
    );

    return [
      {
        value: "all" as const,
        label: "Alle Orte",
        count: zooLocations.length,
      },
      ...availableCategories.map((category) => ({
        value: category,
        label: zooCategoryLabels[category],
        count: zooLocations.filter((location) => location.category === category)
          .length,
      })),
    ];
  }, []);

  const visibleLocations = useMemo(() => {
    if (selectedCategory === "all") {
      return zooLocations;
    }

    return zooLocations.filter((location) => location.category === selectedCategory);
  }, [selectedCategory]);

  const activeLocationId = visibleLocations.some(
    (location) => location.id === selectedLocationId,
  )
    ? selectedLocationId
    : visibleLocations[0]?.id ?? null;

  const selectedLocation = visibleLocations.find(
    (location) => location.id === activeLocationId,
  );

  return (
    <div className="zoo-map-page">
      <section className="zoo-map-page__intro">
        <div>
          <p className="zoo-map-page__eyebrow">Interaktive Zoo-Karte</p>
          <h2>Wichtige Orte im Zoo schnell finden</h2>
          <p className="zoo-map-page__lead">
            Diese Karte ist bewusst schematisch aufgebaut. Sie zeigt Beispieldaten
            wie Tiergehege, Toiletten, Verpflegung und Servicepunkte, damit sich
            Besucher schnell orientieren können.
          </p>
        </div>

        <div className="zoo-map-page__selection">
          <span>Ausgewählter Ort</span>
          <strong>{selectedLocation?.name ?? "Kein Ort ausgewählt"}</strong>
          <small>
            {selectedLocation
              ? `${zooCategoryLabels[selectedLocation.category]} • ${selectedLocation.area}`
              : "Wähle einen Ort aus der Liste oder direkt auf der Karte."}
          </small>
        </div>
      </section>

      <section className="zoo-map-page__content">
        <aside className="zoo-map-page__sidebar">
          <div className="zoo-map-page__panel">
            <h3>Kategorien</h3>
            <p>Filtere die Karte nach den Orten, die du gerade brauchst.</p>
            <ZooCategoryFilter
              options={filterOptions}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          <div className="zoo-map-page__panel">
            <div className="zoo-map-page__panel-header">
              <h3>Ortsliste</h3>
              <span>{visibleLocations.length} sichtbar</span>
            </div>
            <ZooLocationList
              locations={visibleLocations}
              selectedLocationId={activeLocationId}
              onSelectLocation={setSelectedLocationId}
            />
          </div>
        </aside>

        <section className="zoo-map-page__panel zoo-map-page__map-panel">
          <div className="zoo-map-page__panel-header">
            <h3>Übersichtskarte</h3>
            <span>Klick auf Marker oder Liste</span>
          </div>
          <ZooMap
            locations={visibleLocations}
            selectedLocationId={activeLocationId}
            onSelectLocation={setSelectedLocationId}
          />
          <p className="zoo-map-page__map-note">
            Hinweis: Die Positionen sind schematische Beispieldaten und ersetzen
            keine echte geografische Karte.
          </p>
        </section>
      </section>
    </div>
  );
};

export default ZooMapPage;
