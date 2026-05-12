export type ZooLocationCategory =
  | "animal"
  | "food"
  | "toilet"
  | "entrance"
  | "shop"
  | "info"
  | "playground"
  | "firstAid";

export type ZooLocationFilterValue = ZooLocationCategory | "all";

export interface ZooLocation {
  id: string;
  name: string;
  category: ZooLocationCategory;
  description: string;
  area: string;
  markerLabel: string;
  x: number;
  y: number;
}
