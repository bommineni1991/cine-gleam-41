import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isAdmin } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header isAdmin={isAdmin} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
