import axios from "../api/axios";
import { InputsForgotPassword } from "../types/InputsTypes";

export const forgotPasswordService = async (data:InputsForgotPassword ):Promise<any> => {
  try {
    return await (await axios.post("user/forgotPassword", data)).data
  } catch (error: any) {
    throw error.response.data.message;
  }
};