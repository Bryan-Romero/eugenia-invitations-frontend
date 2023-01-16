import axios from "axios";

const BASE_URL = "https://eugenia-invitations.onrender.com/api/";

export default axios.create({
  baseURL: BASE_URL,
});
