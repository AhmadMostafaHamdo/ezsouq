// hooks/useUserId.js
import { useMemo } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const useUserId = () => {
  const userId = useMemo(() => {
    const token = Cookies.get("token");
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded?.id || null;
    } catch (error) {
      return null;
    }
  }, []);

  return userId;
};

export default useUserId;
