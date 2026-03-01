import { z } from "zod";

export const OrderFormSchema = z.object({
  selectedCoupon: z
    .object({
      id: z.number(),
      title: z.string(),
      discountRate: z.number(),
    })
    .nullable(),

  shippingInfo: z.object({
    name: z.string().min(1, " "),
    phone: z
      .string()
      .min(1, " ")
      .regex(/^[0-9-]+$/, "숫자와 하이픈(-)만 입력해주세요."),
    address: z.string().min(1, " "),
    detailAddress: z.string(),
    deliveryMessage: z.string(),
  }),
});

export type OrderFormType = z.infer<typeof OrderFormSchema>;
