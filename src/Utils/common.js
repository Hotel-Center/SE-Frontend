import references from "../assets/References.json";
import Cookies from "universal-cookie";

export const makeURL = (URL) => {
  return references.url_address + URL;
};
export const cookies = new Cookies();
export const get_user = () => {
  const user_str = sessionStorage.getItem("user");
  if (user_str) {
    return JSON.parse(user_str);
  } else {
    return null;
  }
};
export const get_token = () => {
  return sessionStorage.getItem("token") || null;
};

export const remove_user_session = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};
export const set_user_session = (token, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};
export const set_cookie = (token) => {
  cookies.set("Authorization", "token " + token);
};
