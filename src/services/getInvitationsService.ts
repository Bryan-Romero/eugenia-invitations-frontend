import axios from "../api/axios";

export const getInvitationsService = async (jwt: string | null): Promise<any> => {
  try {
    return await (
      await axios.get("/invitation/read_invitation", {
        headers: { Authorization: `Bearer ${jwt}` }
      })
    ).data;
  } catch (error: any) {
    console.log(error)
    throw error.response.data.message;
  }
};
