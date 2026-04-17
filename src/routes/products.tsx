import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { SiteShell } from "@/components/site/SiteShell";
import { PRODUCTS, type ProductCategory } from "@/lib/products";
import heroImg from "@/assets/hero-headphones.jpg";

const CATEGORIES: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "headphones", label: "Headphones" },
  { id: "speakers", label: "Speakers" },
  { id: "soundbars", label: "Soundbars" },
  { id: "accessories", label: "Accessories" },
];

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: (search.category as string | undefined) ?? "all",
  }),
  head: () => ({
    meta: [
      { title: "All Products — GadgetHive" },
      {
        name: "description",
        content:
          "Browse the full GadgetHive catalog of premium headphones, speakers, soundbars, and accessories.",
      },
      { property: "og:title", content: "All Products — GadgetHive" },
      {
        property: "og:description",
        content: "Premium audio products handcrafted for clarity and comfort.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const filtered =
    category === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl leading-tight sm:text-6xl">
          Every product, all in one place.
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Filter the lineup by category. Each item is built, tested, and tuned
          in-house.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                onClick={() => navigate({ search: { category: c.id } })}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  active
                    ? "border-ink bg-ink text-cream"
                    : "border-border bg-transparent text-foreground hover:bg-secondary"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-2xl bg-card">
                <img
                  src={p.image}
                  alt={p.name}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {p.badge && (
                  <Badge
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 ${
                      p.badge === "New"
                        ? "bg-ember text-ember-foreground hover:bg-ember"
                        : "bg-ink text-cream hover:bg-ink"
                    }`}
                  >
                    {p.badge}
                  </Badge>
                )}
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {p.type}
                  </p>
                  <p className="mt-1 font-medium">{p.name}</p>
                </div>
                <p className="font-medium">${p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
