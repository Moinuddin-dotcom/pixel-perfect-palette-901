import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import portraitProducer from "@/assets/portrait-producer.jpg";
import lifestyleSpeaker from "@/assets/lifestyle-speaker.jpg";
import productHeadphones from "@/assets/product-headphones-black.jpg";

const ARTICLES = [
  {
    img: portraitProducer,
    tag: "Interview",
    title: "How a producer mixes a record with the Hive Pro",
    excerpt:
      "Inside the studio with one of our launch partners as he walks us through his everyday workflow.",
  },
  {
    img: lifestyleSpeaker,
    tag: "Guide",
    title: "Setting up multi-room audio in five minutes",
    excerpt:
      "From unboxing to playing the same track in every room. The fastest path to whole-home sound.",
  },
  {
    img: productHeadphones,
    tag: "Tech",
    title: "What lossless really means (and when you'll hear it)",
    excerpt:
      "A plain-language explainer on lossless audio, codecs, and what your gear actually delivers.",
  },
];

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — GadgetHive" },
      {
        name: "description",
        content:
          "Guides, interviews, and deep-dives on getting the most from your GadgetHive audio gear.",
      },
      { property: "og:title", content: "Learn — GadgetHive" },
      {
        property: "og:description",
        content: "Audio guides and stories from the GadgetHive team.",
      },
      { property: "og:image", content: portraitProducer },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <h1 className="max-w-3xl font-display text-5xl leading-tight sm:text-6xl">
          Stories, guides, and ideas from the studio.
        </h1>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {ARTICLES.map((a) => (
            <article key={a.title} className="group">
              <div className="overflow-hidden rounded-2xl bg-card">
                <img
                  src={a.img}
                  alt=""
                  width={800}
                  height={600}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-xs uppercase tracking-wider text-ember">
                {a.tag}
              </p>
              <h2 className="mt-2 font-display text-2xl leading-tight">{a.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
