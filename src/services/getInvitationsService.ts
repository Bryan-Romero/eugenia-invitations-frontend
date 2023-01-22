import axios from "../api/axios";
import { ApiInvitations } from "../types/ApiRespondTypes";

export const getInvitationsService = (
  token: string
): Promise<ApiInvitations> => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get("invitation/read_invitation", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });
};
