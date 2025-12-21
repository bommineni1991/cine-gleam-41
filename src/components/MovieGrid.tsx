import { MovieCard } from "./MovieCard";
import type { Movie } from "@/data/movies";

interface MovieGridProps {
  movies: Movie[];
  title?: string;
}

export const MovieGrid = ({ movies, title }: MovieGridProps) => {
  return (
    <section className="py-8">
      {title && (
        <h2 className="mb-6 font-display text-2xl font-bold text-foreground md:text-3xl">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
    </section>
  );
};
