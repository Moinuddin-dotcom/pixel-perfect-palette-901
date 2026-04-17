import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteShell } from "@/components/site/SiteShell";
import { getProduct } from "@/lib/products";
import { addToCart } from "@/lib/cart";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Product — GadgetHive" }] };
    return {
      meta: [
        { title: `${p.name} — GadgetHive` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — GadgetHive` },
        { property: "og:description", content: p.description },
        { property: "og:image", content: p.image },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
        <h1 className="font-display text-5xl">Product not found</h1>
        <p className="mt-4 text-muted-foreground">
          The product you're looking for doesn't exist or has been retired.
        </p>
        <Button asChild className="mt-8 rounded-full">
          <Link to="/products">Back to all products</Link>
        </Button>
      </div>
    </SiteShell>
  ),
  errorComponent: ({ error }) => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
        <h1 className="font-display text-4xl">Something went wrong</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
      </div>
    </SiteShell>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();

  const handleAdd = () => {
    addToCart(product.slug);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All products
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl bg-sand/50">
            <img
              src={product.image}
              alt={product.name}
              width={1024}
              height={1024}
              className="aspect-square w-full object-cover"
            />
            {product.badge && (
              <Badge
                className={`absolute left-4 top-4 rounded-full px-3 py-1 ${
                  product.badge === "New"
                    ? "bg-ember text-ember-foreground hover:bg-ember"
                    : "bg-ink text-cream hover:bg-ink"
                }`}
              >
                {product.badge}
              </Badge>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {product.type}
            </p>
            <h1 className="mt-2 font-display text-5xl leading-tight sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl">${product.price}</p>
            <p className="mt-6 max-w-xl text-foreground/80">{product.description}</p>

            <ul className="mt-8 space-y-2">
              {product.features.map((f: string) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-ember" /> {f}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex gap-3">
              <Button
                onClick={handleAdd}
                size="lg"
                className="h-12 flex-1 rounded-full bg-ink text-cream hover:bg-ink/90 sm:flex-none sm:px-10"
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> Add to cart
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-ink/20"
              >
                <Link to="/cart">View cart</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
