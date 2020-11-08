import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.9:3333",
  headers: {
    authorization: "Bearer " + AsyncStorage.getItem("acess_token"),
  },
});
export default api;
