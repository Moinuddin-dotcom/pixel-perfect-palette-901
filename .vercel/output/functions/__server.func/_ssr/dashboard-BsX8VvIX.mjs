import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { b as LayoutDashboard, c as Layers, d as CirclePlus, S as ShoppingCart, P as Package, e as ChevronsUpDown, U as Users, f as Settings, g as LogOut, h as Search, B as Bell } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
function DashboardLayout() {
  const [isProductsOpen, setIsProductsOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-border/40 bg-card lg:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 shrink-0 items-center px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "font-display text-2xl font-medium tracking-tight text-foreground", children: [
        "Gadget",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-ember not-italic", children: "Hive" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col justify-between overflow-y-auto px-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", activeProps: {
            className: "bg-primary/5 text-foreground"
          }, inactiveProps: {
            className: "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
          }, className: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4 text-ember" }),
            "Overview"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Catalog" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/categories", activeProps: {
            className: "bg-primary/5 text-foreground"
          }, inactiveProps: {
            className: "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
          }, className: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }),
            "All Categories"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/categories/create", activeProps: {
            className: "bg-primary/5 text-foreground"
          }, inactiveProps: {
            className: "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
          }, className: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4" }),
            "Create Category"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Store" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-4 w-4" }),
            "Orders"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setIsProductsOpen(!isProductsOpen), className: "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }),
                "Products"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, { className: "h-4 w-4" })
            ] }),
            isProductsOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-col gap-1 pl-10 pr-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/products", activeProps: {
                className: "bg-primary/5 text-foreground"
              }, inactiveProps: {
                className: "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
              }, className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", children: "All Products" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/products/create", activeProps: {
                className: "bg-primary/5 text-foreground"
              }, inactiveProps: {
                className: "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
              }, className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", children: "Add Product" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
            "Customers"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col gap-1 mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }),
            "Settings"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            "Log out"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 lg:pl-64", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border/40 bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden sm:block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Search orders, products...", className: "h-9 w-64 rounded-md border border-input bg-background pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "relative rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 top-2 flex h-2 w-2 rounded-full bg-ember" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 overflow-hidden rounded-full border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://i.pravatar.cc/150?u=admin", alt: "Admin", className: "h-full w-full object-cover" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
    ] })
  ] });
}
export {
  DashboardLayout as component
};
