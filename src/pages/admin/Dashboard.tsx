import { Film, Users, Eye, TrendingUp } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { movies } from "@/data/movies";

const stats = [
  {
    name: "Total Movies",
    value: movies.length.toString(),
    icon: Film,
    change: "+2 this week",
    changeType: "positive",
  },
  {
    name: "Total Users",
    value: "12,459",
    icon: Users,
    change: "+234 this week",
    changeType: "positive",
  },
  {
    name: "Active Streams",
    value: "1,247",
    icon: Eye,
    change: "Live now",
    changeType: "neutral",
  },
  {
    name: "Growth",
    value: "+18.2%",
    icon: TrendingUp,
    change: "vs last month",
    changeType: "positive",
  },
];

const recentMovies = movies.slice(0, 5);

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your streaming platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                  <p className="mt-1 font-display text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p
                    className={`mt-1 text-xs ${
                      stat.changeType === "positive"
                        ? "text-green-500"
                        : "text-muted-foreground"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Movies */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
            Recent Movies
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Movie</th>
                  <th className="pb-3 font-medium">Genre</th>
                  <th className="pb-3 font-medium">Language</th>
                  <th className="pb-3 font-medium">Rating</th>
                  <th className="pb-3 font-medium">Year</th>
                </tr>
              </thead>
              <tbody>
                {recentMovies.map((movie) => (
                  <tr
                    key={movie.id}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="h-12 w-8 rounded object-cover"
                        />
                        <span className="font-medium text-foreground">
                          {movie.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                        {movie.genre[0]}
                      </span>
                    </td>
                    <td className="py-4 text-muted-foreground">{movie.language}</td>
                    <td className="py-4 font-medium text-primary">{movie.rating}</td>
                    <td className="py-4 text-muted-foreground">{movie.releaseYear}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
