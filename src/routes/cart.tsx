import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteShell";
import {
  getCartDetails,
  setQty,
  removeFromCart,
  clearCart,
  type CartItemDetail,
} from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — GadgetHive" },
      { name: "description", content: "Review the items in your GadgetHive cart." },
      { property: "og:title", content: "Your Cart — GadgetHive" },
      { property: "og:description", content: "Review your selected GadgetHive products." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const [state, setState] = useState<{ items: CartItemDetail[]; total: number }>({
    items: [],
    total: 0,
  });

  useEffect(() => {
    const refresh = () => setState(getCartDetails());
    refresh();
    window.addEventListener("gh:cart", refresh);
    return () => window.removeEventListener("gh:cart", refresh);
  }, []);

  const handleCheckout = () => {
    if (state.items.length === 0) return;
    // Stripe wiring pending — for now simulate completion.
    toast.success("Order placed!");
    clearCart();
    window.location.href = "/checkout/success";
  };

  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl leading-tight sm:text-6xl">Your cart</h1>

        {state.items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center rounded-3xl bg-sand/40 p-16 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-lg">Your cart is empty.</p>
            <Button asChild className="mt-6 rounded-full">
              <Link to="/products">Browse products</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
            <ul className="divide-y divide-border">
              {state.items.map((line) => (
                <li key={line.product.slug} className="flex items-center gap-4 py-6">
                  <img
                    src={line.product.image}
                    alt={line.product.name}
                    width={120}
                    height={120}
                    loading="lazy"
                    className="h-24 w-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <Link
                      to="/products/$slug"
                      params={{ slug: line.product.slug }}
                      className="font-medium hover:underline"
                    >
                      {line.product.name}
                    </Link>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {line.product.type}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-border">
                      <button
                        onClick={() => setQty(line.product.slug, line.qty - 1)}
                        className="p-2"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm">{line.qty}</span>
                      <button
                        onClick={() => setQty(line.product.slug, line.qty + 1)}
                        className="p-2"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${line.subtotal}</p>
                    <button
                      onClick={() => removeFromCart(line.product.slug)}
                      className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <Trash2 className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-2xl bg-sand/40 p-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${state.total}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="mt-4 flex justify-between border-t border-border pt-4 text-lg font-medium">
                <span>Total</span>
                <span>${state.total}</span>
              </div>
              <Button
                onClick={handleCheckout}
                className="mt-6 h-12 w-full rounded-full bg-ink text-cream hover:bg-ink/90"
              >
                Checkout
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Secure payment · Free returns within 30 days
              </p>
            </aside>
          </div>
        )}
      </section>
    </SiteShell>
  );
}
