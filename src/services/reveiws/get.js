import axios from "axios";
import { cookies } from "src/Utils/common";
import URLS from "src/assets/References.json";

export default async function getComments(hotelId) {
  if (cookies.get("Authorization") == undefined) {
    throw "You must login first";
  }
  const url = "http://127.0.0.1:8000" + URLS.url_comment_get;
  return axios
    .get(`${url}${hotelId}`, {
      headers: {
        Authorization: cookies.get("Authorization"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      let message = "";
      if (error.response) {
        message = error.response.data.toString();
      } else if (error.request) {
        message = "An error occured while connecting the server";
      } else {
        message = error.message;
      }
      throw message;
    });
}
