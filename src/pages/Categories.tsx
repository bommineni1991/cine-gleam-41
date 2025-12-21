import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { categories, getMoviesByGenre } from "@/data/movies";
import { Play } from "lucide-react";

const Categories = () => {
  const categoryData = categories.filter((c) => c.slug !== "all");

  return (
    <Layout>
      <section className="container min-h-screen pb-12 pt-24">
        <div className="mb-8">
          <h1 className="mb-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            Browse by Category
          </h1>
          <p className="text-muted-foreground">
            Explore movies by your favorite genres
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryData.map((category) => {
            const categoryMovies = getMoviesByGenre(category.slug);
            const previewMovie = categoryMovies[0];

            return (
              <Link
                key={category.id}
                to={`/?category=${category.slug}`}
                className="group relative overflow-hidden rounded-xl bg-card transition-all duration-500 hover:shadow-glow"
              >
                {/* Background */}
                <div className="relative aspect-video overflow-hidden">
                  {previewMovie && (
                    <img
                      src={previewMovie.posterUrl}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  
                  {/* Play icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 shadow-glow">
                      <Play className="h-6 w-6 fill-primary-foreground text-primary-foreground" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {categoryMovies.length} movies
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
