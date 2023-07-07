import axios from "axios";
import { cookies } from "src/Utils/common";
import URLS from "src/assets/References.json";

export default async function getTags() {
  if (cookies.get("Authorization") == undefined) {
    throw "You must login first";
  }
  const url = "https://hotelcenter.iran.liara.run/" + URLS.url_comment_get_tags;
  return axios
    .get(url, {
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
