import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Movies from "./pages/Movies";
import Categories from "./pages/Categories";
import MovieDetail from "./pages/MovieDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Dashboard from "./pages/admin/Dashboard";
import AddMovie from "./pages/admin/AddMovie";
import EditMovie from "./pages/admin/EditMovie";
import ManageMovies from "./pages/admin/ManageMovies";
import AdminCategories from "./pages/admin/AdminCategories";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import Login from "./pages/admin/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/movies" element={<Movies />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/movie/:id" element={<MovieDetail />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />

    {/* Admin Routes */}
    <Route path="/admin/login" element={<Login />} />
    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/add-movie"
      element={
        <ProtectedRoute>
          <AddMovie />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/edit-movie/:id"
      element={
        <ProtectedRoute>
          <EditMovie />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/movies"
      element={
        <ProtectedRoute>
          <ManageMovies />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/categories"
      element={
        <ProtectedRoute>
          <AdminCategories />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/analytics"
      element={
        <ProtectedRoute>
          <Analytics />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/settings"
      element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      }
    />

    {/* Catch-all */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
