import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createCategoryFn } from "@/lib/server/categories";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "@tanstack/react-router";
import toast from "react-hot-toast";

export const Route = createFileRoute("/dashboard/categories/create")({
  component: CreateCategoryPage,
});

function CreateCategoryPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
    };

    try {
      await createCategoryFn({ data });
      toast.success("Category created successfully!");
      navigate({ to: "/dashboard/categories" });
    } catch (err: any) {
      toast.error(err.message || "Failed to create category");
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link to="/dashboard/categories">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-display text-3xl sm:text-4xl">Create Category</h1>
          <p className="mt-1 text-sm text-muted-foreground">Add a new product category to your store.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border/40 bg-card shadow-sm p-6 sm:p-8">

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Category Name <span className="text-destructive">*</span></label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. Wireless Headphones" 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium">URL Slug <span className="text-destructive">*</span></label>
              <input 
                type="text" 
                id="slug" 
                name="slug" 
                required 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. wireless-headphones" 
              />
              <p className="text-xs text-muted-foreground">This will be used in the URL.</p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <textarea 
              id="description" 
              name="description" 
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Brief description of this category..." 
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-border/40">
            <Button type="button" variant="ghost" asChild className="mr-3">
              <Link to="/dashboard/categories">Cancel</Link>
            </Button>
            <Button type="submit" disabled={loading} className="gap-2">
              {loading ? "Creating..." : (
                <>
                  <Save className="h-4 w-4" />
                  Save Category
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
