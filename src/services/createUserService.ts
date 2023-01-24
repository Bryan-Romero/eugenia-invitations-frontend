import axios from "../api/axios";
import { InputsCreateAccount } from "../types/InputsTypes";
import { ApiLogin } from "../types/ApiRespondTypes";

export const createUserService = async (
  data: InputsCreateAccount
): Promise<ApiLogin> => {
  return new Promise(async (resolve, reject) => {
    await axios
      .post("user/createUser", data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error.response.data.message);
      });
  });
};
