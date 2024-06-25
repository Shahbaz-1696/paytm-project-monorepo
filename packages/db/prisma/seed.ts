import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: "1111111111"},
    update: {},
    create: {
      name: "alice",
      number: "1111111111",
      password: await bcrypt.hash('alice', 10),
      Balance: {
        create: {
          amount: 20000,
          locked: 0
        }   
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token___1",
          provider: "HDFC Bank",
        }
      }
    }
  });

  const bob = await prisma.user.upsert({
    where: { number: "2222222222" },
    update: {},
    create: {
      name: "bob",
      number: "2222222222",
      password: await bcrypt.hash("bob", 10),
      Balance: {
        create: {
          amount: 2000,
          locked: 0,
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          amount: 2000,
          provider: "HDFC Bank",
          status: "Failure",
          token: "token__2",
        }
      }
    }
  });
  console.log(alice, bob);
}

main()
.then(async () => {
  await prisma.$disconnect();
})
.catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
})