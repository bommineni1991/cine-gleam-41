import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { MovieGrid } from "@/components/MovieGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { getMoviesByGenre, getMoviesByLanguage, movies } from "@/data/movies";

const Index = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";
  const languageFromUrl = searchParams.get("language") || "all";

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);

  useEffect(() => {
    setActiveCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  let filteredMovies = getMoviesByGenre(activeCategory);
  
  if (languageFromUrl !== "all") {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.language.toLowerCase() === languageFromUrl.toLowerCase()
    );
  }

  return (
    <Layout>
      <HeroSection />
      <section className="container py-8">
        <div className="mb-8">
          <h2 className="mb-2 font-display text-2xl font-bold text-foreground md:text-3xl">
            Explore Movies
          </h2>
          <p className="text-muted-foreground">
            Discover the latest Telugu, Hindi & Tamil movies
          </p>
        </div>
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <MovieGrid movies={filteredMovies} />
      </section>
    </Layout>
  );
};

export default Index;
