import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteShell";
import { updatePaymentStatusFn } from "@/lib/server/orders";
import { toast } from "sonner";
import { CheckCircle2, XCircle, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/payment/sslcommerz-mock")({
  component: SSLCommerzMockPage,
});

function SSLCommerzMockPage() {
  const navigate = useNavigate();
  const search = Route.useSearch() as { transactionId?: string; amount?: string };
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(40);

  useEffect(() => {
    if (!isSuccess) return;
    
    if (countdown <= 0) {
      navigate({ to: "/products" });
      return;
    }
    
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isSuccess, countdown, navigate]);

  const handlePayment = async (status: "success" | "failed") => {
    if (status === "success" && (cardNumber.length < 12 || cvc.length < 3)) {
      toast.error("Please enter a valid Card Number and CVC");
      return;
    }
    
    if (!search.transactionId) return;
    
    try {
      await updatePaymentStatusFn({ data: { transactionId: search.transactionId, status } });
      if (status === "success") {
        setIsSuccess(true);
      } else {
        toast.error("Payment failed. Please try again.");
        navigate({ to: "/products" });
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-md px-4 py-24 sm:px-6">
        <Card className="w-full overflow-hidden transition-all duration-500">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center p-10 text-center animate-in fade-in zoom-in duration-500">
              <div className="mb-6 rounded-full bg-green-100 p-4 text-green-600">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h2 className="mb-3 font-display text-2xl font-bold text-foreground">Payment Successful!</h2>
              <p className="mb-8 text-muted-foreground leading-relaxed">
                Your payment was processed successfully. You will receive the product within 5 working days.
              </p>
              
              <div className="flex w-full flex-col gap-3">
                <Button 
                  className="w-full h-12 bg-ink text-cream hover:bg-ink/90"
                  asChild
                >
                  <Link to="/products">View All Products</Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Redirecting automatically in {countdown}s...
                </p>
              </div>
            </div>
          ) : (
            <>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-display font-semibold">SSLCommerz Sandbox</CardTitle>
                <CardDescription>
                  This is a simulated payment gateway.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="grid gap-6">
                <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction ID</span>
                    <span className="font-medium">{search.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium text-lg">${search.amount}</span>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="cardNumber" 
                      placeholder="0000 0000 0000 0000" 
                      className="pl-9 h-10"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').substring(0, 16))}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC Number</Label>
                  <Input 
                    id="cvc" 
                    placeholder="123" 
                    type="password"
                    className="h-10"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                  />
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 pt-6">
                <Button 
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handlePayment("success")}
                >
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Simulate Success
                </Button>
                <Button 
                  className="w-full h-12 bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handlePayment("failed")}
                >
                  <XCircle className="mr-2 h-5 w-5" />
                  Simulate Failure
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full h-12"
                  asChild
                >
                  <Link to="/products">Cancel Payment</Link>
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </SiteShell>
  );
}
