import axios from "../api/axios";
import { InputsCreateAccount } from "../types/InputsTypes";

export const createUserService = async (data: InputsCreateAccount):Promise<any> => {
  try {
    return await (await axios.post("user/createUser", data)).data
  } catch (error: any) {
    throw error.response.data.message;
  }
};