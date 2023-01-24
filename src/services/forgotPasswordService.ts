import axios from "../api/axios";
import { InputsForgotPassword } from "../types/InputsTypes";
import { ApiMessageSuccess } from "../types/ApiRespondTypes";

export const forgotPasswordService = (
  data: InputsForgotPassword
): Promise<ApiMessageSuccess> => {
  return new Promise(async (resolve, reject) => {
    await axios
      .post("user/forgotPassword", data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error.response.data.message);
      });
  });
};
