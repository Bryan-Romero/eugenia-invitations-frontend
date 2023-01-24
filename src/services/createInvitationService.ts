import axios from "../api/axios";
import { InputsCreateInvitation } from "../types/InputsTypes";
import { ApiInvitations } from "../types/ApiRespondTypes";

interface ResponseType extends ApiInvitations {
  token: string;
}

export const createInvitationService = async (
  jwt: string,
  data: InputsCreateInvitation
): Promise<ResponseType> => {
  return new Promise(async (resolve, reject) => {
    await axios
      .patch("invitation/create_invitation", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error.response.data.message);
      });
  });
};
