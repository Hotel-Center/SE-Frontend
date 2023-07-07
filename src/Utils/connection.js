import references from "../assets/References.json";
import { cookies, makeURL } from "./common";
import axios from "axios";
import { set_cookie } from "./common";

export const AccountActivation = async (uid1, token1) => {
  let message = "";
  await axios
    .post(makeURL(references.url_AccountActivation), {
      uid: uid1,
      token: token1,
    })
    .then((response) => {
      console.log(response);
      message = true;
    })
    .catch((error) => {
      console.log(error);
      message = false;
    });
  return message;
};

export const Sign_up_connection = async (
  email,
  phone_number,
  role,
  password
) => {
  let role_enum = "U";
  if (role === "customer") {
    role_enum = "C";
  } else if (role === "manager") {
    role_enum = "M";
  }
  let message = "";
  await axios
    .post(makeURL(references.url_Sign_up), {
      email: email,
      phone_number: phone_number,
      role: role_enum,
      password: password,
    })
    .then(() => {
      // console.log(response);
      message = true;
    })
    .catch((error) => {
      console.error(error);
      message = false;
    });
  return message;
};

export const login_connection = async (email, password) => {
  localStorage.setItem("login_message", JSON.stringify("Already logged in"));

  let message = "";
  if (cookies.get("Authorization") != undefined) {
    localStorage.setItem("login_message", JSON.stringify("Already logged in"));

    message = "Already logged in";

    window.alert("Already logged in");

    return message;
  } else {
    await axios
      .post(makeURL(references.url_login), {
        email: email,
        password: password,
      })
      .then((response) => {
        // console.log(response.data.auth_token);
        set_cookie(response.data.auth_token);
        // console.log(response);
        message = true;
        console.log(message, "f1");

        window.location.replace("/");
      })
      .catch((error) => {
        if (error.response.status == 400) {
          localStorage.setItem(
            "login_message",
            JSON.stringify("Already logged in")
          );

          message = "wrong email or password";
          console.log(message, "f2");
          window.alert("wrong email or password");
        }
        // console.log(error);
      });
    console.log(message, "f3");

    return message;
  }
};

export const me = async () => {
  let message;
  // console.log(cookies.get('Authorization'));
  await axios
    .get(makeURL(references.url_me), {
      headers: {
        Authorization: cookies.get("Authorization"),
      },
    })
    .then(() => {
      // console.log(response);
      message = true;
    })
    .catch(() => {
      // console.log(error);
      message = false;
    });

  // console.log(")))))))))) "+ message)
  return message;
};

export const logout = async () => {
  let message = "";
  // console.log(cookies.get('Authorization'));
  await axios
    .post(
      makeURL(references.url_logout),
      {},
      {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      }
    )
    .then(() => {
      // console.log(response);
      cookies.remove("Authorization");
      message = true;
    })
    .catch(() => {
      // console.log(error);
      message = false;
    });

  return message;
};

export const one_hotel_connection = async (id) => {
  let message = "";
  await axios
    .get(
      makeURL(references.url_onehotel + "/" + id + "/"),
      {},
      {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      }
    )
    .then((response) => {
      // console.log(response);
      message = response.data;
    })
    .catch(() => {
      // console.log(error);
      message = "false";
    });

  return message;
};

export const one_hotel_rooms = async (id) => {
  let message = "";
  await axios
    .get(
      makeURL(references.url_hotelrooms + id + "/"),
      {},
      {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      }
    )
    .then((response) => {
      message = response.data;
    })
    .catch(() => {
      message = "false";
    });
  return message;
};

export const one_hotel_image = async (id) => {
  let message = "";
  await axios
    .get(
      makeURL(references.url_onehotelImage + "/" + id + "/" + "images/"),
      {},
      {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      }
    )
    .then((response) => {
      // console.log(response);
      message = response.data;
    })
    .catch(() => {
      // console.log(error);
      message = false;
    });

  return message;
};

export const room_image = async (id) => {
  let mes = "";
  axios
    .get(makeURL(references.url_hotelrooms + id + "/" + "images/"), {
      headers: {
        Authorization: cookies.get("Authorization"),
      },
    })
    .then((response) => {
      console.log("room reserve img:", response.data);
      mes = response.data;
      console.log("new messss", mes);
      return mes;
    })
    .catch((error) => {
      console.log(error);
      mes = false;
    });
  console.log("ffff");
  console.log(mes);
  return mes;
};

export const one_room_reserve = async (
  start_day,
  end_day,
  firstname,
  lastname,
  room,
  price_per_day,
  national_code,
  phone_number
) => {
  let message = "";
  console.log(cookies.get("Authorization"));
  await axios
    .post(
      makeURL(references.url_reserveroom),
      {
        start_day: start_day,
        end_day: end_day,
        firstname: firstname,
        lastname: lastname,
        room: room,
        price_per_day: price_per_day,
        national_code: national_code,
        phone_number: phone_number,
      },
      {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      }
    )
    .then((response) => {
      console.log(response);
      console.log("everything right");
      message = response.data;
      window.alert("everything right");
    })
    .catch((error) => {
      if (error.response.status == 400) {
        window.alert("Please enter valid data.");
      }

      if (error.response.status == 406) {
        window.alert("Your wallet balance is not enough.");
      }
      if (error.response.status == 403) {
        window.alert("This room is reserved before.");
      }
      console.log(error);
      message = false;
    });

  return message;
};

export const hotel_search = async (
  hotel_id,
  size,
  formattedCheckInDate,
  formattedCheckOutDate
) => {
  let mes = "";
  axios
    .get(makeURL(references.url_hotel_search), {
      headers: {
        Authorization: cookies.get("Authorization"),
      },
      params: {
        size: size,
        check_in: formattedCheckInDate,
        check_out: formattedCheckOutDate,
      },
    })
    .then((response) => {
      console.log("after_search", response.data);
      console.log(formattedCheckInDate, formattedCheckOutDate);
      mes = response.data;
    })
    .catch((error) => {
      console.log(error);
      mes = false;
    });

  return mes;
};

export const create_hotel = async (
  name,
  city,
  state,
  address,
  description,
  phone_numbers,
  facilities
) => {
  let message = "";
  console.log(cookies.get("Authorization"));
  await axios
    .post(
      makeURL(references.url_addhotel),
      {
        name: name,
        city: city,
        state: state,
        address: address,
        description: description,
        phone_numbers: phone_numbers,
        facilities: facilities,
      },
      {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      }
    )
    .then((response) => {
      console.log(response);
      console.log("everything right");
      message = response.data;
    })
    .catch((error) => {
      console.log(error);
      message = false;
    });

  return message;
};
