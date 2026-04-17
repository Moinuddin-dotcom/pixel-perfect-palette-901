import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import portraitFooter from "@/assets/portrait-footer.jpg";

const FOOTER_LINKS = [
  {
    title: "Shop",
    links: [
      { to: "/products", label: "All Products" },
      { to: "/products?category=headphones", label: "Headphones" },
      { to: "/products?category=speakers", label: "Speakers" },
      { to: "/products?category=soundbars", label: "Soundbars" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/technology", label: "Technology" },
      { to: "/learn", label: "Learn" },
      { to: "/support", label: "Support" },
    ],
  },
  {
    title: "Help",
    links: [
      { to: "/support", label: "Contact" },
      { to: "/support", label: "Shipping" },
      { to: "/support", label: "Returns" },
      { to: "/support", label: "Warranty" },
    ],
  },
] as const;

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubmitting(true);
    // Backend wiring comes later — for now confirm intent.
    setTimeout(() => {
      toast.success("Thanks! You're on the list.");
      setEmail("");
      setSubmitting(false);
    }, 400);
  };

  return (
    <footer className="bg-ink text-cream">
      {/* Hero band */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 pt-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col justify-between">
          <h2 className="font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Ready to experience the <em className="text-ember not-italic">future</em> of sound?
          </h2>
          <form onSubmit={handleSubscribe} className="mt-10 flex max-w-md gap-2">
            <Input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-full border-cream/20 bg-transparent text-cream placeholder:text-cream/50"
              aria-label="Email address"
            />
            <Button
              type="submit"
              disabled={submitting}
              className="h-12 rounded-full bg-cream px-6 text-ink hover:bg-cream/90"
            >
              Subscribe
            </Button>
          </form>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
          <img
            src={portraitFooter}
            alt="Person wearing GadgetHive headphones"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-cream/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ember">
                <span className="text-xs font-bold text-ember-foreground">G</span>
              </div>
              <span className="font-display text-xl">GadgetHive</span>
            </Link>
            <p className="mt-4 text-sm text-cream/60">
              Premium audio engineered for everyday inspiration.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="rounded-full border border-cream/20 p-2 text-cream/80 transition-colors hover:bg-cream/10"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cream/60">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-cream/85 hover:text-cream">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-cream/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-cream/50 sm:flex-row sm:px-6 lg:px-8">
            <p>© {new Date().getFullYear()} GadgetHive. All rights reserved.</p>
            <p>Crafted with care · Stockholm · Tokyo · New York</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
