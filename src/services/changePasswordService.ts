import axios from "../api/axios";
import { InputsChangePassword } from "../types/InputsTypes";

export const changePasswordService = async (
  token: string,
  data: InputsChangePassword
): Promise<any> => {
  try {
    return await (
      await axios.patch(`user/changePassword/${token}`, data)
    ).data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};
