import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { SiteShell } from "@/components/site/SiteShell";
import heroImg from "@/assets/hero-headphones.jpg";
import { getActiveProducts } from "@/lib/server/products";
import { getCategories } from "@/lib/server/categories";

export const Route = createFileRoute("/products/")({
  loader: async () => {
    const [products, categories] = await Promise.all([
      getActiveProducts(),
      getCategories(),
    ]);
    return { products, categories };
  },
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
  const searchParams = Route.useSearch() as any;
  const category = searchParams.category || "all";
  const navigate = Route.useNavigate();
  const { products, categories } = Route.useLoaderData();

  const activeCategoryList = [
    { id: "all", label: "All" },
    ...categories.map((c: any) => ({
      id: c._id,
      label: c.name,
    })),
  ];

  // Note: product.category might be a populated object { _id, name } or a string ID
  const filtered =
    category === "all"
      ? products
      : products.filter((p: any) => {
          const catId = p.category?._id || p.category;
          return catId === category;
        });

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
          {activeCategoryList.map((c) => {
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

        {filtered.length === 0 && (
          <div className="mt-10 py-20 text-center bg-muted/30 rounded-2xl border border-border/50">
            <h3 className="text-xl font-medium text-foreground">No products found</h3>
            <p className="mt-2 text-muted-foreground">We couldn't find any products in this category.</p>
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p: any) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50">
                <img
                  src={p.images?.[0] || heroImg}
                  alt={p.name}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105 bg-muted/20"
                />
                {p.badge && (
                  <Badge className="absolute left-3 top-3 rounded-full px-3 py-1 border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 backdrop-blur-md shadow-sm">
                    {p.badge.name}
                  </Badge>
                )}
                {p.quantity === 0 && (
                  <Badge className="absolute right-3 top-3 rounded-full px-3 py-1 bg-neutral-800 text-white hover:bg-neutral-800">
                    Out of Stock
                  </Badge>
                )}
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {p.brand || p.category?.name || "Product"}
                  </p>
                  <p className="mt-1 font-medium">{p.name}</p>
                </div>
                <div className="text-right">
                  {p.discountPrice ? (
                    <>
                      <p className="font-medium text-ember">${p.discountPrice}</p>
                      <p className="text-xs text-muted-foreground line-through">${p.price}</p>
                    </>
                  ) : (
                    <p className="font-medium">${p.price}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
