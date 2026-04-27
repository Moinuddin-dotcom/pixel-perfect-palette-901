import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, ShoppingBag, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteShell } from "@/components/site/SiteShell";
import { getProductBySlug } from "@/lib/server/products";
import { addToCart } from "@/lib/cart";
import heroImg from "@/assets/hero-headphones.jpg";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createOrderFn } from "@/lib/server/orders";

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ params }) => {
    try {
      const product = await getProductBySlug({ data: params.slug });
      if (!product) throw notFound();
      return { product };
    } catch (e) {
      throw notFound();
    }
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Product — GadgetHive" }] };
    return {
      meta: [
        { title: `${p.name} — GadgetHive` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — GadgetHive` },
        { property: "og:description", content: p.description },
        { property: "og:image", content: p.images?.[0] || heroImg },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
        <h1 className="font-display text-5xl">Product not found</h1>
        <p className="mt-4 text-muted-foreground">
          The product you're looking for doesn't exist or has been retired.
        </p>
        <Button asChild className="mt-8 rounded-full">
          <Link to="/products">Back to all products</Link>
        </Button>
      </div>
    </SiteShell>
  ),
  errorComponent: ({ error }) => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
        <h1 className="font-display text-4xl">Something went wrong</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
      </div>
    </SiteShell>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedQty, setSelectedQty] = useState<number | string>(1);
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"sslcommerz" | "cod">("cod");
  const [isOrdering, setIsOrdering] = useState(false);
  const navigate = useNavigate();

  const handleAdd = () => {
    const qty = Number(selectedQty) || 1;
    addToCart(product.slug, qty);
    toast.success(`${qty} ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    setLocationError("");
    setShowBuyDialog(true);
  };

  const confirmBuyNow = async () => {
    if (deliveryLocation.trim().length < 5) {
      setLocationError("Delivery location is required (min. 5 characters).");
      return;
    }
    
    setIsOrdering(true);
    try {
      const qty = Number(selectedQty) || 1;
      const res = await createOrderFn({
        data: {
          productName: product.name,
          quantity: qty,
          price: product.discountPrice || product.price,
          deliveryLocation,
          paymentMethod,
        }
      });
      
      if (res.success) {
        if (paymentMethod === "cod") {
          toast.success("Order placed successfully via Cash on Delivery!");
          setShowBuyDialog(false);
          navigate({ to: "/products" });
        } else if (res.paymentUrl) {
          toast.info("Redirecting to SSLCommerz payment gateway...");
          navigate({ to: res.paymentUrl as any });
        }
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All products
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-3xl bg-card border border-border/50">
              <img
                src={product.images?.[activeIdx] || heroImg}
                alt={product.name}
                width={1024}
                height={1024}
                className="aspect-square w-full object-contain bg-muted/20 transition-all duration-300"
              />
              {!product.isActive && (
                <Badge className="absolute left-4 top-4 rounded-full px-3 py-1 bg-red-500 text-white hover:bg-red-600">
                  Draft
                </Badge>
              )}
              {product.quantity === 0 && (
                <Badge className="absolute right-4 top-4 rounded-full px-3 py-1 bg-neutral-800 text-white hover:bg-neutral-800">
                  Out of Stock
                </Badge>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative overflow-hidden rounded-2xl bg-card border-2 transition-all duration-200 aspect-square ${
                      activeIdx === idx 
                        ? "border-ember opacity-100" 
                        : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} thumbnail ${idx + 1}`} 
                      className="w-full h-full object-contain bg-muted/20 p-2" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {product.brand || product.category?.name || "Product"}
            </p>
            <h1 className="mt-2 font-display text-5xl leading-tight sm:text-6xl">
              {product.name}
            </h1>
            
            <div className="mt-4 flex items-center gap-3">
              {product.discountPrice ? (
                <>
                  <p className="text-3xl font-medium text-ember">${product.discountPrice}</p>
                  <p className="text-xl text-muted-foreground line-through">${product.price}</p>
                  <Badge className="bg-ember/10 text-ember hover:bg-ember/20">Sale</Badge>
                </>
              ) : (
                <p className="text-3xl font-medium">${product.price}</p>
              )}
            </div>

            <p className="mt-6 max-w-xl text-foreground/80">{product.description}</p>

            {product.variants && product.variants.length > 0 && (
              <ul className="mt-8 space-y-2">
                {product.variants.map((v: string) => (
                  <li key={v} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-ember" /> {v}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground/80">Quantity</span>
                <div className="flex items-center rounded-full border border-input bg-background">
                  <button
                    type="button"
                    disabled={Number(selectedQty) <= 1 || product.quantity === 0 || !product.isActive}
                    onClick={() => setSelectedQty((q) => Math.max(1, Number(q) - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-l-full text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={selectedQty}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "") {
                        setSelectedQty("");
                        return;
                      }
                      const num = Number(val);
                      if (num > product.quantity) {
                        toast.error(`Only ${product.quantity} items available in stock`);
                        setSelectedQty(product.quantity);
                      } else {
                        setSelectedQty(num);
                      }
                    }}
                    onBlur={() => {
                      if (selectedQty === "" || Number(selectedQty) < 1) setSelectedQty(1);
                    }}
                    disabled={product.quantity === 0 || !product.isActive}
                    className="flex h-10 w-12 items-center justify-center text-center text-sm font-medium bg-transparent border-none focus:outline-none focus:ring-0 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    disabled={Number(selectedQty) >= product.quantity || product.quantity === 0 || !product.isActive}
                    onClick={() => setSelectedQty((q) => Math.min(product.quantity, Number(q) + 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-r-full text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleAdd}
                  size="lg"
                  disabled={product.quantity === 0 || !product.isActive}
                  className="h-12 flex-1 rounded-full bg-ink text-cream hover:bg-ink/90 sm:flex-none sm:px-8"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" /> 
                  {product.quantity === 0 ? "Out of Stock" : "Add to cart"}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  size="lg"
                  disabled={product.quantity === 0 || !product.isActive}
                  className="h-12 flex-1 rounded-full bg-ember text-white hover:bg-ember/90 sm:flex-none sm:px-8"
                >
                  Buy Now
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 flex-1 rounded-full border-ink/20 sm:flex-none sm:px-8"
                >
                  <Link to="/cart">View cart</Link>
                </Button>
              </div>
            </div>
            
            <p className="mt-4 text-xs text-muted-foreground">
              {product.quantity > 0 ? `${product.quantity} items left in stock` : "Currently unavailable"}
            </p>
          </div>
        </div>
      </section>

      <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Please review your order details and select a payment method.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2 rounded-lg bg-muted/50 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product</span>
                <span className="font-medium text-right max-w-[200px] truncate">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quantity</span>
                <span className="font-medium">{Number(selectedQty) || 1}</span>
              </div>
              <div className="flex justify-between border-t border-border/50 pt-2 mt-1">
                <span className="text-muted-foreground font-medium">Total Price</span>
                <span className="font-bold text-ember">
                  ${((product.discountPrice || product.price) * (Number(selectedQty) || 1)).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location" className={locationError ? "text-red-500" : ""}>Delivery Location</Label>
              <Textarea 
                id="location" 
                placeholder="Enter your full address..." 
                value={deliveryLocation}
                onChange={(e) => {
                  setDeliveryLocation(e.target.value);
                  if (locationError) setLocationError("");
                }}
                className={`resize-none ${locationError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
              {locationError && (
                <p className="text-xs text-red-500">{locationError}</p>
              )}
            </div>

            <div className="grid gap-3 pt-2">
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)}>
                <div className="flex items-center space-x-2 rounded-lg border p-3">
                  <RadioGroupItem value="sslcommerz" id="sslcommerz" />
                  <Label htmlFor="sslcommerz" className="flex-1 cursor-pointer">Proceed to payment (SSLCommerz)</Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-3">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex-1 cursor-pointer">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-end gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowBuyDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmBuyNow} disabled={isOrdering} className="bg-ink text-cream hover:bg-ink/90">
              {isOrdering ? "Processing..." : "Confirm Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SiteShell>
  );
}
