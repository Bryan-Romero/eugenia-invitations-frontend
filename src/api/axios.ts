import axios from "axios";

const BASE_URL = "https://eugenia-invitations.onrender.com/api/";
const LOCAL_URL = "http://localhost:4000/api/";

export default axios.create({
  baseURL: BASE_URL,
});
