import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.customer.create({
    data: {
      name: "John Smith",
      email: "john@example.com",
      orderId: "ORD1001",
      product: "Wireless Mouse",
      delivered: true,
      used: false,
      refundDays: 15,
    },
  });

  console.log("Customer created");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
