import api from "../../services/api";
import * as ActionTypes from "../actionTypes";
import { Reducer } from "redux";

interface User {
  name: string;
  email: string;
  token: string;
  id: number;
}
interface InitialState {
  isAuthenticated: boolean;
  user: User;
}
const defaultUser: User = {
  name: "",
  email: "",
  token: "",
  id: 0,
};

const initialState: InitialState = {
  isAuthenticated: false,
  user: {
    name: "",
    email: "",
    token: "",
    id: 0,
  },
};

const authLogin = (state = initialState, payload: User) => {
  const { name, token, email, id } = payload;
  localStorage.setItem("acess_token", token);

  api.defaults.headers.authorization = `Bearer ${token}`;

  const user = {
    name,
    email,
    token,
    id,
  };

  const stateObj = {
    ...state,
    isAuthenticated: true,
    user,
  };

  return stateObj;
};
const logout = (state = initialState) => {
  localStorage.removeItem("acess_token");
  api.defaults.headers.authorization = null;

  const stateObj = {
    ...state,
    isAuthenticated: false,
    user: defaultUser,
  };

  return stateObj;
};

const Athu: Reducer<InitialState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_LOGIN:
      return authLogin(state, action.payload);
    case ActionTypes.AUTH_LOGOUT:
      return logout(state);
    default:
      return state;
  }
};

export default Athu;
