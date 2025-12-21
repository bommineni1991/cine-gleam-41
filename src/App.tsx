import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Movies from "./pages/Movies";
import Categories from "./pages/Categories";
import MovieDetail from "./pages/MovieDetail";
import Dashboard from "./pages/admin/Dashboard";
import AddMovie from "./pages/admin/AddMovie";
import ManageMovies from "./pages/admin/ManageMovies";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/add-movie" element={<AddMovie />} />
          <Route path="/admin/movies" element={<ManageMovies />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
