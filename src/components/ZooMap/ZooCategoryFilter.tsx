import type { ZooLocationFilterValue } from "../../types/zoo";

interface ZooCategoryFilterOption {
  value: ZooLocationFilterValue;
  label: string;
  count: number;
}

interface ZooCategoryFilterProps {
  options: ZooCategoryFilterOption[];
  selectedCategory: ZooLocationFilterValue;
  onSelectCategory: (category: ZooLocationFilterValue) => void;
}

const ZooCategoryFilter = ({
  options,
  selectedCategory,
  onSelectCategory,
}: ZooCategoryFilterProps) => {
  return (
    <div className="zoo-category-filter" aria-label="Orte nach Kategorie filtern">
      {options.map((option) => {
        const isActive = option.value === selectedCategory;

        return (
          <button
            key={option.value}
            type="button"
            className={`zoo-category-filter__button${isActive ? " zoo-category-filter__button--active" : ""}`}
            onClick={() => onSelectCategory(option.value)}
            aria-pressed={isActive}
          >
            <span>{option.label}</span>
            <span className="zoo-category-filter__count">{option.count}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ZooCategoryFilter;
