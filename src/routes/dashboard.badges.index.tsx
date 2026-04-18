import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { getBadges, deleteBadgeFn, toggleBadgeStatusFn } from "@/lib/server/badges";
import { PlusCircle, Tag, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

export const Route = createFileRoute("/dashboard/badges/")({
  loader: async () => {
    const badges = await getBadges();
    return { badges };
  },
  component: BadgesPage,
});

function BadgesPage() {
  const { badges } = Route.useLoaderData();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this badge?")) {
      toast.promise(
        deleteBadgeFn({ data: id }).then(() => router.invalidate()),
        {
          loading: 'Deleting badge...',
          success: 'Badge deleted successfully!',
          error: 'Failed to delete badge.',
        }
      );
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    toast.promise(
      toggleBadgeStatusFn({ data: { id, isActive: !currentStatus } }).then(() => router.invalidate()),
      {
        loading: 'Updating status...',
        success: 'Badge status updated!',
        error: 'Failed to update status.',
      }
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl">Badges</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your product badges.</p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/dashboard/badges/create">
            <PlusCircle className="h-4 w-4" />
            Create Badge
          </Link>
        </Button>
      </div>

      <div className="rounded-2xl border border-border/40 bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/30 text-muted-foreground border-b border-border/40">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Slug</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Created</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {badges.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center">
                      <Tag className="h-10 w-10 mb-3 text-muted-foreground/50" />
                      <p>No badges found.</p>
                      <Button variant="link" asChild className="mt-2">
                        <Link to="/dashboard/badges/create">Create your first badge</Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                badges.map((badge: any) => (
                  <tr key={badge._id} className="transition-colors hover:bg-muted/20">
                    <td className="px-6 py-4 font-medium">{badge.name}</td>
                    <td className="px-6 py-4 text-muted-foreground max-w-xs truncate">{badge.description || "-"}</td>
                    <td className="px-6 py-4 font-mono text-xs">{badge.slug}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={badge.isActive ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-muted text-muted-foreground"}>
                        {badge.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(badge.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          title={badge.isActive ? "Deactivate" : "Activate"}
                          onClick={() => handleToggleStatus(badge._id, badge.isActive)}
                        >
                          {badge.isActive ? <ToggleRight className="h-5 w-5 text-green-500" /> : <ToggleLeft className="h-5 w-5" />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          title="Delete"
                          onClick={() => handleDelete(badge._id)}
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
