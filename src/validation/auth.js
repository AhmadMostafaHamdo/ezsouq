import { z } from "zod";

const phoneRegex = /^\+?\d{10,15}$/;

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: "الاسم مطلوب" }),
    email: z
      .string()
      .min(1, { message: "الايميل مطلوب" })
      .email("الايميل غير صحيح"),
    phone: z
      .string()
      .min(1, { message: "رقم الهاتف مطلوب" })
      .regex(phoneRegex, "رقم الهاتف غير صحيح"),
    password: z
      .string()
      .min(6, { message: "كلمة المرور يجب ان تكون على الاقل 6 حروف" }),
    confirm_password: z
      .string()
      .min(6, { message: "يجب ان تكون كلمة السر على الاقل 6 حروف" }),
    checkbox: z.literal(true, {
      errorMap: () => ({ message: "يجب الموافقة على سياسة الخصوصية" }),
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "كلمة السر وتأكيد كلمة السر غير متطابقين",
    path: ["confirm_password"],
  });

export const loginSchema = z.object({
  login: z
    .string()
    .min(1, { message: "الايميل او رقم الهاتف مطلوب" })
    .refine((val) => {
      const emailCheck = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
      const phoneCheck = phoneRegex.test(val);
      return emailCheck || phoneCheck;
    }, { message: "يجب ان يكون الايميل او رقم الهاتف صحيح" }),
  password: z
    .string()
    .min(6, { message: "يجب ان تكون كلمة السر على الاقل 6 حروف" }),
});
