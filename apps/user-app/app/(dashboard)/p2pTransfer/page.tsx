import { getServerSession } from "next-auth";
import { P2PTransactions } from "../../../components/P2PTransactions";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getP2PTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2PTransfer.findMany({
        where: {
            toUserId: Number(session?.user?.id),
        }
    });

    return txns.map(t => ({
     time: t.timestamp,
     amount: t.amount,   
    }))
}

export default async function () {
    const transactions = await getP2PTransactions();
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        P2P Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <SendCard />
        </div>
        <div>
            <div className="pt-4">
                <P2PTransactions transactions={transactions} />
            </div>
        </div>
      </div>
    </div>
  );
}
