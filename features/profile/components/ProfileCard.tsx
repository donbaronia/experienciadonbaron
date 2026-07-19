import { Card, CardLabel } from "@/components/Card";
import { formatDateBR } from "@/lib/utils";
import { getMemberProfile } from "../services/profile.service";
import { TierBadge } from "./TierBadge";

export async function ProfileCard() {
  const { data: profile } = await getMemberProfile();

  return (
    <Card elevated className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <CardLabel>Membro do Universo</CardLabel>
          <h2 className="mt-2 font-display text-4xl text-ivory">
            {profile.name}
          </h2>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ash">
            Desde {formatDateBR(profile.memberSince)}
          </p>
        </div>
        <TierBadge tier={profile.tier} />
      </div>
      <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ash-line pt-8 text-center">
        <div>
          <dt className="text-[0.6rem] uppercase tracking-[0.25em] text-ash">
            Pontos de coroa
          </dt>
          <dd className="mt-2 font-display text-3xl text-gold">
            {profile.crownPoints.toLocaleString("pt-BR")}
          </dd>
        </div>
        <div>
          <dt className="text-[0.6rem] uppercase tracking-[0.25em] text-ash">
            Pedidos
          </dt>
          <dd className="mt-2 font-display text-3xl text-ivory">
            {profile.ordersCount}
          </dd>
        </div>
        <div>
          <dt className="text-[0.6rem] uppercase tracking-[0.25em] text-ash">
            Criação favorita
          </dt>
          <dd className="mt-2 font-display text-lg leading-snug text-ivory">
            {profile.favoriteCreation}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
