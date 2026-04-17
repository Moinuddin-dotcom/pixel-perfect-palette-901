import { createFileRoute } from "@tanstack/react-router";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from "recharts";
import { 
  Users, DollarSign, ArrowUpRight, ArrowDownRight, Activity, CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
});

const revenueData = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
];

const trafficData = [
  { time: "00:00", visitors: 120 },
  { time: "04:00", visitors: 80 },
  { time: "08:00", visitors: 450 },
  { time: "12:00", visitors: 800 },
  { time: "16:00", visitors: 700 },
  { time: "20:00", visitors: 500 },
  { time: "23:59", visitors: 200 },
];

const recentOrders = [
  { id: "ORD-7290", customer: "Alice Johnson", date: "Today, 12:45 PM", amount: "$349.00", status: "Completed" },
  { id: "ORD-7291", customer: "Michael Smith", date: "Today, 11:20 AM", amount: "$129.00", status: "Processing" },
  { id: "ORD-7292", customer: "Emma Davis", date: "Today, 09:15 AM", amount: "$899.00", status: "Completed" },
  { id: "ORD-7293", customer: "James Wilson", date: "Yesterday", amount: "$199.00", status: "Shipped" },
  { id: "ORD-7294", customer: "Sophia Taylor", date: "Yesterday", amount: "$549.00", status: "Completed" },
];

function DashboardOverview() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Welcome back, here's what's happening with your store today.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Total Revenue" 
          value="$45,231.89" 
          trend="+20.1% from last month" 
          trendUp={true}
          icon={<DollarSign className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Active Subscriptions" 
          value="+2350" 
          trend="+180.1% from last month" 
          trendUp={true}
          icon={<Users className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Sales" 
          value="+12,234" 
          trend="+19% from last month" 
          trendUp={true}
          icon={<CreditCard className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Active Now" 
          value="573" 
          trend="-20 since last hour" 
          trendUp={false}
          icon={<Activity className="h-4 w-4" />} 
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-7 lg:gap-8">
        {/* Main Chart */}
        <div className="col-span-1 rounded-2xl border border-border/40 bg-card p-6 shadow-sm lg:col-span-4">
          <div className="mb-4">
            <h2 className="text-lg font-medium">Revenue Overview</h2>
            <p className="text-sm text-muted-foreground">Monthly revenue for the current year</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value}`} 
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar 
                  dataKey="total" 
                  fill="hsl(var(--foreground))" 
                  radius={[4, 4, 0, 0]} 
                  className="fill-foreground dark:fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Area Chart */}
        <div className="col-span-1 rounded-2xl border border-border/40 bg-card p-6 shadow-sm lg:col-span-3">
          <div className="mb-4">
            <h2 className="text-lg font-medium">Store Traffic</h2>
            <p className="text-sm text-muted-foreground">Visitors over the last 24 hours</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--ember))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--ember))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                />
                <Area type="monotone" dataKey="visitors" stroke="hsl(var(--ember))" fillOpacity={1} fill="url(#colorVisitors)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders List */}
      <div className="mt-8 rounded-2xl border border-border/40 bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border/40 px-6 py-5">
          <div>
            <h2 className="text-lg font-medium">Recent Orders</h2>
            <p className="text-sm text-muted-foreground">Latest transactions from your store.</p>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            View All
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/30 text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {recentOrders.map((order) => (
                <tr key={order.id} className="transition-colors hover:bg-muted/20">
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4 font-medium">{order.amount}</td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant="outline" 
                      className={
                        order.status === 'Completed' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' : 
                        order.status === 'Processing' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' : 
                        'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, trendUp, icon }: { title: string; value: string; trend: string; trendUp: boolean; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/5 text-foreground">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-display font-medium tracking-tight">{value}</p>
        <div className="mt-1 flex items-center gap-1 text-sm">
          {trendUp ? (
            <ArrowUpRight className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
          )}
          <span className={trendUp ? "text-green-500 font-medium" : "text-destructive font-medium"}>
            {trend.split(' ')[0]}
          </span>
          <span className="text-muted-foreground ml-1">{trend.split(' ').slice(1).join(' ')}</span>
        </div>
      </div>
    </div>
  );
}
