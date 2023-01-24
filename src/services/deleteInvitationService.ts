import axios from "../api/axios";
import { ApiInvitations } from "../types/ApiRespondTypes";

export const deleteInvitationService = (
  token: string,
  id: string
): Promise<ApiInvitations> => {
  return new Promise(async (resolve, reject) => {
    await axios
      .delete("invitation/delete_invitation", {
        data: { id },
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
