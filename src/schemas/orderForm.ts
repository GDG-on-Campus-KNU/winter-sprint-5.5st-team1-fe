import { z } from "zod";

export const OrderFormSchema = z.object({
  selectedCoupon: z
    .object({
      id: z.number(),
      title: z.string(),
      discountRate: z.number(),
    })
    .nullable()
    .default(null),

  shippingInfo: z.object({
    name: z.string().min(1, "받는 분 성함을 입력해주세요."),
    phone: z
      .string()
      .min(1, "전화번호를 입력해주세요.")
      .regex(/^[0-9-]+$/, "숫자와 하이픈(-)만 입력 가능합니다."),
    address: z.string().min(1, "배송지 주소를 입력해주세요."),
    detailAddress: z.string().optional().default(""),
    deliveryMessage: z.string().optional().default(""),
  }),
});

export type OrderFormType = z.infer<typeof OrderFormSchema>;
