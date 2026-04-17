import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — GadgetHive" },
      { name: "description", content: "Sign in to your GadgetHive account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 6) {
      toast.error("Please enter a valid email and a password of 6+ characters.");
      return;
    }
    toast.success("Auth backend coming soon.");
  };

  return (
    <SiteShell>
      <section className="mx-auto max-w-md px-4 py-24 sm:px-6">
        <h1 className="font-display text-5xl">
          {mode === "signin" ? "Welcome back" : "Create account"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {mode === "signin"
            ? "Sign in to manage orders and saved items."
            : "Join GadgetHive for early access and member pricing."}
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-3">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="h-11 w-full rounded-full">
            {mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-muted-foreground hover:text-foreground"
          >
            {mode === "signin" ? "Need an account?" : "Have an account?"}
          </button>
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Back home
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
