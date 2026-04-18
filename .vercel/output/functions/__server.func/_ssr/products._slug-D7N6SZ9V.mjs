import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-Cz8PAkJh.mjs";
import { B as Badge } from "./badge-B5fVHV-F.mjs";
import { S as SiteShell } from "./SiteShell-BOvSHctt.mjs";
import { a as addToCart } from "./cart-CRa6_w90.mjs";
import { b as Route$5, h as heroImg } from "./router-CIQ6pUrp.mjs";
import "../_libs/react-hot-toast.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { r as ArrowLeft, s as Check, i as ShoppingBag } from "../_libs/lucide-react.mjs";
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
import "./products-C5MT_6BH.mjs";
import "./product-headphones-black-C1BQLp2n.mjs";
import "../_libs/goober.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function ProductPage() {
  const {
    product
  } = Route$5.useLoaderData();
  const [activeIdx, setActiveIdx] = reactExports.useState(0);
  const handleAdd = () => {
    addToCart(product.slug);
    toast.success(`${product.name} added to cart`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " All products"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-card border border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.images?.[activeIdx] || heroImg, alt: product.name, width: 1024, height: 1024, className: "aspect-square w-full object-contain bg-muted/20 transition-all duration-300" }),
          !product.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute left-4 top-4 rounded-full px-3 py-1 bg-red-500 text-white hover:bg-red-600", children: "Draft" }),
          product.quantity === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute right-4 top-4 rounded-full px-3 py-1 bg-neutral-800 text-white hover:bg-neutral-800", children: "Out of Stock" })
        ] }),
        product.images && product.images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-4", children: product.images.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveIdx(idx), className: `relative overflow-hidden rounded-2xl bg-card border-2 transition-all duration-200 aspect-square ${activeIdx === idx ? "border-ember opacity-100" : "border-transparent opacity-50 hover:opacity-100"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: `${product.name} thumbnail ${idx + 1}`, className: "w-full h-full object-contain bg-muted/20 p-2" }) }, idx)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: product.brand || product.category?.name || "Product" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-5xl leading-tight sm:text-6xl", children: product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-center gap-3", children: product.discountPrice ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-medium text-ember", children: [
            "$",
            product.discountPrice
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl text-muted-foreground line-through", children: [
            "$",
            product.price
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-ember/10 text-ember hover:bg-ember/20", children: "Sale" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-medium", children: [
          "$",
          product.price
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-xl text-foreground/80", children: product.description }),
        product.variants && product.variants.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 space-y-2", children: product.variants.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-ember" }),
          " ",
          v
        ] }, v)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleAdd, size: "lg", disabled: product.quantity === 0 || !product.isActive, className: "h-12 flex-1 rounded-full bg-ink text-cream hover:bg-ink/90 sm:flex-none sm:px-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "mr-2 h-4 w-4" }),
            product.quantity === 0 ? "Out of Stock" : "Add to cart"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "lg", className: "h-12 rounded-full border-ink/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", children: "View cart" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-muted-foreground", children: product.quantity > 0 ? `${product.quantity} items left in stock` : "Currently unavailable" })
      ] })
    ] })
  ] }) });
}
export {
  ProductPage as component
};
