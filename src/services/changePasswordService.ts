import axios from "../api/axios";
import { InputsChangePassword } from "../types/InputsTypes";
import { ApiMessageSuccess } from "../types/ApiRespondTypes";

export const changePasswordService = async (
  token: string,
  data: InputsChangePassword
): Promise<ApiMessageSuccess> => {
  return new Promise(async (resolve, reject) => {
    await axios
      .patch(`user/changePassword/${token}`, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error.response.data.message);
      });
  });
};
