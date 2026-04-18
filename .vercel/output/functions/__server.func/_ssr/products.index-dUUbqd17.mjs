import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Badge } from "./badge-B5fVHV-F.mjs";
import { S as SiteShell } from "./SiteShell-BOvSHctt.mjs";
import { R as Route$7, h as heroImg } from "./router-CIQ6pUrp.mjs";
import "../_libs/sonner.mjs";
import "../_libs/react-hot-toast.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./button-Cz8PAkJh.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/goober.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function ProductsPage() {
  const searchParams = Route$7.useSearch();
  const category = searchParams.category || "all";
  const navigate = Route$7.useNavigate();
  const {
    products,
    categories
  } = Route$7.useLoaderData();
  const activeCategoryList = [{
    id: "all",
    label: "All"
  }, ...categories.map((c) => ({
    id: c._id,
    label: c.name
  }))];
  const filtered = category === "all" ? products : products.filter((p) => {
    const catId = p.category?._id || p.category;
    return catId === category;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl leading-tight sm:text-6xl", children: "Every product, all in one place." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xl text-muted-foreground", children: "Filter the lineup by category. Each item is built, tested, and tuned in-house." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex flex-wrap gap-2", children: activeCategoryList.map((c) => {
      const active = category === c.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        search: {
          category: c.id
        }
      }), className: `rounded-full border px-4 py-2 text-sm transition-colors ${active ? "border-ink bg-ink text-cream" : "border-border bg-transparent text-foreground hover:bg-secondary"}`, children: c.label }, c.id);
    }) }),
    filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 py-20 text-center bg-muted/30 rounded-2xl border border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-medium text-foreground", children: "No products found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "We couldn't find any products in this category." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products/$slug", params: {
      slug: p.slug
    }, className: "group block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl bg-card border border-border/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.images?.[0] || heroImg, alt: p.name, width: 1024, height: 1024, loading: "lazy", className: "aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105 bg-muted/20" }),
        !p.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute left-3 top-3 rounded-full px-3 py-1 bg-red-500 text-white hover:bg-red-600", children: "Draft" }),
        p.quantity === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute right-3 top-3 rounded-full px-3 py-1 bg-neutral-800 text-white hover:bg-neutral-800", children: "Out of Stock" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: p.brand || p.category?.name || "Product" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-medium", children: p.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: p.discountPrice ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-ember", children: [
            "$",
            p.discountPrice
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground line-through", children: [
            "$",
            p.price
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
          "$",
          p.price
        ] }) })
      ] })
    ] }, p.slug)) })
  ] }) });
}
export {
  ProductsPage as component
};
