import axios from "../api/axios";

export const getInvitationsByIdService = async (token: string): Promise<any> => {
  try {
    return await (
      await axios.get(`invitation/getInvitationById/${token}`)
    ).data;
  } catch (error: any) {
    console.log(error)
    throw error.response.data.message;
  }
};
