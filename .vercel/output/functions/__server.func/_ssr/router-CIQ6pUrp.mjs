import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createRouter, u as useRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as notFound } from "../_libs/tanstack__router-core.mjs";
import { F as Fe } from "../_libs/react-hot-toast.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./index.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/goober.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const appCss = "/assets/styles-b7Ss0cik.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
const Route$i = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GadgetHive — Premium Audio" },
      { name: "description", content: "Premium headphones, speakers, and soundbars from GadgetHive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "GadgetHive — Premium Audio" },
      { name: "twitter:title", content: "GadgetHive — Premium Audio" },
      { property: "og:description", content: "Premium headphones, speakers, and soundbars from GadgetHive." },
      { name: "twitter:description", content: "Premium headphones, speakers, and soundbars from GadgetHive." }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Fe, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
}
const lifestyleSoundbar = "/assets/lifestyle-soundbar-D8glGu7P.jpg";
const $$splitComponentImporter$h = () => import("./technology-Qy1vnsGK.mjs");
const Route$h = createFileRoute("/technology")({
  head: () => ({
    meta: [{
      title: "Technology — GadgetHive"
    }, {
      name: "description",
      content: "Trueplay room correction, lossless streaming, and adaptive ANC — the engineering behind every GadgetHive product."
    }, {
      property: "og:title",
      content: "Technology — GadgetHive"
    }, {
      property: "og:description",
      content: "Inside the engineering that powers GadgetHive audio."
    }, {
      property: "og:image",
      content: lifestyleSoundbar
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./support-BQGXIhlm.mjs");
const Route$g = createFileRoute("/support")({
  head: () => ({
    meta: [{
      title: "Support — GadgetHive"
    }, {
      name: "description",
      content: "Get help with your GadgetHive products: FAQs, warranty info, shipping, and direct contact."
    }, {
      property: "og:title",
      content: "Support — GadgetHive"
    }, {
      property: "og:description",
      content: "Answers and contact for GadgetHive customers."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./products-BFsOu0JM.mjs");
const Route$f = createFileRoute("/products")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./login-k17zDtI7.mjs");
const Route$e = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const portraitProducer = "/assets/portrait-producer-BWoqLBI9.jpg";
const $$splitComponentImporter$d = () => import("./learn-C8Qx321R.mjs");
const Route$d = createFileRoute("/learn")({
  head: () => ({
    meta: [{
      title: "Learn — GadgetHive"
    }, {
      name: "description",
      content: "Guides, interviews, and deep-dives on getting the most from your GadgetHive audio gear."
    }, {
      property: "og:title",
      content: "Learn — GadgetHive"
    }, {
      property: "og:description",
      content: "Audio guides and stories from the GadgetHive team."
    }, {
      property: "og:image",
      content: portraitProducer
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./dashboard-BsX8VvIX.mjs");
const Route$c = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — GadgetHive"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./cart-CyKWi8fj.mjs");
const Route$b = createFileRoute("/cart")({
  head: () => ({
    meta: [{
      title: "Your Cart — GadgetHive"
    }, {
      name: "description",
      content: "Review the items in your GadgetHive cart."
    }, {
      property: "og:title",
      content: "Your Cart — GadgetHive"
    }, {
      property: "og:description",
      content: "Review your selected GadgetHive products."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./auth-B80YtbQS.mjs");
const Route$a = createFileRoute("/auth")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const portraitFooter = "/assets/portrait-footer-D95VI7PZ.jpg";
const $$splitComponentImporter$9 = () => import("./about-Dmmibijs.mjs");
const Route$9 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — GadgetHive"
    }, {
      name: "description",
      content: "GadgetHive is an independent audio studio crafting headphones, speakers, and soundbars that are built to last."
    }, {
      property: "og:title",
      content: "About — GadgetHive"
    }, {
      property: "og:description",
      content: "Meet the studio behind GadgetHive audio."
    }, {
      property: "og:image",
      content: portraitFooter
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const heroImg = "/assets/hero-headphones-Cbk672iq.jpg";
const $$splitComponentImporter$8 = () => import("./index-LwrmU9Ug.mjs");
const Route$8 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "GadgetHive — Listen Without Limits"
    }, {
      name: "description",
      content: "Premium headphones, speakers, and soundbars engineered for clarity, comfort, and unforgettable sound."
    }, {
      property: "og:title",
      content: "GadgetHive — Listen Without Limits"
    }, {
      property: "og:description",
      content: "Premium headphones, speakers, and soundbars engineered for clarity, comfort, and unforgettable sound."
    }, {
      property: "og:image",
      content: heroImg
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }, {
      name: "twitter:image",
      content: heroImg
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const createProductFn = createServerFn({
  method: "POST"
}).handler(createSsrRpc("a5c29c84fbd343628c2c568c19c228b70581bcd25a9caed2fb456a4af49f0794"));
const getProducts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("86df8d8865db56cb8a30c01e847f90462d9497a37b0514201e4d945b4d3c3f61"));
const getProductBySlug = createServerFn({
  method: "GET"
}).handler(createSsrRpc("0323837a9679fd00874ec1023a01e53902ccf3781b6a4e1f6e34cf08070d730b"));
const deleteProductFn = createServerFn({
  method: "POST"
}).handler(createSsrRpc("d225ca0352828e682118b8ecf0afc6e25943e5dd476323349cc52f827cf3ea43"));
const toggleProductStatusFn = createServerFn({
  method: "POST"
}).handler(createSsrRpc("ef6bde1a38f64a7eeed42f8d62c987d1b008788de1f493f734de01a20b0fab78"));
const getCategories = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a1b273f801141b23a4f9e95ea787cd34402cb473115f68ced6058f287e3b84f3"));
const createCategoryFn = createServerFn({
  method: "POST"
}).handler(createSsrRpc("034604d2cba38e8350b43cb1f09142844bf6b224615701c86c4fb3ee1ff4d201"));
const deleteCategoryFn = createServerFn({
  method: "POST"
}).handler(createSsrRpc("d893fb04f8ff3fa87933a5bc9f6607e53e5620ce1eee54b5fdca3b7cb2511c9d"));
const toggleCategoryStatusFn = createServerFn({
  method: "POST"
}).handler(createSsrRpc("48b692843f90bba770e66123403dd4d5f2f7449fca1a934c9bcd6fc6d3f1a1f1"));
const $$splitComponentImporter$7 = () => import("./products.index-dUUbqd17.mjs");
const Route$7 = createFileRoute("/products/")({
  loader: async () => {
    const [products, categories] = await Promise.all([getProducts(), getCategories()]);
    return {
      products,
      categories
    };
  },
  head: () => ({
    meta: [{
      title: "All Products — GadgetHive"
    }, {
      name: "description",
      content: "Browse the full GadgetHive catalog of premium headphones, speakers, soundbars, and accessories."
    }, {
      property: "og:title",
      content: "All Products — GadgetHive"
    }, {
      property: "og:description",
      content: "Premium audio products handcrafted for clarity and comfort."
    }, {
      property: "og:image",
      content: heroImg
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./dashboard.index-Dn4O7p9G.mjs");
const Route$6 = createFileRoute("/dashboard/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./products._slug-D7N6SZ9V.mjs");
const $$splitErrorComponentImporter = () => import("./products._slug-DMo1R8lw.mjs");
const $$splitNotFoundComponentImporter = () => import("./products._slug-4Fj6fg2s.mjs");
const Route$5 = createFileRoute("/products/$slug")({
  loader: async ({
    params
  }) => {
    try {
      const product = await getProductBySlug({
        data: params.slug
      });
      if (!product) throw notFound();
      return {
        product
      };
    } catch (e) {
      throw notFound();
    }
  },
  head: ({
    loaderData
  }) => {
    const p = loaderData?.product;
    if (!p) return {
      meta: [{
        title: "Product — GadgetHive"
      }]
    };
    return {
      meta: [{
        title: `${p.name} — GadgetHive`
      }, {
        name: "description",
        content: p.description
      }, {
        property: "og:title",
        content: `${p.name} — GadgetHive`
      }, {
        property: "og:description",
        content: p.description
      }, {
        property: "og:image",
        content: p.images?.[0] || heroImg
      }]
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./checkout.success-DMGwiKn7.mjs");
const Route$4 = createFileRoute("/checkout/success")({
  head: () => ({
    meta: [{
      title: "Order confirmed — GadgetHive"
    }, {
      name: "description",
      content: "Thank you for your GadgetHive order."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./dashboard.products.index-ZnlbxRTl.mjs");
const Route$3 = createFileRoute("/dashboard/products/")({
  loader: async () => {
    const products = await getProducts();
    return {
      products
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./dashboard.categories.index-BIDtIGFh.mjs");
const Route$2 = createFileRoute("/dashboard/categories/")({
  loader: async () => {
    const categories = await getCategories();
    return {
      categories
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./dashboard.products.create-FyS3eowg.mjs");
const Route$1 = createFileRoute("/dashboard/products/create")({
  loader: async () => {
    const categories = await getCategories();
    return {
      categories
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./dashboard.categories.create-C416J7z5.mjs");
const Route = createFileRoute("/dashboard/categories/create")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TechnologyRoute = Route$h.update({
  id: "/technology",
  path: "/technology",
  getParentRoute: () => Route$i
});
const SupportRoute = Route$g.update({
  id: "/support",
  path: "/support",
  getParentRoute: () => Route$i
});
const ProductsRoute = Route$f.update({
  id: "/products",
  path: "/products",
  getParentRoute: () => Route$i
});
const LoginRoute = Route$e.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$i
});
const LearnRoute = Route$d.update({
  id: "/learn",
  path: "/learn",
  getParentRoute: () => Route$i
});
const DashboardRoute = Route$c.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$i
});
const CartRoute = Route$b.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$i
});
const AuthRoute = Route$a.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$i
});
const AboutRoute = Route$9.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$i
});
const IndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$i
});
const ProductsIndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => ProductsRoute
});
const DashboardIndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => DashboardRoute
});
const ProductsSlugRoute = Route$5.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => ProductsRoute
});
const CheckoutSuccessRoute = Route$4.update({
  id: "/checkout/success",
  path: "/checkout/success",
  getParentRoute: () => Route$i
});
const DashboardProductsIndexRoute = Route$3.update({
  id: "/products/",
  path: "/products/",
  getParentRoute: () => DashboardRoute
});
const DashboardCategoriesIndexRoute = Route$2.update({
  id: "/categories/",
  path: "/categories/",
  getParentRoute: () => DashboardRoute
});
const DashboardProductsCreateRoute = Route$1.update({
  id: "/products/create",
  path: "/products/create",
  getParentRoute: () => DashboardRoute
});
const DashboardCategoriesCreateRoute = Route.update({
  id: "/categories/create",
  path: "/categories/create",
  getParentRoute: () => DashboardRoute
});
const DashboardRouteChildren = {
  DashboardIndexRoute,
  DashboardCategoriesCreateRoute,
  DashboardProductsCreateRoute,
  DashboardCategoriesIndexRoute,
  DashboardProductsIndexRoute
};
const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren
);
const ProductsRouteChildren = {
  ProductsSlugRoute,
  ProductsIndexRoute
};
const ProductsRouteWithChildren = ProductsRoute._addFileChildren(
  ProductsRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AuthRoute,
  CartRoute,
  DashboardRoute: DashboardRouteWithChildren,
  LearnRoute,
  LoginRoute,
  ProductsRoute: ProductsRouteWithChildren,
  SupportRoute,
  TechnologyRoute,
  CheckoutSuccessRoute
};
const routeTree = Route$i._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$7 as R,
  portraitFooter as a,
  Route$5 as b,
  createSsrRpc as c,
  Route$3 as d,
  deleteProductFn as e,
  Route$2 as f,
  toggleCategoryStatusFn as g,
  heroImg as h,
  deleteCategoryFn as i,
  Route$1 as j,
  createProductFn as k,
  lifestyleSoundbar as l,
  createCategoryFn as m,
  portraitProducer as p,
  router as r,
  toggleProductStatusFn as t
};
