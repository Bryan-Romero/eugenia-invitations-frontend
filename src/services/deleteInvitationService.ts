import axios from "../api/axios";
import { ApiInvitations } from "../types/ApiRespondTypes";

export const deleteInvitationService = (
  jwt: string,
  id: string
): Promise<ApiInvitations> => {
  return new Promise(async (resolve, reject) => {
    await axios
      .delete("invitation/delete_invitation", {
        data: { id },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });
};
