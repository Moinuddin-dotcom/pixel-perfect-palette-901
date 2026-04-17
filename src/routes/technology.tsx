import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteShell";
import lifestyleSoundbar from "@/assets/lifestyle-soundbar.jpg";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology — GadgetHive" },
      {
        name: "description",
        content:
          "Trueplay room correction, lossless streaming, and adaptive ANC — the engineering behind every GadgetHive product.",
      },
      { property: "og:title", content: "Technology — GadgetHive" },
      {
        property: "og:description",
        content: "Inside the engineering that powers GadgetHive audio.",
      },
      { property: "og:image", content: lifestyleSoundbar },
    ],
  }),
  component: TechPage,
});

const PILLARS = [
  {
    title: "Trueplay room correction",
    body: "Microphones inside every device sample your space and tune output in real time, so the music sounds the way the artist intended.",
  },
  {
    title: "Lossless everywhere",
    body: "From Bluetooth LE Audio to Wi-Fi 6 multi-room, every product carries bit-perfect streams from source to ear.",
  },
  {
    title: "Adaptive ANC",
    body: "Custom DSP samples your environment 48,000 times per second, so noise cancellation never gets in the way of music.",
  },
  {
    title: "Built to last",
    body: "Replaceable batteries, repairable cabinets, and a five-year support promise on every product we ship.",
  },
];

function TechPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <h1 className="max-w-3xl font-display text-5xl leading-tight sm:text-6xl lg:text-7xl">
          The engineering behind every note.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Sound is physics, but listening is personal. We pair both with software
          that adapts to you.
        </p>

        <div className="mt-12 overflow-hidden rounded-3xl">
          <img
            src={lifestyleSoundbar}
            alt="Lifestyle soundbar"
            width={1600}
            height={1024}
            loading="lazy"
            className="h-[420px] w-full object-cover"
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <div key={p.title} className="rounded-2xl bg-sand/40 p-8">
              <h3 className="font-display text-2xl">{p.title}</h3>
              <p className="mt-3 text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Button asChild className="rounded-full">
            <Link to="/products">See it in action</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
