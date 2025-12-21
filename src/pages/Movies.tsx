import { useState } from "react";
import { Layout } from "@/components/Layout";
import { MovieGrid } from "@/components/MovieGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { movies, getMoviesByGenre } from "@/data/movies";

const Movies = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredMovies = getMoviesByGenre(activeCategory);

  return (
    <Layout>
      <section className="container min-h-screen pb-12 pt-24">
        <div className="mb-8">
          <h1 className="mb-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            All Movies
          </h1>
          <p className="text-muted-foreground">
            Browse our complete collection of movies
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Movies Grid */}
        <MovieGrid movies={filteredMovies} />
      </section>
    </Layout>
  );
};

export default Movies;
