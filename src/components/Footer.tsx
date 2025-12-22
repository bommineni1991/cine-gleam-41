import { Link } from "react-router-dom";
import { Github, Twitter, Instagram } from "lucide-react";
import ibommaLogo from "@/assets/ibomma-logo.png";
import ibommaName from "@/assets/ibomma-name.png";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-1">
              <img
                src={ibommaLogo}
                alt="IBOMMA Logo"
                className="h-14 w-auto object-contain"
              />
              <img
                src={ibommaName}
                alt="IBOMMA"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Your destination for streaming Telugu, Hindi, and Tamil movies.
              Enjoy unlimited entertainment in stunning quality.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-display font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-muted-foreground transition-colors hover:text-primary">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground transition-colors hover:text-primary">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-display font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground transition-colors hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-muted-foreground transition-colors hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} IBOMMA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
