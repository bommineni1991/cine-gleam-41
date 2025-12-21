export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl?: string;
  genre: string[];
  language: string;
  releaseYear: number;
  duration: string;
  rating: number;
  isFeatured?: boolean;
  streamUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export const categories: Category[] = [
  { id: "1", name: "All", slug: "all" },
  { id: "2", name: "Action", slug: "action" },
  { id: "3", name: "Drama", slug: "drama" },
  { id: "4", name: "Comedy", slug: "comedy" },
  { id: "5", name: "Thriller", slug: "thriller" },
  { id: "6", name: "Romance", slug: "romance" },
  { id: "7", name: "Sci-Fi", slug: "sci-fi" },
  { id: "8", name: "Horror", slug: "horror" },
];

export const movies: Movie[] = [
  {
    id: "1",
    title: "Shadow Warriors",
    description: "An elite group of warriors must protect their village from an ancient evil that threatens to destroy everything they hold dear. With stunning action sequences and deep emotional storytelling.",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop",
    genre: ["Action", "Drama"],
    language: "Telugu",
    releaseYear: 2024,
    duration: "2h 35m",
    rating: 8.5,
    isFeatured: true,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "2",
    title: "Love in Mumbai",
    description: "Two strangers meet on a crowded train and discover a connection that transcends time and circumstance. A heartwarming tale of love against all odds.",
    posterUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=500&h=750&fit=crop",
    genre: ["Romance", "Drama"],
    language: "Hindi",
    releaseYear: 2024,
    duration: "2h 15m",
    rating: 7.8,
  },
  {
    id: "3",
    title: "The Last Kingdom",
    description: "In a world torn apart by war, one hero rises to unite the fractured lands. Epic battles and political intrigue await in this stunning saga.",
    posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop",
    backdropUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop",
    genre: ["Action", "Thriller"],
    language: "Telugu",
    releaseYear: 2024,
    duration: "2h 45m",
    rating: 9.0,
    isFeatured: true,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "4",
    title: "Comedy Nights",
    description: "A struggling comedian gets one last chance to prove himself at the biggest comedy festival in the country. Laughter, tears, and triumph await.",
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop",
    genre: ["Comedy"],
    language: "Tamil",
    releaseYear: 2023,
    duration: "1h 55m",
    rating: 7.2,
  },
  {
    id: "5",
    title: "Midnight Express",
    description: "A detective races against time to solve a series of mysterious disappearances aboard a luxury train crossing the desert.",
    posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&h=750&fit=crop",
    genre: ["Thriller", "Drama"],
    language: "Hindi",
    releaseYear: 2024,
    duration: "2h 20m",
    rating: 8.1,
  },
  {
    id: "6",
    title: "Star Beyond",
    description: "Humanity's last hope lies in a crew of astronauts who must journey to a distant galaxy to find a new home for mankind.",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&h=750&fit=crop",
    genre: ["Sci-Fi", "Action"],
    language: "English",
    releaseYear: 2024,
    duration: "2h 50m",
    rating: 8.7,
    isFeatured: true,
  },
  {
    id: "7",
    title: "The Haunting",
    description: "A family moves into their dream home, only to discover that they are not alone. Some doors should never be opened.",
    posterUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=750&fit=crop",
    genre: ["Horror", "Thriller"],
    language: "Telugu",
    releaseYear: 2023,
    duration: "1h 45m",
    rating: 7.5,
  },
  {
    id: "8",
    title: "Golden Dreams",
    description: "A young athlete from a small village defies all odds to compete at the international level, inspiring a nation.",
    posterUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=750&fit=crop",
    genre: ["Drama", "Action"],
    language: "Hindi",
    releaseYear: 2024,
    duration: "2h 30m",
    rating: 8.3,
  },
  {
    id: "9",
    title: "City of Shadows",
    description: "In a corrupt metropolis, a lone vigilante emerges to fight for justice. But the deeper he goes, the more dangerous it becomes.",
    posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=750&fit=crop",
    genre: ["Action", "Thriller"],
    language: "Telugu",
    releaseYear: 2024,
    duration: "2h 25m",
    rating: 8.0,
  },
  {
    id: "10",
    title: "Forever Yours",
    description: "Two childhood friends reunite after years apart, discovering that their bond has only grown stronger with time.",
    posterUrl: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=500&h=750&fit=crop",
    genre: ["Romance", "Comedy"],
    language: "Tamil",
    releaseYear: 2023,
    duration: "2h 10m",
    rating: 7.6,
  },
  {
    id: "11",
    title: "Rebel Force",
    description: "A group of freedom fighters battles against an oppressive regime to liberate their homeland in this action-packed thriller.",
    posterUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500&h=750&fit=crop",
    genre: ["Action", "Drama"],
    language: "Telugu",
    releaseYear: 2024,
    duration: "2h 40m",
    rating: 8.4,
  },
  {
    id: "12",
    title: "Ocean's Mystery",
    description: "Marine biologists discover an underwater civilization that has remained hidden for millennia, leading to an incredible adventure.",
    posterUrl: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=500&h=750&fit=crop",
    genre: ["Sci-Fi", "Thriller"],
    language: "English",
    releaseYear: 2024,
    duration: "2h 15m",
    rating: 7.9,
  },
];

export const getMovieById = (id: string): Movie | undefined => {
  return movies.find((movie) => movie.id === id);
};

export const getMoviesByGenre = (genre: string): Movie[] => {
  if (genre === "all") return movies;
  return movies.filter((movie) => 
    movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
  );
};

export const getFeaturedMovies = (): Movie[] => {
  return movies.filter((movie) => movie.isFeatured);
};
