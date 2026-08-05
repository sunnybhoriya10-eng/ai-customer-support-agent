import { NextResponse } from "next/server";
import { customers } from "@/data/customers";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const customer = customers.find(
      (item) => item.email === email.toLowerCase(),
    );

    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 },
      );
    }

    const approved = customer.refundDays <= 30;

    return NextResponse.json({
      customer,

      decision: {
        approved,
        reason: approved ? "Refund approved" : "Refund period expired.",
      },

      aiReply: `
Hello ${customer.name},

Thank you for contacting our customer support team.

Product: ${customer.product}
Order ID: ${customer.orderId}

Refund Status:
${approved ? "Approved ✅" : "Rejected ❌"}

Reason:
${approved ? "Customer is eligible for refund." : "Refund period expired."}

Thank you.
`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      },
    );
  }
}
