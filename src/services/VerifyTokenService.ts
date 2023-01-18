import axios from "../api/axios";

export const VerifyTokenService = async (jwt: string): Promise<any> => {
  try {
    return await (
      await axios.get("user/validate-token", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
    ).data;
  } catch (error: any) {
    throw error.response;
  }
};
