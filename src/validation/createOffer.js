import * as z from "zod";

/* الخطوة ١ */
export const stepOneSchema = z.object({
  Category_name: z
    .string()
    .min(1, "يجب اختيار النوع  سيارات او عقارات او تقنيات")
    .refine((val) => val !== "النوع", {
      message: "يجب اختيار النوع",
    }),
  Governorate_name: z
    .string()
    .min(1, "يجب اختيار المحافظة")
    .refine((val) => val !== "المحافظة", {
      message: "يجب اختيار المحافظة",
    }),
  city: z
    .string()
    .min(1, "يجب اختيار المنطقة")
    .refine((val) => val !== "المنطقة", {
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
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= 5 * 1024 * 1024,
          "حجم الصورة يجب أن لا يتجاوز 5 ميغابايت"
        )
    )
    .min(3, "يجب رفع ثلاث صور")
    .max(3, "لا تستطيع رفع أكثر من ثلاث صور")
    .refine((files) => {
      const names = files.map((f) => f.name);
      return new Set(names).size === names.length;
    }, "لا يمكن رفع نفس الصورة أكثر من مرة"),
});

/* الخطوة ٢ – سيارات */
export const stepTwoCarsSchema = z.object({
  name: z.string().nonempty("يجب إدخال اسم السيارة").max(24,"يجب ان يكون الاسم اقل من 24 حرف"),
  color: z.string().nonempty("يجب إدخال اللون"),
  for_sale: z.enum(["rent", "sale"], {
    errorMap: () => ({ message: "اختر نوع العملية" }),
  }),
  isnew: z.enum(["true", "false"], {
    errorMap: () => ({ message: "اختر الحالة" }),
  }),
  video: z.instanceof(File).optional(),
});

/* الخطوة ٢ – تقنيات */
export const stepTwoTecSchema = z.object({
  name: z
    .string()
    .min(1, "يجب إدخال اسم الجهاز")
    .max(24, "لا يمكن أن يزيد عن 24 حرفًا"),
  color: z.string().nonempty("يجب إدخال اللون"),
  isnew: z.enum(["true", "false"], {
    errorMap: () => ({ message: "اختر الحالة" }),
  }),
  processor: z.string().nonempty("يجب إدخال نوع المعالج"),
  memory: z
    .string()
    .nonempty("يجب إدخال الذاكرة")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), "يجب أن يكون رقمًا")
    .refine((val) => val >= 1, "يجب إدخال الذاكرة"),
  video: z.instanceof(File).optional(),
});

/* الخطوة ٢ – عقارات */
export const stepTwoRealStateSchema = z.object({
  real_estate_type: z.string().nonempty("اختر نوع العقار"),
  for_sale: z.enum(["rent", "sale"], {
    errorMap: () => ({ message: "اختر نوع العملية" }),
  }),
  is_Furniture: z.enum(["مفروشة", "غير مفروشة"], {
    errorMap: () => ({ message: "اختر حالة العقار" }),
  }),
  video: z.instanceof(File).optional(),
  name: z.string().nonempty(),
});
