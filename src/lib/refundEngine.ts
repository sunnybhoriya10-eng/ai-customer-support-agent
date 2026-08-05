import { refundPolicy } from "../data/refundPolicy";
export function checkRefund(customer: any) {
  const today = new Date();

  const purchaseDate = new Date(customer.purchaseDate);

  const diff =
    (today.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24);

  if (!customer.delivered) {
    return {
      approved: false,
      reason: "Product is not delivered yet.",
    };
  }

  if (customer.used) {
    return {
      approved: false,
      reason: "Used products cannot be refunded.",
    };
  }

  if (diff > customer.refundDays) {
    return {
      approved: false,
      reason: "Refund period expired.",
    };
  }

  return {
    approved: true,
    reason: "Refund approved.",
  };
}
