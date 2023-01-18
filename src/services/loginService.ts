import axios from "../api/axios";
import { InputsLogin } from "../types/InputsTypes";

export const loginService = async (data: InputsLogin):Promise<any> => {
  try {
    return await (await axios.post("user/login", data)).data
  } catch (error: any) {
    throw error.response.data.message;
  }
};
