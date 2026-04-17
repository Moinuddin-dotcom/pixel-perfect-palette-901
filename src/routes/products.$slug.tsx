import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteShell } from "@/components/site/SiteShell";
import { getProductBySlug } from "@/lib/server/products";
import { addToCart } from "@/lib/cart";
import heroImg from "@/assets/hero-headphones.jpg";

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ params }) => {
    try {
      const product = await getProductBySlug({ data: params.slug });
      if (!product) throw notFound();
      return { product };
    } catch (e) {
      throw notFound();
    }
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
        { property: "og:image", content: p.images?.[0] || heroImg },
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
  const [activeIdx, setActiveIdx] = useState(0);

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
          <div className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-3xl bg-card border border-border/50">
              <img
                src={product.images?.[activeIdx] || heroImg}
                alt={product.name}
                width={1024}
                height={1024}
                className="aspect-square w-full object-contain bg-muted/20 transition-all duration-300"
              />
              {!product.isActive && (
                <Badge className="absolute left-4 top-4 rounded-full px-3 py-1 bg-red-500 text-white hover:bg-red-600">
                  Draft
                </Badge>
              )}
              {product.quantity === 0 && (
                <Badge className="absolute right-4 top-4 rounded-full px-3 py-1 bg-neutral-800 text-white hover:bg-neutral-800">
                  Out of Stock
                </Badge>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative overflow-hidden rounded-2xl bg-card border-2 transition-all duration-200 aspect-square ${
                      activeIdx === idx 
                        ? "border-ember opacity-100" 
                        : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} thumbnail ${idx + 1}`} 
                      className="w-full h-full object-contain bg-muted/20 p-2" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {product.brand || product.category?.name || "Product"}
            </p>
            <h1 className="mt-2 font-display text-5xl leading-tight sm:text-6xl">
              {product.name}
            </h1>
            
            <div className="mt-4 flex items-center gap-3">
              {product.discountPrice ? (
                <>
                  <p className="text-3xl font-medium text-ember">${product.discountPrice}</p>
                  <p className="text-xl text-muted-foreground line-through">${product.price}</p>
                  <Badge className="bg-ember/10 text-ember hover:bg-ember/20">Sale</Badge>
                </>
              ) : (
                <p className="text-3xl font-medium">${product.price}</p>
              )}
            </div>

            <p className="mt-6 max-w-xl text-foreground/80">{product.description}</p>

            {product.variants && product.variants.length > 0 && (
              <ul className="mt-8 space-y-2">
                {product.variants.map((v: string) => (
                  <li key={v} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-ember" /> {v}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10 flex gap-3">
              <Button
                onClick={handleAdd}
                size="lg"
                disabled={product.quantity === 0 || !product.isActive}
                className="h-12 flex-1 rounded-full bg-ink text-cream hover:bg-ink/90 sm:flex-none sm:px-10"
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> 
                {product.quantity === 0 ? "Out of Stock" : "Add to cart"}
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
            
            <p className="mt-4 text-xs text-muted-foreground">
              {product.quantity > 0 ? `${product.quantity} items left in stock` : "Currently unavailable"}
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
