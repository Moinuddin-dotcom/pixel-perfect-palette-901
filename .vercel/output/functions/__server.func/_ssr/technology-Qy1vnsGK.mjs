import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-Cz8PAkJh.mjs";
import { S as SiteShell } from "./SiteShell-BOvSHctt.mjs";
import { l as lifestyleSoundbar } from "./router-CIQ6pUrp.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/goober.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const PILLARS = [{
  title: "Trueplay room correction",
  body: "Microphones inside every device sample your space and tune output in real time, so the music sounds the way the artist intended."
}, {
  title: "Lossless everywhere",
  body: "From Bluetooth LE Audio to Wi-Fi 6 multi-room, every product carries bit-perfect streams from source to ear."
}, {
  title: "Adaptive ANC",
  body: "Custom DSP samples your environment 48,000 times per second, so noise cancellation never gets in the way of music."
}, {
  title: "Built to last",
  body: "Replaceable batteries, repairable cabinets, and a five-year support promise on every product we ship."
}];
function TechPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "max-w-3xl font-display text-5xl leading-tight sm:text-6xl lg:text-7xl", children: "The engineering behind every note." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl text-lg text-muted-foreground", children: "Sound is physics, but listening is personal. We pair both with software that adapts to you." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 overflow-hidden rounded-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: lifestyleSoundbar, alt: "Lifestyle soundbar", width: 1600, height: 1024, loading: "lazy", className: "h-[420px] w-full object-cover" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2", children: PILLARS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-sand/40 p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl", children: p.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: p.body })
    ] }, p.title)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "See it in action" }) }) })
  ] }) });
}
export {
  TechPage as component
};
