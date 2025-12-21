import { categories, type Category } from "@/data/movies";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
            activeCategory === category.slug
              ? "bg-primary text-primary-foreground shadow-glow"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
