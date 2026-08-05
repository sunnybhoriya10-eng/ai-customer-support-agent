import { NextResponse } from "next/server";
import { customers } from "@/data/customers";
import { checkRefund } from "@/lib/refundEngine";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const customer = customers.find(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    );

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found",
        },
        {
          status: 404,
        },
      );
    }

    const decision = checkRefund(customer);

    const aiReply = `
Hello ${customer.name},

Thank you for contacting our customer support team.

We have reviewed your refund request for:

Product: ${customer.product}
Order ID: ${customer.orderId}

Refund Status:
${decision.approved ? "Approved ✅" : "Rejected ❌"}

Reason:
${decision.reason}

If you have any further questions, please feel free to contact us.

Thank you.
`;

    return NextResponse.json({
      customer,
      decision,
      aiReply,
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      {
        status: 500,
      },
    );
  }
}
