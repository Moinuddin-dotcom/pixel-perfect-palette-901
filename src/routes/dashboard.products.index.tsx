import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { getProducts, deleteProductFn, toggleProductStatusFn } from "@/lib/server/products";
import { PlusCircle, Package, Trash2, ToggleLeft, ToggleRight, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

export const Route = createFileRoute("/dashboard/products/")({
  loader: async () => {
    const products = await getProducts();
    return { products };
  },
  component: ProductsPage,
});

function ProductsPage() {
  const { products } = Route.useLoaderData();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      toast.promise(
        deleteProductFn({ data: id }).then(() => router.invalidate()),
        {
          loading: 'Deleting product...',
          success: 'Product deleted successfully!',
          error: 'Failed to delete product.',
        }
      );
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    toast.promise(
      toggleProductStatusFn({ data: { id, isActive: !currentStatus } }).then(() => router.invalidate()),
      {
        loading: 'Updating status...',
        success: 'Product status updated!',
        error: 'Failed to update status.',
      }
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your product inventory and pricing.</p>
        </div>
        <Button asChild className="gap-2 shrink-0">
          <Link to="/dashboard/products/create">
            <PlusCircle className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <div className="rounded-2xl border border-border/40 bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/30 text-muted-foreground border-b border-border/40">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center">
                      <Package className="h-10 w-10 mb-3 text-muted-foreground/50" />
                      <p>No products found.</p>
                      <Button variant="link" asChild className="mt-2">
                        <Link to="/dashboard/products/create">Add your first product</Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product: any) => (
                  <tr key={product._id} className="transition-colors hover:bg-muted/20">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center overflow-hidden shrink-0">
                          {product.images && product.images.length > 0 ? (
                            <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                          ) : (
                            <Package className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {product.category?.name || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">${product.price.toFixed(2)}</span>
                        {product.discountPrice && (
                          <span className="text-xs text-ember line-through">${product.discountPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={product.quantity > 10 ? "border-green-500/20 text-green-600 bg-green-500/10" : product.quantity > 0 ? "border-amber-500/20 text-amber-600 bg-amber-500/10" : "border-destructive/20 text-destructive bg-destructive/10"}>
                        {product.quantity} in stock
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={product.isActive ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-muted text-muted-foreground"}>
                        {product.isActive ? "Active" : "Draft"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          title={product.isActive ? "Set to Draft" : "Set Active"}
                          onClick={() => handleToggleStatus(product._id, product.isActive)}
                        >
                          {product.isActive ? <ToggleRight className="h-5 w-5 text-green-500" /> : <ToggleLeft className="h-5 w-5" />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          title="Delete"
                          onClick={() => handleDelete(product._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
