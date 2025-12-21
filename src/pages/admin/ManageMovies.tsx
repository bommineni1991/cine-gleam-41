import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { movies } from "@/data/movies";
import { useToast } from "@/hooks/use-toast";

const ManageMovies = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [movieList, setMovieList] = useState(
    movies.map((m) => ({ ...m, isPublished: true }))
  );

  const filteredMovies = movieList.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePublish = (id: string) => {
    setMovieList((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, isPublished: !movie.isPublished } : movie
      )
    );
    toast({
      title: "Movie Updated",
      description: "Movie visibility has been toggled.",
    });
  };

  const handleDelete = (id: string, title: string) => {
    setMovieList((prev) => prev.filter((movie) => movie.id !== id));
    toast({
      title: "Movie Deleted",
      description: `${title} has been removed.`,
      variant: "destructive",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Manage Movies
            </h1>
            <p className="text-muted-foreground">
              {movieList.length} movies in your library
            </p>
          </div>
          <Button asChild variant="gold">
            <Link to="/admin/add-movie">
              <Plus className="h-4 w-4" />
              Add Movie
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Movies Table */}
        <div className="glass-card overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50 text-left text-sm text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Movie</th>
                  <th className="px-4 py-3 font-medium">Genre</th>
                  <th className="px-4 py-3 font-medium">Language</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((movie) => (
                  <tr
                    key={movie.id}
                    className="border-b border-border/50 transition-colors hover:bg-secondary/30 last:border-0"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="h-14 w-10 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium text-foreground">{movie.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {movie.releaseYear} • {movie.duration}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {movie.genre.slice(0, 2).map((g) => (
                          <span
                            key={g}
                            className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">{movie.language}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                          movie.isPublished
                            ? "bg-green-500/10 text-green-500"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {movie.isPublished ? (
                          <>
                            <Eye className="h-3 w-3" />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3" />
                            Hidden
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePublish(movie.id)}
                          title={movie.isPublished ? "Hide movie" : "Publish movie"}
                        >
                          {movie.isPublished ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/admin/edit-movie/${movie.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDelete(movie.id, movie.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMovies.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No movies found.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageMovies;
