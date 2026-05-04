import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { 
  LayoutDashboard, ShoppingCart, Users, Package, 
  Settings, LogOut, Bell, Search, Layers, PlusCircle, ChevronsUpDown, Tag
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — GadgetHive" },
    ],
  }),
  component: DashboardLayout,
});

function DashboardLayout() {
  const [isProductsOpen, setIsProductsOpen] = useState(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isBadgesOpen, setIsBadgesOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-border/40 bg-card lg:flex">
        <div className="flex h-16 shrink-0 items-center px-6">
          <Link to="/" className="font-display text-2xl font-medium tracking-tight text-foreground">
            Gadget<em className="text-ember not-italic">Hive</em>
          </Link>
        </div>
        
        <div className="flex flex-1 flex-col justify-between overflow-y-auto px-4 py-4">
          <nav className="flex flex-col gap-1">
            <Link 
              to="/dashboard" 
              activeProps={{ className: "bg-primary/5 text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground hover:bg-primary/5 hover:text-foreground" }}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
            >
              <LayoutDashboard className="h-4 w-4 text-ember" />
              Overview
            </Link>
            
            <div className="mt-4 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Catalog
            </div>
            <div>
              <button 
                type="button"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
              >
                <div className="flex items-center gap-3">
                  <Layers className="h-4 w-4" />
                  Categories
                </div>
                <ChevronsUpDown className="h-4 w-4" />
              </button>
              
              {isCategoriesOpen && (
                <div className="mt-1 flex flex-col gap-1 pl-10 pr-3">
                  <Link 
                    to="/dashboard/categories" 
                    activeProps={{ className: "bg-primary/5 text-foreground" }}
                    inactiveProps={{ className: "text-muted-foreground hover:bg-primary/5 hover:text-foreground" }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                  >
                    View all category
                  </Link>
                  <Link 
                    to="/dashboard/categories/create" 
                    activeProps={{ className: "bg-primary/5 text-foreground" }}
                    inactiveProps={{ className: "text-muted-foreground hover:bg-primary/5 hover:text-foreground" }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Create Category
                  </Link>
                </div>
              )}
            </div>

            <div>
              <button 
                type="button"
                onClick={() => setIsBadgesOpen(!isBadgesOpen)}
                className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
              >
                <div className="flex items-center gap-3">
                  <Tag className="h-4 w-4" />
                  Badges
                </div>
                <ChevronsUpDown className="h-4 w-4" />
              </button>
              
              {isBadgesOpen && (
                <div className="mt-1 flex flex-col gap-1 pl-10 pr-3">
                  <Link 
                    to="/dashboard/badges" 
                    activeProps={{ className: "bg-primary/5 text-foreground" }}
                    inactiveProps={{ className: "text-muted-foreground hover:bg-primary/5 hover:text-foreground" }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                  >
                    View all Badges
                  </Link>
                  <Link 
                    to="/dashboard/badges/create" 
                    activeProps={{ className: "bg-primary/5 text-foreground" }}
                    inactiveProps={{ className: "text-muted-foreground hover:bg-primary/5 hover:text-foreground" }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Create Badges
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-4 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Store
            </div>
            <Link 
              to="/dashboard/orders" 
              activeProps={{ className: "bg-primary/5 text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground hover:bg-primary/5 hover:text-foreground" }}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              Orders
            </Link>
            
            <div>
              <button 
                type="button"
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
              >
                <div className="flex items-center gap-3">
                  <Package className="h-4 w-4" />
                  Products
                </div>
                <ChevronsUpDown className="h-4 w-4" />
              </button>
              
              {isProductsOpen && (
                <div className="mt-1 flex flex-col gap-1 pl-10 pr-3">
                  <Link 
                    to="/dashboard/products" 
                    activeProps={{ className: "bg-primary/5 text-foreground" }}
                    inactiveProps={{ className: "text-muted-foreground hover:bg-primary/5 hover:text-foreground" }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                  >
                    View all product
                  </Link>
                  <Link 
                    to="/dashboard/products/create" 
                    activeProps={{ className: "bg-primary/5 text-foreground" }}
                    inactiveProps={{ className: "text-muted-foreground hover:bg-primary/5 hover:text-foreground" }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Add Product
                  </Link>
                </div>
              )}
            </div>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground">
              <Users className="h-4 w-4" />
              Customers
            </a>
          </nav>

          <nav className="flex flex-col gap-1 mt-8">
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground">
              <Settings className="h-4 w-4" />
              Settings
            </a>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground">
              <LogOut className="h-4 w-4" />
              Log out
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border/40 bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search orders, products..."
                className="h-9 w-64 rounded-md border border-input bg-background pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-ember"></span>
            </button>
            <div className="h-8 w-8 overflow-hidden rounded-full border border-border">
              <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="h-full w-full object-cover" />
            </div>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
