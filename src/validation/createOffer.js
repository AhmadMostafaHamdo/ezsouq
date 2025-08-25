import * as z from "zod";
export const stepOneSchema = z.object({
  category: z
    .string()
    .min(1, "يجب اختيار النوع  سيارات او عقارات او تقنيات")
    .refine((val) => val != "النوع", {
      message: "يجب اختيار النوع",
    }),
  Governorate_name: z
    .string()
    .min(1, "يجب اختيار المحافظة")
    .refine((val) => val != "المحافظة", {
      message: "يجب اختيار المحافظة",
    }),
  city: z
    .string()
    .min(1, "يجب اختيار المنطقة")
    .refine((val) => val != "المنطقة", {
      message: "يجب اختيار المنطقة",
    }),
  description: z.string().min(1, "يجب كتابة وصف"),
  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({
        required_error: "يجب أن تدخل السعر",
        invalid_type_error: "السعر يجب أن يكون رقمًا",
      })
      .positive("السعر يجب أن يكون أكبر من الصفر")
  ),
  main_photos: z
    .array(z.instanceof(File))
    .min(1, "يجب رفع صورة واحدة على الأقل"),
});
/* الخطوة ٢ – سيارات (Home) */
export const stepTwoHomeSchema = z.object({
  carName: z.string().nonempty("يجب إدخال اسم السيارة"),
  color: z.string().nonempty("يجب إدخال اللون"),
  dealType: z.enum(["rent", "sale"], {
    errorMap: () => ({ message: "اختر نوع العملية" }),
  }),
  isnew: z.enum(["جديدة", "مستعملة"], {
    errorMap: () => ({ message: "اختر الحالة" }),
  }),
  video: z.instanceof(File).optional(),
});

/* الخطوة ٢ – أجهزة تقنية (Tec) */
export const stepTwoTecSchema = z.object({
  name: z.string().nonempty("يجب إدخال اسم الجهاز"),
  Category_name: z.string().nonempty("يجب اختيار النوع"),
  color: z.string().nonempty("يجب إدخال اللون"),
  isnew: z.enum(["new", "used"], {
    errorMap: () => ({ message: "اختر الحالة" }),
  }),
  processor: z.string().nonempty("يجب إدخال نوع المعالج"),
  memory: z.string().nonempty("يجب إدخال الذاكرة"),
  video: z.instanceof(File).optional(),
});
// Zod schema
export const stepTwoCarsSchema = z.object({
  carName: z.string().nonempty("يجب إدخال اسم السيارة"),
  color: z.string().nonempty("يجب إدخال اللون"),
  dealType: z.enum(["rent", "sale"], {
    errorMap: () => ({ message: "اختر نوع العملية" }),
  }),
  isnew: z.enum(["جديدة", "مستعملة"], {
    errorMap: () => ({ message: "اختر الحالة" }),
  }),
  video: z.any().optional(),
});
 // Zod schema للعقارات
export const stepTwoRealStateSchema = z.object({
  type: z.string().nonempty("اختر نوع العقار"),
  dealType: z.enum(["rent", "sale"], {
    errorMap: () => ({ message: "اختر نوع العملية" }),
  }),
  condition: z.enum(["مفروشة", "غير مفروشة"], {
    errorMap: () => ({ message: "اختر حالة العقار" }),
  }),
  video: z.any().optional(),
});