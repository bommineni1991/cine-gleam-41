import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Info, Star, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedMovies, type Movie } from "@/data/movies";

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredMovies = getFeaturedMovies();
  const currentMovie = featuredMovies[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  if (!currentMovie) return null;

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden md:h-[80vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentMovie.backdropUrl || currentMovie.posterUrl}
          alt={currentMovie.title}
          className="h-full w-full object-cover transition-all duration-1000"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="container relative flex h-full items-center">
        <div className="max-w-2xl animate-fade-up">
          {/* Featured Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-sm font-medium text-primary">Featured</span>
          </div>

          {/* Title */}
          <h1 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            {currentMovie.title}
          </h1>

          {/* Meta Info */}
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{currentMovie.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{currentMovie.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>{currentMovie.language}</span>
            </div>
            <span>{currentMovie.releaseYear}</span>
          </div>

          {/* Genres */}
          <div className="mb-4 flex flex-wrap gap-2">
            {currentMovie.genre.map((genre) => (
              <span
                key={genre}
                className="rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="mb-6 line-clamp-3 text-base text-muted-foreground md:text-lg">
            {currentMovie.description}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg">
              <Link to={`/movie/${currentMovie.id}`}>
                <Play className="h-5 w-5 fill-current" />
                Watch Now
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link to={`/movie/${currentMovie.id}`}>
                <Info className="h-5 w-5" />
                More Info
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-primary"
                : "w-1.5 bg-muted-foreground/50 hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
