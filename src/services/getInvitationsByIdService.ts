import axios from "../api/axios";
import { ApiInvitation } from "../types/ApiRespondTypes";

export const getInvitationsByIdService = (
  tokenToShare: string
): Promise<ApiInvitation> => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(`invitation/getInvitationById/${tokenToShare}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error.response.data.message);
      });
  });
};
