import axios from "../api/axios";
import { InputsLogin } from "../types/InputsTypes";
import { ApiLogin } from "../types/ApiRespondTypes";

export const loginService = (data: InputsLogin): Promise<ApiLogin> => {
  return new Promise(async (resolve, reject) => {
    await axios
      .post("user/login", data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error.response.data.message);
      });
  });
};
