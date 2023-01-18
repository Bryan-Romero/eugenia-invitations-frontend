import axios from "../api/axios";

export const deleteInvitationService = async (jwt: string | null, id: string): Promise<any> => {
  try {
    return await (
        await axios.delete(
            "invitation/delete_invitation", {
                data:{
                    id,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            }
          )).data;
  } catch (error: any) {
    console.log(error)
    throw error.response.data.message;
  }
};