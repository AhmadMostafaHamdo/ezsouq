import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { removeWishLocal } from "../wishlistSlice"; // تأكد من المسار الصحيح
import { getAllWishes } from "./getAllWishProduct";

export const likeToggleWishlistThunk = createAsyncThunk(
  "/wishlist/toggle",
  async (_id, { dispatch, rejectWithValue }) => {
    try {
      // إزالة المنتج محليًا مباشرة لجعل الواجهة أسرع
      dispatch(removeWishLocal(_id));

      // إرسال الطلب للسيرفر بشكل غير متزامن
      await axios.post(
        import.meta.env.VITE_USER_FAVORITE_TOGGLE_ENDPOINT,
        { product_id: _id },
        { headers: { authorization: `Bearer ${Cookies.get("token")}` } }
      );

      // يمكن تحديث المفضلة من السيرفر إذا أحببت التأكد من التزامن
      dispatch(getAllWishes());

      return _id;
    } catch (error) {
      const message = error.response?.data?.message || "حدث خطأ غير متوقع";
      toast.error(message);

      // إذا فشل الطلب، يمكن إعادة المنتج إلى الحالة المحلية (Rollback)
      // dispatch(addWishLocal(_id)); // تحتاج لإنشاء هذا الـ reducer إذا أردت
      return rejectWithValue(message);
    }
  }
);
