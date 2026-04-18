import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as cn, B as Button } from "./button-Cz8PAkJh.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as portraitFooter } from "./router-CIQ6pUrp.mjs";
import { h as Search, g as LogOut, l as User, i as ShoppingBag, u as Menu, I as Instagram, v as Twitter, Y as Youtube, F as Facebook } from "../_libs/lucide-react.mjs";
const NAV = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/products", label: "Products" },
  { to: "/technology", label: "Technology" },
  { to: "/learn", label: "Learn" },
  { to: "/support", label: "Support" },
  { to: "/about", label: "About Us" }
];
function SiteHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = reactExports.useState(false);
  const [user, setUser] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
      }
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate({ to: "/login" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-accent-foreground", children: "G" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl tracking-tight", children: "GadgetHive" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-8 md:flex", children: NAV.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: item.to,
          className: "text-sm text-foreground/80 transition-colors hover:text-foreground",
          activeProps: { className: "text-foreground font-medium" },
          children: item.label
        },
        item.to
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Search", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }) }),
        user ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Logout", onClick: handleLogout, title: `Logged in as ${user.name}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4 text-red-500" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Account", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Cart", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            "aria-label": "Menu",
            className: "md:hidden",
            onClick: () => setOpen((v) => !v),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/60 bg-background md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6", children: NAV.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: item.to,
        className: "py-2 text-sm text-foreground/80",
        onClick: () => setOpen(false),
        children: item.label
      },
      item.to
    )) }) })
  ] });
}
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const FOOTER_LINKS = [
  {
    title: "Shop",
    links: [
      { to: "/products", label: "All Products" },
      { to: "/products?category=headphones", label: "Headphones" },
      { to: "/products?category=speakers", label: "Speakers" },
      { to: "/products?category=soundbars", label: "Soundbars" }
    ]
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/technology", label: "Technology" },
      { to: "/learn", label: "Learn" },
      { to: "/support", label: "Support" }
    ]
  },
  {
    title: "Help",
    links: [
      { to: "/support", label: "Contact" },
      { to: "/support", label: "Shipping" },
      { to: "/support", label: "Returns" },
      { to: "/support", label: "Warranty" }
    ]
  }
];
function SiteFooter() {
  const [email, setEmail] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thanks! You're on the list.");
      setEmail("");
      setSubmitting(false);
    }, 400);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-ink text-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 pt-20 sm:px-6 lg:grid-cols-2 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl", children: [
          "Ready to experience the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-ember not-italic", children: "future" }),
          " of sound?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubscribe, className: "mt-10 flex max-w-md gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "email",
              required: true,
              placeholder: "Enter your email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "h-12 rounded-full border-cream/20 bg-transparent text-cream placeholder:text-cream/50",
              "aria-label": "Email address"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: submitting,
              className: "h-12 rounded-full bg-cream px-6 text-ink hover:bg-cream/90",
              children: "Subscribe"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/5] overflow-hidden rounded-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: portraitFooter,
          alt: "Person wearing GadgetHive headphones",
          loading: "lazy",
          className: "h-full w-full object-cover"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-cream/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-ember", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-ember-foreground", children: "G" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl", children: "GadgetHive" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-cream/60", children: "Premium audio engineered for everyday inspiration." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex gap-3", children: [Instagram, Twitter, Youtube, Facebook].map((Icon, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#",
              className: "rounded-full border border-cream/20 p-2 text-cream/80 transition-colors hover:bg-cream/10",
              "aria-label": "Social link",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
            },
            i
          )) })
        ] }),
        FOOTER_LINKS.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold uppercase tracking-wider text-cream/60", children: col.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-3", children: col.links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: l.to, className: "text-sm text-cream/85 hover:text-cream", children: l.label }) }, l.label)) })
        ] }, col.title))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-cream/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-cream/50 sm:flex-row sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " GadgetHive. All rights reserved."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Crafted with care · Stockholm · Tokyo · New York" })
      ] }) })
    ] })
  ] });
}
function SiteShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  Input as I,
  SiteShell as S
};
