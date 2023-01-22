import axios from "../api/axios";
import { ApiInvitation } from "../types/ApiRespondTypes";

export const getInvitationsByIdService = (
  tokenShareInvitation: string
): Promise<ApiInvitation> => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(`invitation/getInvitationById/${tokenShareInvitation}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });
};
