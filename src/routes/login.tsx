import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { loginUserFn } from "@/lib/server/auth";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form Data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI States
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      const res = await loginUserFn({ data: { email, password } as any });
      if (!res.success) {
        toast.error(res.error);
        return;
      }

      toast.success(`Welcome back, ${res.user.name}!`);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate({ to: "/" });
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-xl border border-border/40 overflow-hidden">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center border-b border-border/40 bg-muted/10">
          <Link to="/" className="inline-block mb-4">
            <span className="font-display text-2xl font-bold tracking-tight text-foreground">
              Gadget<em className="text-ember not-italic">Hive</em>
            </span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form Container */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="john@example.com" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="••••••••" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <Button type="submit" disabled={loading} className="w-full mt-4 gap-2">
              {loading ? "Signing in..." : (
                <>
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
            
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/auth" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
}
