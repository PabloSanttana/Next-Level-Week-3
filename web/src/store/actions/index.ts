import * as ActionsTypes from "../actionTypes";

interface UserLogin {
  name: string;
  email: string;
  id: number;
  token: string;
}

export function authLOGIN(payload: UserLogin) {
  return {
    type: ActionsTypes.AUTH_LOGIN,
    payload,
  };
}
export function authLOGOUT() {
  return {
    type: ActionsTypes.AUTH_LOGOUT,
  };
}
