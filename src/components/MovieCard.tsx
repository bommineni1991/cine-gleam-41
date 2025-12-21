import { Link } from "react-router-dom";
import { Play, Star } from "lucide-react";
import type { Movie } from "@/data/movies";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export const MovieCard = ({ movie, index = 0 }: MovieCardProps) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="poster-card group block"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        {/* Poster Image */}
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 shadow-glow transition-transform duration-300 group-hover:scale-110">
            <Play className="h-7 w-7 fill-primary-foreground text-primary-foreground" />
          </div>
        </div>
        
        {/* Rating Badge */}
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 backdrop-blur-sm">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="text-xs font-semibold text-foreground">{movie.rating}</span>
        </div>
        
        {/* Movie Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="line-clamp-1 font-display text-sm font-semibold text-foreground md:text-base">
            {movie.title}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{movie.releaseYear}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground" />
            <span>{movie.language}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
