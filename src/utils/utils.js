import { toast } from "react-toastify";

export const handleThunkError = (error, rejectWithValue) => {
  let errorMessage = "حدث خطأ غير متوقع";

  // Network errors (no internet)
  if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
    errorMessage =
      "لا يوجد اتصال بالإنترنت، يرجى التحقق من الاتصال والمحاولة مرة أخرى";
  }
  // Timeout errors
  else if (
    error.code === "ECONNABORTED" ||
    error.message?.includes("timeout")
  ) {
    errorMessage = "انتهت مهلة الاتصال، يرجى المحاولة مرة أخرى";
  }
  // Server response errors
  else if (error.response?.data?.message) {
    errorMessage = error.response.data.message;
  }

  toast.error(errorMessage);
  return rejectWithValue(errorMessage);
};
