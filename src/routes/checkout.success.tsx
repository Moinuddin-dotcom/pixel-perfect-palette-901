import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({
    meta: [
      { title: "Order confirmed — GadgetHive" },
      { name: "description", content: "Thank you for your GadgetHive order." },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-2xl px-4 py-32 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ember/10">
          <CheckCircle2 className="h-8 w-8 text-ember" />
        </div>
        <h1 className="mt-6 font-display text-5xl leading-tight">Thank you!</h1>
        <p className="mt-4 text-muted-foreground">
          Your order is confirmed. A receipt and tracking details are on the way to your inbox.
        </p>
        <Button asChild className="mt-8 rounded-full">
          <Link to="/products">Keep shopping</Link>
        </Button>
      </section>
    </SiteShell>
  );
}
