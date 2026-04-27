import { createFileRoute } from "@tanstack/react-router";
import { getOrdersFn } from "@/lib/server/orders";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard/orders/")({
  loader: async () => {
    const orders = await getOrdersFn();
    return { orders };
  },
  component: DashboardOrdersPage,
});

function DashboardOrdersPage() {
  const { orders } = Route.useLoaderData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
      case "delivered":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-semibold tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-1">Manage your customer orders.</p>
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order: any) => (
                <TableRow key={order._id}>
                  <TableCell className="font-mono text-xs">{order._id.substring(0, 8)}</TableCell>
                  <TableCell>
                    <div className="font-medium">{order.productName}</div>
                    <div className="text-xs text-muted-foreground">Qty: {order.quantity}</div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={order.deliveryLocation}>
                    {order.deliveryLocation}
                  </TableCell>
                  <TableCell className="uppercase text-xs font-medium">{order.paymentMethod}</TableCell>
                  <TableCell className="font-medium">${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(order.paymentStatus)}>
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(order.orderStatus)}>
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
