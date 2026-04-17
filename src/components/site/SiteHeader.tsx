import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/products", label: "Products" },
  { to: "/technology", label: "Technology" },
  { to: "/learn", label: "Learn" },
  { to: "/support", label: "Support" },
  { to: "/about", label: "About Us" },
] as const;

export function SiteHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate({ to: "/login" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent">
            <span className="text-xs font-bold text-accent-foreground">G</span>
          </div>
          <span className="font-display text-xl tracking-tight">GadgetHive</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          
          {user ? (
            <Button variant="ghost" size="icon" aria-label="Logout" onClick={handleLogout} title={`Logged in as ${user.name}`}>
              <LogOut className="h-4 w-4 text-red-500" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" aria-label="Account" asChild>
              <Link to="/auth"><User className="h-4 w-4" /></Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" aria-label="Cart" asChild>
            <Link to="/cart"><ShoppingBag className="h-4 w-4" /></Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Menu"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="py-2 text-sm text-foreground/80"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
