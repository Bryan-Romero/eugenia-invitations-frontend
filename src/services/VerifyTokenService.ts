import axios from "../api/axios";
import { ApiLogin } from "../types/ApiRespondTypes";

export const verifyTokenService = (token: string): Promise<ApiLogin> => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get("user/validate-token", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error.response.data.message);
      });
  });
};
