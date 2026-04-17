import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { registerUserFn } from "@/lib/server/auth";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, User, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/auth")({
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  
  // Steps: 1 = Details, 2 = Password
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form Data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI States
  const [showPassword, setShowPassword] = useState(false);

  // Regex: At least 1 uppercase, 1 lowercase, 1 number, 1 special character, min 8 length
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please enter both Name and Email");
      return;
    }
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordRegex.test(password)) {
      toast.error("Password must contain uppercase, lowercase, number and special character (e.g. Abcd@1212)");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await registerUserFn({ data: { name, email, password } as any });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      
      toast.success("Account created successfully! Please log in.");
      navigate({ to: "/login" });
    } catch (err: any) {
      toast.error(err.message || "Failed to register");
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
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {step === 1 && "Enter your details to get started"}
            {step === 2 && "Secure your account with a password"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>

        {/* Forms Container */}
        <div className="p-8">
          <form 
            onSubmit={handleNext} 
            className={`space-y-5 animate-in fade-in slide-in-from-right-4 duration-500 ${step === 1 ? 'block' : 'hidden'}`}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={step === 1}
                  autoFocus
                  className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="John Doe" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={step === 1}
                  className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="john@example.com" 
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-2 gap-2">
              Next Step
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <form 
            onSubmit={handleRegister} 
            className={`space-y-5 animate-in fade-in slide-in-from-right-4 duration-500 ${step === 2 ? 'block' : 'hidden'}`}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Create Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={step === 2}
                  className="w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Abcd@1212" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Must contain uppercase, lowercase, number & special char.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Re-type Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={step === 2}
                  className="w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Abcd@1212" 
                />
              </div>
            </div>
            
            <Button type="submit" disabled={loading} className="w-full mt-4 gap-2">
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
            
            <div className="text-center mt-4">
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Back to Details
              </button>
            </div>
          </form>

          {/* Always visible login link */}
          <div className="text-center mt-6 border-t border-border/40 pt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
