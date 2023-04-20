import * as React from "react";
import axios from "axios";
import { cookies, makeURL } from "../../Utils/common";
import "../../css/Profile.css";

export default function CancelReserve(props) {
  const handleClick = () => {
    axios
      .post(
        makeURL("/hotel/cancelreserve/"),
        {
          reserve: props.id,
        },
        {
          headers: {
            Authorization: cookies.get("Authorization"),
          },
        }
      )
      .then((response) => {
        console.log(response.data, "canceled");
        props.setHotel(props.hotel.filter((e) => e.id !== props.id));
      })
      .catch((error) => {
        console.log(error, "cancel error");
      });
  };

  return (
    <div className="div">
      <div className="card">
        <div className="card-header">Room number : {props.room} </div>
        <div className="card-body">
          <h5 className="card-title">Reserve information</h5>
          <p className="card-text">
            This room is reserved from {props.start} until {props.end}, if you
            click the cancel reserve button your reservation will be canceled.
          </p>
          <div className="card-footer myhotels">
            <button
              type="button"
              className="btn btn-primary view-hotel-button "
              onClick={handleClick}
            >
              Cancel Reserve
            </button>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
