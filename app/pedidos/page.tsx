import type { Metadata } from "next";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";
import { OrdersTimeline } from "@/features/orders/components/OrdersTimeline";

export const metadata: Metadata = { title: "Pedidos" };

export default function OrdersPage() {
  return (
    <PageContainer>
      <PageIntro
        eyebrow="Histórico"
        title="Seus pedidos"
        description="Cada pedido conta uma parte da história — e acumula pontos de coroa para o Vault."
      />
      <OrdersTimeline />
    </PageContainer>
  );
}
