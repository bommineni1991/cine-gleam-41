import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Film, Link as LinkIcon, Save, Plus, Trash2, Megaphone } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { categories, getMovieById, type AdBreak } from "@/data/movies";

const EditMovie = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    posterUrl: "",
    backdropUrl: "",
    streamUrl: "",
    genre: [] as string[],
    language: "",
    releaseYear: new Date().getFullYear(),
    duration: "",
    isFeatured: false,
    adBreaks: [] as AdBreak[],
  });

  useEffect(() => {
    if (id) {
      const movie = getMovieById(id);
      if (movie) {
        setFormData({
          title: movie.title,
          description: movie.description,
          posterUrl: movie.posterUrl,
          backdropUrl: movie.backdropUrl || "",
          streamUrl: movie.streamUrl || "",
          genre: movie.genre,
          language: movie.language,
          releaseYear: movie.releaseYear,
          duration: movie.duration,
          isFeatured: movie.isFeatured || false,
          adBreaks: movie.adBreaks || [],
        });
      } else {
        toast({
          title: "Movie Not Found",
          description: "The requested movie could not be found.",
          variant: "destructive",
        });
        navigate("/admin/movies");
      }
    }
  }, [id, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Movie Updated",
      description: `${formData.title} has been updated successfully.`,
    });

    setIsSubmitting(false);
    navigate("/admin/movies");
  };

  const handleGenreChange = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter((g) => g !== genre)
        : [...prev.genre, genre],
    }));
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Edit Movie
          </h1>
          <p className="text-muted-foreground">
            Update the movie details below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Card */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <Film className="h-5 w-5 text-primary" />
              Basic Information
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="title">Movie Title</Label>
                <Input
                  id="title"
                  placeholder="Enter movie title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="mt-1.5"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter movie description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="mt-1.5 min-h-[100px]"
                  required
                />
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  placeholder="e.g., Telugu, Hindi"
                  value={formData.language}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, language: e.target.value }))
                  }
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="releaseYear">Release Year</Label>
                <Input
                  id="releaseYear"
                  type="number"
                  placeholder="e.g., 2024"
                  value={formData.releaseYear}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      releaseYear: parseInt(e.target.value),
                    }))
                  }
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 2h 30m"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, duration: e.target.value }))
                  }
                  className="mt-1.5"
                  required
                />
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="mt-4 flex items-center space-x-2">
              <Checkbox
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isFeatured: checked === true }))
                }
              />
              <Label htmlFor="isFeatured" className="cursor-pointer">
                Feature this movie on the homepage
              </Label>
            </div>
          </div>

          {/* Genres Card */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
              Genres
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories
                .filter((c) => c.slug !== "all")
                .map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleGenreChange(category.name)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      formData.genre.includes(category.name)
                        ? "bg-primary text-primary-foreground shadow-glow"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
            </div>
          </div>

          {/* Media URLs Card */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <LinkIcon className="h-5 w-5 text-primary" />
              Media URLs
            </h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="posterUrl">Poster URL</Label>
                <Input
                  id="posterUrl"
                  placeholder="https://example.com/poster.jpg"
                  value={formData.posterUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, posterUrl: e.target.value }))
                  }
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="backdropUrl">Backdrop URL (Optional)</Label>
                <Input
                  id="backdropUrl"
                  placeholder="https://example.com/backdrop.jpg"
                  value={formData.backdropUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, backdropUrl: e.target.value }))
                  }
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="streamUrl">HLS Stream URL (.m3u8)</Label>
                <Input
                  id="streamUrl"
                  placeholder="https://cdn.example.com/movie/master.m3u8"
                  value={formData.streamUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, streamUrl: e.target.value }))
                  }
                  className="mt-1.5"
                  required
                />
              </div>
            </div>
          </div>

          {/* Ad Breaks Card */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <Megaphone className="h-5 w-5 text-primary" />
              Ad Breaks (Mid-roll Ads)
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Add custom ads at specific timestamps during the movie playback.
            </p>
            
            {formData.adBreaks.map((ad, index) => (
              <div key={ad.id} className="mb-4 flex items-end gap-3 rounded-lg bg-secondary/50 p-4">
                <div className="flex-1">
                  <Label>Time (minutes)</Label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="e.g., 20"
                    value={ad.timestampMinutes}
                    onChange={(e) => {
                      const newAdBreaks = [...formData.adBreaks];
                      newAdBreaks[index].timestampMinutes = parseInt(e.target.value) || 0;
                      setFormData((prev) => ({ ...prev, adBreaks: newAdBreaks }));
                    }}
                    className="mt-1.5"
                  />
                </div>
                <div className="flex-[2]">
                  <Label>Ad Video/Image URL</Label>
                  <Input
                    placeholder="https://example.com/ad.mp4"
                    value={ad.adUrl}
                    onChange={(e) => {
                      const newAdBreaks = [...formData.adBreaks];
                      newAdBreaks[index].adUrl = e.target.value;
                      setFormData((prev) => ({ ...prev, adBreaks: newAdBreaks }));
                    }}
                    className="mt-1.5"
                  />
                </div>
                <div className="flex-1">
                  <Label>Duration (sec)</Label>
                  <Input
                    type="number"
                    min="5"
                    placeholder="e.g., 30"
                    value={ad.durationSeconds}
                    onChange={(e) => {
                      const newAdBreaks = [...formData.adBreaks];
                      newAdBreaks[index].durationSeconds = parseInt(e.target.value) || 30;
                      setFormData((prev) => ({ ...prev, adBreaks: newAdBreaks }));
                    }}
                    className="mt-1.5"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      adBreaks: prev.adBreaks.filter((_, i) => i !== index),
                    }));
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  adBreaks: [
                    ...prev.adBreaks,
                    {
                      id: crypto.randomUUID(),
                      timestampMinutes: 20,
                      adUrl: "",
                      durationSeconds: 30,
                    },
                  ],
                }));
              }}
            >
              <Plus className="h-4 w-4" />
              Add Ad Break
            </Button>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/movies")}
            >
              Cancel
            </Button>
            <Button type="submit" variant="gold" disabled={isSubmitting}>
              <Save className="h-4 w-4" />
              {isSubmitting ? "Saving..." : "Update Movie"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditMovie;
