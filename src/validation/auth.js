import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: "الاسم مطلوب" }),
    infoContact: z
      .string()
      .min(1, { message: "الايميل مطلوب" })
      .email("الايميل غير صحيح"),
    password: z
      .string()
      .min(6, { message: "كلمة المرور يجب أن تكون على الأقل 6 حروف" }),
    confirm_password: z
      .string()
      .min(6, { message: "يجب أن تكون كلمة السر على الأقل 6 حروف" }),
    checkbox: z.literal(true, {
      errorMap: () => ({ message: "يجب الموافقة على سياسة الخصوصية" }),
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "كلمة السر وتأكيد كلمة السر غير متطابقتين",
    path: ["confirm_password"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "الايميل مطلوب" })
    .email("الايميل غير صحيح"),
  password: z
    .string()
    .min(6, { message: "يجب أن تكون كلمة السر على الأقل 6 حروف" }),
});
