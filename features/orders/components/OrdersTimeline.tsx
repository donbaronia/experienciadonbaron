import { Reveal } from "@/components/Reveal";
import { getRecentOrders } from "../services/orders.service";
import { OrderRow } from "./OrderRow";

export async function OrdersTimeline() {
  const { data: orders } = await getRecentOrders();

  return (
    <div>
      {orders.map((order, index) => (
        <Reveal key={order.id} delay={index * 0.08}>
          <OrderRow order={order} />
        </Reveal>
      ))}
    </div>
  );
}
