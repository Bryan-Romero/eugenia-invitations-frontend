import axios from "../api/axios";
import { InputsCreateInvitation } from "../types/InputsTypes";

export const createInvitationService = async (
  jwt: string | null,
  data: InputsCreateInvitation
): Promise<any> => {
  try {
    return await (
      await axios.patch("invitation/create_invitation", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
    ).data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};
