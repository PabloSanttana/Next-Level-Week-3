import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    authorization: "Bearer " + localStorage.getItem("acess_token"),
  },
});
export default api;
