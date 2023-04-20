import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { cookies, makeURL } from "../../Utils/common";
import "../../css/Profile.css";
import Sidebar from "./Sidebar";
import CancelReserve from "./CancelReserve";
export default function ReservedRooms() {
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    axios
      .get(makeURL("/hotel/reserve/"), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((response) => {
        console.log("res roooms ", response.data);
        setHotel(response.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="row pt-5">
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className="col-lg-9">
          {/* <div class="row row-cols-1 row-cols-md-3 g-4"> */}
          {hotel
            ? hotel.map((h) => (
                <CancelReserve
                  id={h.id}
                  start={h.start_day}
                  end={h.end_day}
                  room={h.room}
                  hotel={hotel}
                  setHotel={setHotel}
                ></CancelReserve>
              ))
            : null}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
