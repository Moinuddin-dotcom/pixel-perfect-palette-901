import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteShell } from "@/components/site/SiteShell";
import { PRODUCTS, getFeatured } from "@/lib/products";
import heroImg from "@/assets/hero-headphones.jpg";
import productHeadphones from "@/assets/product-headphones-black.jpg";
import lifestyleSpeaker from "@/assets/lifestyle-speaker.jpg";
import lifestyleSoundbar from "@/assets/lifestyle-soundbar.jpg";
import portraitProducer from "@/assets/portrait-producer.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GadgetHive — Listen Without Limits" },
      {
        name: "description",
        content:
          "Premium headphones, speakers, and soundbars engineered for clarity, comfort, and unforgettable sound.",
      },
      { property: "og:title", content: "GadgetHive — Listen Without Limits" },
      {
        property: "og:description",
        content:
          "Premium headphones, speakers, and soundbars engineered for clarity, comfort, and unforgettable sound.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const featured = getFeatured();
  const all = PRODUCTS.slice(0, 4);

  return (
    <SiteShell>
      {/* 1. Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-ink">
            <img
              src={heroImg}
              alt="Woman wearing premium headphones"
              width={1080}
              height={1920}
              className="h-[640px] w-full object-cover opacity-90 sm:h-[720px] lg:h-[760px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

            {/* Top tagline */}
            <div className="absolute left-6 top-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cream/80 sm:left-10 sm:top-10">
              <Sparkles className="h-3.5 w-3.5 text-ember" />
              New season · 2026
            </div>

            {/* Headline */}
            <div className="absolute inset-x-0 bottom-0 px-6 pb-12 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20">
              <h1 className="font-display text-cream text-[18vw] leading-[0.85] sm:text-[14vw] lg:text-[10rem]">
                Listen <em className="text-ember not-italic">without</em> limits
              </h1>

              <div className="mt-8 grid grid-cols-1 items-end gap-6 lg:grid-cols-3">
                <p className="max-w-md text-cream/80 lg:col-span-2">
                  Hand-tuned drivers, intelligent noise cancellation, and finishes
                  built to last. The next chapter of how you hear the world.
                </p>
                <div className="flex justify-start lg:justify-end">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-full bg-cream px-6 text-ink hover:bg-cream/90"
                  >
                    <Link to="/products">
                      Explore Products <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Floating product preview card */}
            <div className="absolute right-6 top-24 hidden w-60 rounded-2xl border border-cream/15 bg-ink/70 p-4 text-cream backdrop-blur lg:block">
              <img
                src={productHeadphones}
                alt="Hive Pro headphones"
                width={400}
                height={400}
                loading="lazy"
                className="h-32 w-full rounded-xl object-cover"
              />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-cream/60">Featured</p>
                  <p className="font-medium">Hive Pro</p>
                </div>
                <span className="text-sm">$349</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand intro */}
      <section className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <p className="mx-auto max-w-3xl font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
          From pioneering wireless audio to designing state-of-the-art speakers,{" "}
          <em className="text-ember">GadgetHive</em> commits to innovation that
          moves and inspires.
        </p>
        <img
          src={productHeadphones}
          alt=""
          width={400}
          height={400}
          loading="lazy"
          className="absolute -right-4 top-10 hidden h-44 w-44 rotate-12 rounded-2xl object-cover shadow-xl sm:block lg:right-8"
          aria-hidden="true"
        />
      </section>

      {/* 3. Featured products */}
      <section className="bg-sand/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
              Designed for seamless sound and advanced technology
            </h2>
            <div className="flex items-center gap-4">
              <img
                src={portraitProducer}
                alt="Lead audio engineer"
                width={80}
                height={80}
                loading="lazy"
                className="h-12 w-12 rounded-full object-cover"
              />
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-full border-ink/20 bg-transparent px-5"
              >
                <Link to="/products">
                  Explore All Products <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.concat(all).slice(0, 4).map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl bg-card">
                  <img
                    src={p.image}
                    alt={p.name}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {p.badge && (
                    <Badge
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 ${
                        p.badge === "New"
                          ? "bg-ember text-ember-foreground hover:bg-ember"
                          : "bg-ink text-cream hover:bg-ink"
                      }`}
                    >
                      {p.badge}
                    </Badge>
                  )}
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {p.type}
                    </p>
                    <p className="mt-1 font-medium">{p.name}</p>
                  </div>
                  <p className="font-medium">${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Vibe / Harmony marquee */}
      <section className="overflow-hidden py-24">
        <div className="relative">
          <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-[14vw] leading-[0.9] text-foreground/15 sm:text-[10vw]">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-12">
                <span>Vibe</span>
                <span>Groove</span>
                <span className="text-ember">Harmony</span>
                <span>Amplify</span>
                <span>Move</span>
                <span>Vibe</span>
                <span>Groove</span>
                <span className="text-ember">Harmony</span>
                <span>Amplify</span>
                <span>Move</span>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
            <div className="rounded-2xl border border-border/60 bg-card/90 p-3 shadow-2xl backdrop-blur">
              <img
                src={portraitProducer}
                alt=""
                width={160}
                height={160}
                loading="lazy"
                aria-hidden="true"
                className="h-32 w-32 rounded-xl object-cover sm:h-40 sm:w-40"
              />
              <p className="mt-3 px-1 text-xs text-muted-foreground">
                Tuned by artists you love
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Dark feature panel */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-ink text-cream">
          <img
            src={lifestyleSoundbar}
            alt="Soundbar in a modern living room"
            width={1600}
            height={1024}
            loading="lazy"
            className="h-[420px] w-full object-cover opacity-70 sm:h-[520px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 grid grid-cols-1 gap-8 px-6 pb-10 sm:px-10 sm:pb-14 lg:grid-cols-3 lg:items-end">
            <h2 className="font-display text-4xl leading-tight sm:text-5xl lg:col-span-2">
              Unmatched quality, smart features, and innovative technologies.
            </h2>
            <div className="flex items-end gap-4 lg:justify-end">
              <img
                src={productHeadphones}
                alt=""
                width={200}
                height={200}
                loading="lazy"
                aria-hidden="true"
                className="h-24 w-24 rounded-xl object-cover"
              />
              <p className="max-w-xs text-sm text-cream/80">
                Trueplay room correction, lossless streaming, and a five-year
                support promise on every product we ship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Special offers */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl bg-card">
            <img
              src={lifestyleSpeaker}
              alt="Lifestyle speaker setup"
              width={1280}
              height={1600}
              loading="lazy"
              className="h-[460px] w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-cream/95 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Editor's pick
              </p>
              <p className="mt-1 font-display text-2xl">Built for golden hour</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Hum Mini · from $129
              </p>
            </div>
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-ink p-8 text-cream sm:p-12">
            <Badge className="w-fit rounded-full bg-ember text-ember-foreground hover:bg-ember">
              Limited time
            </Badge>
            <div>
              <h3 className="font-display text-4xl leading-tight sm:text-5xl">
                Black Friday Flash Sale
              </h3>
              <p className="mt-2 text-cream/70">50% off sitewide · ends Sunday</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-cream/60">Code <span className="text-cream">HIVE50</span></p>
              <Button
                asChild
                className="h-11 rounded-full bg-cream text-ink hover:bg-cream/90"
              >
                <Link to="/products">Shop the sale</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA band */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl bg-ink px-8 py-16 text-center text-cream sm:px-16 sm:py-20">
          <h2 className="mx-auto max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
            Transform your listening experience with{" "}
            <em className="text-ember not-italic">GadgetHive</em>.
          </h2>
          <Button
            asChild
            size="lg"
            className="mt-8 h-12 rounded-full bg-cream px-8 text-ink hover:bg-cream/90"
          >
            <Link to="/products">
              Shop Now <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
