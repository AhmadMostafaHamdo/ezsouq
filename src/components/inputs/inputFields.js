// Auth form fields configuration

export const registerField = [
  { type: "text", name: "name", placeholder: "الاسم" },
  { type: "email", name: "email", placeholder: "الايميل" },
  { type: "text", name: "phone", placeholder: "رقم الهاتف" },
  { type: "password", name: "password", placeholder: "كلمة السر" },
  {
    type: "password",
    name: "confirm_password",
    placeholder: "تأكيد كلمة السر",
  },
];

export const loginField = [
  { type: "text", name: "login", placeholder: "الايميل أو رقم الهاتف" },
  { type: "password", name: "password", placeholder: "كلمة السر" },
];
