import * as z from "zod";
export const stepOneSchema = z.object({
  Governorate_name: z.string().min(1, "يجب اختيار المحافظة"),
  city: z.string().min(1, "يجب اختيار المدينة"),
  description: z.string().min(1, "يجب كتابة وصف"),
  price: z.string().min(1, "يجب إدخال السعر"),
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
