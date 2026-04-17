import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getCategories } from "@/lib/server/categories";
import { createProductFn } from "@/lib/server/products";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, UploadCloud, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/dashboard/products/create")({
  loader: async () => {
    const categories = await getCategories();
    return { categories };
  },
  component: CreateProductPage,
});

// Backend will handle the Cloudinary upload using the API credentials

function CreateProductPage() {
  const { categories } = Route.useLoaderData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (images.length + selectedFiles.length > 5) {
        toast.error("You can only upload up to 5 images.");
        return;
      }
      
      const newImages = [...images, ...selectedFiles];
      setImages(newImages);
      
      const newPreviewUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    const newUrls = [...imagePreviewUrls];
    URL.revokeObjectURL(newUrls[index]);
    newUrls.splice(index, 1);
    setImagePreviewUrls(newUrls);
  };

  const convertImagesToBase64 = async (): Promise<string[]> => {
    if (images.length === 0) return [];
    
    const promises = images.map((image) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(image);
      });
    });

    return Promise.all(promises);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      let uploadedImageUrls: string[] = [];
      if (images.length > 0) {
        toast.loading("Processing images...", { id: "upload" });
        uploadedImageUrls = await convertImagesToBase64();
        toast.success("Images processed!", { id: "upload" });
      }

      const variantsString = formData.get("variants") as string;
      const variants = variantsString ? variantsString.split(",").map(v => v.trim()).filter(v => v) : [];
      
      const discountPriceStr = formData.get("discountPrice") as string;

      const data = {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        category: formData.get("category") as string,
        brand: formData.get("brand") as string,
        description: formData.get("description") as string,
        variants,
        images: uploadedImageUrls,
        price: Number(formData.get("price")),
        discountPrice: discountPriceStr ? Number(discountPriceStr) : undefined,
        quantity: Number(formData.get("quantity")),
      };

      toast.loading("Saving product...", { id: "save" });
      await createProductFn({ data });
      toast.success("Product created successfully!", { id: "save" });
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      toast.error(err.message || "Failed to create product", { id: "save" });
      // Clear the upload loading toast if it errored out there
      toast.dismiss("upload"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link to="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-display text-3xl sm:text-4xl">Add Product</h1>
          <p className="mt-1 text-sm text-muted-foreground">Fill in the details to add a new product to your catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl border border-border/40 bg-card shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-medium mb-4">Basic Information</h2>
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Product Name <span className="text-destructive">*</span></label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. Sony WH-1000XM5" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="slug" className="text-sm font-medium">URL Slug <span className="text-destructive">*</span></label>
                <input 
                  type="text" 
                  id="slug" 
                  name="slug" 
                  required 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. sony-wh-1000xm5" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="brand" className="text-sm font-medium">Brand</label>
                <input 
                  type="text" 
                  id="brand" 
                  name="brand" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. Sony" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description <span className="text-destructive">*</span></label>
              <textarea 
                id="description" 
                name="description" 
                required
                rows={6}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Detailed product description..." 
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-card shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-medium mb-4">Pricing & Inventory</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">Price ($) <span className="text-destructive">*</span></label>
                <input 
                  type="number" 
                  step="0.01"
                  min="0"
                  id="price" 
                  name="price" 
                  required 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="299.99" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="discountPrice" className="text-sm font-medium">Discount Price ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  min="0"
                  id="discountPrice" 
                  name="discountPrice" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="249.99" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium">Stock Quantity <span className="text-destructive">*</span></label>
                <input 
                  type="number" 
                  min="0"
                  id="quantity" 
                  name="quantity" 
                  required 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="50" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Organization & Media */}
        <div className="space-y-8">
          <div className="rounded-2xl border border-border/40 bg-card shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-medium">Organization</h2>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Category <span className="text-destructive">*</span></label>
              <select 
                id="category" 
                name="category" 
                required 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select a category...</option>
                {categories.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="variants" className="text-sm font-medium">Variants (comma separated)</label>
              <input 
                type="text" 
                id="variants" 
                name="variants" 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Black, Silver, Midnight Blue" 
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-card shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Product Images</h2>
              <span className="text-xs text-muted-foreground">{images.length} / 5</span>
            </div>
            
            <div className="space-y-4">
              {/* Image Upload Box */}
              {images.length < 5 && (
                <div className="relative border-2 border-dashed border-border/60 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-muted/30 transition-colors cursor-pointer group">
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Click or drag images to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max 5)</p>
                </div>
              )}

              {/* Image Previews */}
              {imagePreviewUrls.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border/40 group">
                      <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          type="button"
                          onClick={() => removeImage(index)}
                          className="bg-destructive text-destructive-foreground p-1.5 rounded-full hover:scale-110 transition-transform"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" size="lg" disabled={loading} className="w-full gap-2">
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving Product...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Publish Product
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
