import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteShell";

const FAQS = [
  {
    q: "What's your return policy?",
    a: "All products carry a 30-day no-questions-asked return window. Just reach out and we'll take care of the rest.",
  },
  {
    q: "How long is the warranty?",
    a: "Two years standard, extendable to five with free product registration in the GadgetHive app.",
  },
  {
    q: "Where do you ship?",
    a: "We ship to over 80 countries from regional fulfillment centers, with free shipping on orders over $99.",
  },
  {
    q: "Can I pair products from different generations?",
    a: "Yes — every speaker, headphone, and soundbar from 2022 onward is interoperable in multi-room setups.",
  },
];

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support — GadgetHive" },
      {
        name: "description",
        content:
          "Get help with your GadgetHive products: FAQs, warranty info, shipping, and direct contact.",
      },
      { property: "og:title", content: "Support — GadgetHive" },
      {
        property: "og:description",
        content: "Answers and contact for GadgetHive customers.",
      },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message.trim()) {
      toast.error("Please fill in all fields with valid information.");
      return;
    }
    toast.success("Thanks! Our team will reply within one business day.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl leading-tight sm:text-6xl">How can we help?</h1>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">Frequently asked</h2>
            <Accordion type="single" collapsible className="mt-6">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <h2 className="font-display text-2xl">Contact us</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                required
              />
              <Textarea
                placeholder="How can we help?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={1000}
                rows={5}
                required
              />
              <Button type="submit" className="rounded-full">
                Send message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
