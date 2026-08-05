export const refundPolicy = {
  maxRefundDays: 30,

  rules: [
    {
      id: 1,
      title: "Refund allowed within 30 days",
      description: "Customer must request refund within 30 days of purchase.",
    },
    {
      id: 2,
      title: "Product must be unused",
      description: "Used products are not eligible for refund.",
    },
    {
      id: 3,
      title: "Product must be delivered",
      description: "Refund cannot be processed before delivery.",
    },
  ],
};
