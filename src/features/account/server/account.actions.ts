import axios from "axios";
import Cookies from 'js-cookie';

export default async function changePasswordAction(values: any) {
  try {
    const token = Cookies.get("token"); 

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