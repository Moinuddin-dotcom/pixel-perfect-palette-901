import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-Cz8PAkJh.mjs";
import { S as SiteShell } from "./SiteShell-BOvSHctt.mjs";
import { s as setQty, r as removeFromCart, g as getCartDetails, c as clearCart } from "./cart-CRa6_w90.mjs";
import "../_libs/react-hot-toast.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { i as ShoppingBag, j as Minus, k as Plus, T as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./router-CIQ6pUrp.mjs";
import "../_libs/goober.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./products-C5MT_6BH.mjs";
import "./product-headphones-black-C1BQLp2n.mjs";
function CartPage() {
  const [state, setState] = reactExports.useState({
    items: [],
    total: 0
  });
  reactExports.useEffect(() => {
    const refresh = () => setState(getCartDetails());
    refresh();
    window.addEventListener("gh:cart", refresh);
    return () => window.removeEventListener("gh:cart", refresh);
  }, []);
  const handleCheckout = () => {
    if (state.items.length === 0) return;
    toast.success("Order placed!");
    clearCart();
    window.location.href = "/checkout/success";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-5xl px-4 pb-24 pt-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl leading-tight sm:text-6xl", children: "Your cart" }),
    state.items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 flex flex-col items-center rounded-3xl bg-sand/40 p-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg", children: "Your cart is empty." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Browse products" }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: state.items.map((line) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-4 py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: line.product.image, alt: line.product.name, width: 120, height: 120, loading: "lazy", className: "h-24 w-24 rounded-xl object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$slug", params: {
            slug: line.product.slug
          }, className: "font-medium hover:underline", children: line.product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: line.product.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 inline-flex items-center gap-1 rounded-full border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(line.product.slug, line.qty - 1), className: "p-2", "aria-label": "Decrease quantity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center text-sm", children: line.qty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(line.product.slug, line.qty + 1), className: "p-2", "aria-label": "Increase quantity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
            "$",
            line.subtotal
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => removeFromCart(line.product.slug), className: "mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
            " Remove"
          ] })
        ] })
      ] }, line.product.slug)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "h-fit rounded-2xl bg-sand/40 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "$",
            state.total
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex justify-between text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Calculated at checkout" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-between border-t border-border pt-4 text-lg font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "$",
            state.total
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleCheckout, className: "mt-6 h-12 w-full rounded-full bg-ink text-cream hover:bg-ink/90", children: "Checkout" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-xs text-muted-foreground", children: "Secure payment · Free returns within 30 days" })
      ] })
    ] })
  ] }) });
}
export {
  CartPage as component
};
