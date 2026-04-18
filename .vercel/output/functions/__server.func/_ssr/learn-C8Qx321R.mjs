import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SiteShell } from "./SiteShell-BOvSHctt.mjs";
import { p as portraitProducer } from "./router-CIQ6pUrp.mjs";
import { l as lifestyleSpeaker } from "./lifestyle-speaker-DwhOva3Q.mjs";
import { p as productHeadphones } from "./product-headphones-black-C1BQLp2n.mjs";
import "../_libs/sonner.mjs";
import "../_libs/react-hot-toast.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./button-Cz8PAkJh.mjs";
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
const ARTICLES = [{
  img: portraitProducer,
  tag: "Interview",
  title: "How a producer mixes a record with the Hive Pro",
  excerpt: "Inside the studio with one of our launch partners as he walks us through his everyday workflow."
}, {
  img: lifestyleSpeaker,
  tag: "Guide",
  title: "Setting up multi-room audio in five minutes",
  excerpt: "From unboxing to playing the same track in every room. The fastest path to whole-home sound."
}, {
  img: productHeadphones,
  tag: "Tech",
  title: "What lossless really means (and when you'll hear it)",
  excerpt: "A plain-language explainer on lossless audio, codecs, and what your gear actually delivers."
}];
function LearnPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "max-w-3xl font-display text-5xl leading-tight sm:text-6xl", children: "Stories, guides, and ideas from the studio." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid grid-cols-1 gap-8 md:grid-cols-3", children: ARTICLES.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: a.img, alt: "", width: 800, height: 600, loading: "lazy", className: "aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs uppercase tracking-wider text-ember", children: a.tag }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-2xl leading-tight", children: a.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: a.excerpt })
    ] }, a.title)) })
  ] }) });
}
export {
  LearnPage as component
};
