import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import portraitFooter from "@/assets/portrait-footer.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — GadgetHive" },
      {
        name: "description",
        content:
          "GadgetHive is an independent audio studio crafting headphones, speakers, and soundbars that are built to last.",
      },
      { property: "og:title", content: "About — GadgetHive" },
      {
        property: "og:description",
        content: "Meet the studio behind GadgetHive audio.",
      },
      { property: "og:image", content: portraitFooter },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <h1 className="max-w-3xl font-display text-5xl leading-tight sm:text-6xl lg:text-7xl">
          We make audio the way it should sound.
        </h1>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>
              GadgetHive started in 2019 as a small studio of three engineers and
              two industrial designers who believed audio gear had become quietly
              forgettable. We wanted products with the patience of a heritage
              brand and the intelligence of modern software.
            </p>
            <p>
              Today we ship to more than 80 countries from workshops in Stockholm,
              Tokyo, and New York. Every product we sell is built from
              recyclable materials, repairable, and supported for at least five
              years.
            </p>
            <p>
              We're independent, profitable, and built for the long haul. Thanks
              for listening.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl">
            <img
              src={portraitFooter}
              alt="Member of the GadgetHive team"
              width={1080}
              height={1350}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
