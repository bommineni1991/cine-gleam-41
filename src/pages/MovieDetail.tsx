import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Star, Clock, Globe, Calendar, Share2, Heart } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/VideoPlayer";
import { MovieGrid } from "@/components/MovieGrid";
import { getMovieById, movies } from "@/data/movies";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const movie = getMovieById(id || "");

  if (!movie) {
    return (
      <Layout>
        <div className="container flex min-h-[60vh] items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="mb-4 font-display text-3xl font-bold text-foreground">
              Movie Not Found
            </h1>
            <p className="mb-6 text-muted-foreground">
              The movie you're looking for doesn't exist.
            </p>
            <Button asChild variant="gold">
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const relatedMovies = movies
    .filter((m) => m.id !== movie.id && m.genre.some((g) => movie.genre.includes(g)))
    .slice(0, 6);

  return (
    <Layout>
      {/* Backdrop Header */}
      <section className="relative min-h-[50vh] w-full overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src={movie.backdropUrl || movie.posterUrl}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 py-8">
          {/* Back Button */}
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Poster */}
            <div className="hidden lg:block">
              <div className="poster-card overflow-hidden rounded-xl">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="aspect-[2/3] w-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              {/* Genres */}
              <div className="mb-4 flex flex-wrap gap-2">
                {movie.genre.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                {movie.title}
              </h1>

              {/* Meta */}
              <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>{movie.language}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.releaseYear}</span>
                </div>
              </div>

              {/* Description */}
              <p className="mb-8 text-base leading-relaxed text-muted-foreground md:text-lg">
                {movie.description}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button variant="gold" size="lg">
                  <Play className="h-5 w-5 fill-current" />
                  Watch Now
                </Button>
                <Button variant="glass" size="lg">
                  <Heart className="h-5 w-5" />
                  Add to List
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Player Section */}
      {movie.streamUrl && (
        <section className="container py-8">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
            Watch {movie.title}
          </h2>
          <VideoPlayer
            src={movie.streamUrl}
            poster={movie.backdropUrl || movie.posterUrl}
            title={movie.title}
          />
        </section>
      )}

      {/* Related Movies */}
      {relatedMovies.length > 0 && (
        <section className="container pb-12">
          <MovieGrid movies={relatedMovies} title="You May Also Like" />
        </section>
      )}
    </Layout>
  );
};

export default MovieDetail;
