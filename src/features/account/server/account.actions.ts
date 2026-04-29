"use server";

import axios from "axios";
import { cookies } from "next/headers";

export default async function changePasswordAction(values: any) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || null;

    if (!token) {
      throw new Error("Authentication required");
    }

    const { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      values,
      {
        headers: {
          token: token,
        },
      }
    );

    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update password",
      errors: error.response?.data?.errors
    };
  }
}
