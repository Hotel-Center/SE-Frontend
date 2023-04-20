import * as React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { cookies, makeURL } from "../../../Utils/common";
import references from "../../../assets/References.json";

export default function Roomcard(props) {
  const [roomimg, setRoomimg] = useState(null);

  useEffect(() => {}, []);

  const handleClick = () => {
    const roomid = props.id;
    axios
      .get(makeURL(references.url_hotelrooms + roomid + "/images/"), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((response) => {
        console.log("images response:", response.data);
        console.log("roomid: ", roomid);
        setRoomimg(response.data);
        localStorage.setItem("items", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const types = {
    singleRoom: "Single Room",
    doubleRoom: "Double Room",
    tripleRoom: "Triple Room",
    suiteRoom: "Suite Room",
  };

  const handleReserveClick = () => {
    // console.log("button clicked", s);

    window.location.href =
      "http://localhost:3000/reserve/" +
      props.getin +
      "/" +
      props.getout +
      "/" +
      props.person +
      "/" +
      props.price +
      "/" +
      props.name +
      "/" +
      props.city +
      "/" +
      props.id;
  };

  return (
    <div className="card hotelpage-card mt-3 mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-8 border-end">
            <div className="row">
              <button
                type="button"
                className="btn btn-light room-btn mb-1 d-flex justify-content-left"
                data-bs-toggle="modal"
                data-bs-target={"#roomModal-" + props.id}
                onClick={handleClick}
              >
                {types[props.type]}
              </button>
            </div>
            <div className="row">
              {props.sleeps === 1 ? (
                <div className="col">
                  <PersonRoundedIcon />
                  <span className="ms-2 card-text">
                    <small>Adult</small>
                  </span>
                </div>
              ) : props.sleeps === 2 ? (
                <div className="col">
                  <PeopleAltIcon />
                  <span className="ms-2 card-text">
                    <small>Double</small>
                  </span>
                </div>
              ) : props.sleeps >= 3 ? (
                <div className="col">
                  <span className="ms-2 card-text">
                    <small>{props.sleeps} Sleeps</small>
                  </span>
                </div>
              ) : null}

              {props.option === "Breakfast" ? (
                <div className="col">
                  <RestaurantRoundedIcon />
                  <span className="ms-2 card-text">
                    <small>{props.option}</small>
                  </span>
                </div>
              ) : null}
            </div>
            <div className="">
              <hr className="mb-1 mt-2 hr-text" />
            </div>
            <div className="accordion accordion-flush">
              <h2
                className="accordion-header hotelpage-accordion-header"
                id="headingThree"
              >
                <button
                  className="accordion-button collapsed d-flex justify-content-center"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#roomAccordion-" + props.id}
                  aria-expanded="false"
                  // onClick={handleRuleclick}
                >
                  <small>Booking cancellation</small>
                </button>
              </h2>
              <div
                id={"roomAccordion-" + props.id}
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body cancelation-rules">
                  <RemoveCircleOutlineIcon fontSize="small" />
                  <span className="ms-1">
                    Please go to profile for more information.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-md-1"><div style={{borderLeft:'1px solid', height:'100px'}}></div></div> */}

          <div className="col-md-4 text-center">
            <div className="row">
              <div className="col-lg-8">
                <p className="mb-3 rate">Price per night: </p>
              </div>
              <div className="col-lg-4">
                <p className="mb-1 rate">${props.price} </p>
              </div>
            </div>
            {/* <div className="row"> */}
            <button
              className="btn btn-primary hotel-room"
              onClick={handleReserveClick}
            >
              Reserve the room
            </button>
            {/* </div> */}
          </div>
        </div>
      </div>
      <div
        className="modal room-facilities fade"
        id={"roomModal-" + props.id}
        tabindex="-1"
        aria-labelledby="roomDetails"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="row modal-body">
              <div className="col-lg-7 col-12">
                <div className="row">
                  {roomimg
                    ? roomimg.slice(0, roomimg.length / 2).map((rimg) => (
                        <div className="col-12 col-lg-6 mb-4">
                          <img
                            class="img-responsive w-100"
                            style={{ borderRadius: "5px" }}
                            src={references.base_address + rimg.image}
                          />
                        </div>
                      ))
                    : null}
                  {roomimg
                    ? roomimg.slice(roomimg.length / 2).map((rimg) => (
                        <div className="col-12 col-lg-6 mb-4">
                          <img
                            class="img-responsive w-100"
                            style={{ borderRadius: "5px" }}
                            src={references.base_address + rimg.image}
                          />
                        </div>
                      ))
                    : null}
                </div>
              </div>
              <div className="col-lg-5 col-12">
                <div className="row">
                  <p className="mt-1">{props.type}</p>
                </div>
                <div className="row">
                  <p>
                    Room size: {props.size + " "}m<sup>2</sup>
                  </p>
                </div>
                <div className="row">
                  <h6 className="mt-3">Room facilities</h6>
                  <div className="col">
                    <div className="row">
                      {props.roomfacilities
                        ? props.roomfacilities.slice(0, 10).map((rf1) => (
                            <span className="ms-2">
                              <small>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  fill="currentColor"
                                  className="bi bi-check2 me-2"
                                  viewBox="0 0 18 18"
                                >
                                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                </svg>
                                {rf1.name}
                              </small>
                            </span>
                          ))
                        : null}
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      {props.roomfacilities
                        ? props.roomfacilities.slice(10).map((rf2) => (
                            <span className="ms-2">
                              <small>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  fill="currentColor"
                                  className="bi bi-check2 me-2"
                                  viewBox="0 0 18 18"
                                >
                                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                </svg>
                                {rf2.name}
                              </small>
                            </span>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
