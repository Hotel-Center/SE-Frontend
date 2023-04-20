import { GoldenTextField } from "../../theme/GoldenTextField";
import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { cookies, makeURL } from "../../Utils/common";
import references from "../../assets/References.json";

const oneDay = 24 * 60 * 60 * 1000;

function ResponsiveDatePickers(props) {
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [anchor, setAnchor] = React.useState(null);
  const [numberOfAdults, setNumberOfAdults] = React.useState(1);
  const [numberOfChildren, setNumberOfChildren] = React.useState(0);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  localStorage.setItem("i1", JSON.stringify(checkinDate));
  localStorage.setItem("i2", JSON.stringify(checkoutDate));

  // console.log(props.id, 'idfd');
  // console.log(checkoutDate ? checkoutDate : 'no');

  // console.log(checkinDate ? checkinDate : 'no');

  // console.log(numberOfAdults ? numberOfAdults : 'no');
  // console.log(numberOfChildren ? numberOfChildren : 'no');
  // console.log(props.id, 'id');
  const handlesearch = () => {
    window.location.href =
      "http://localhost:3000/hotelpage/2111/21/" +
      (numberOfAdults + numberOfChildren) +
      "/" +
      props.id;

    axios
      .get(makeURL(references.url_hotel_search), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
        params: {
          size: numberOfAdults + numberOfChildren,
          check_in: "2022-05-25",
          check_out: "2022-05-25",
        },
      })
      .then((response) => {
        console.log("after_search", response.data);
        localStorage.setItem("rooms", JSON.stringify(response.data));
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeNumber = (actionType, guestType) => {
    actionType === "dec"
      ? guestType === "adults"
        ? setNumberOfAdults(numberOfAdults > 1 ? numberOfAdults - 1 : 1)
        : setNumberOfChildren(numberOfChildren > 0 ? numberOfChildren - 1 : 0)
      : guestType === "adults"
      ? setNumberOfAdults(numberOfAdults + 1)
      : setNumberOfChildren(numberOfChildren + 1);

    localStorage.setItem(
      "i3",
      JSON.stringify(numberOfAdults + numberOfChildren + 1)
    );
  };

  const open = Boolean(anchor);
  const id = open ? "popover" : undefined;
  return (
    <div className="card  card1 " title="AccordionSummery">
      <div
        className="card-body"
        style={{ position: "sticky", top: "11vh" }}
        title="card-body"
      >
        <div
          className="col col-md-12 align-items-center"
          title="align-items-center"
        >
          <div
            className="d-flex justify-content-center"
            title="justifycontentcenter"
          >
            <div className="row">
              <div className="col-6">
                <LocalizationProvider dateAdapter={AdapterDateFns} title="L">
                  <DatePicker
                    title="DatePicker"
                    disablePast
                    format="DD/MM/YYYY"
                    maxDate={
                      checkoutDate
                        ? new Date(checkoutDate.getTime() - oneDay)
                        : null
                    }
                    label="Check in"
                    value={checkinDate}
                    style={{ borderRadius: "5px" }}
                    onChange={(newValue) => {
                      setCheckinDate(newValue);
                      // localStorage.setItem('i1', JSON.stringify(checkinDate));
                    }}
                    renderInput={(params) => (
                      <GoldenTextField
                        {...params}
                        variant="outlined"
                        title="GoldenTextField"
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="col-6">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disablePast
                    minDate={
                      checkinDate
                        ? new Date(checkinDate.getTime() + oneDay)
                        : null
                    }
                    label="Check out"
                    value={checkoutDate}
                    onChange={(newValue) => {
                      setCheckoutDate(newValue);
                      // localStorage.setItem('i2', JSON.stringify(checkoutDate));
                    }}
                    renderInput={(params) => (
                      <GoldenTextField {...params} variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <br />

          <div className="d-flex justify-content-center">
            <div className="row col-12">
              <GoldenTextField
                aria-describedby={id}
                variant="outlined"
                onClick={handleClick}
                label="Number of guests"
                value={
                  numberOfAdults +
                  " adults" +
                  " - " +
                  numberOfChildren +
                  " children"
                }
                placeholder="0 adults - 0 children"
              />
            </div>
          </div>

          <Popover
            title="Popover"
            id={id}
            open={open}
            anchorEl={anchor}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div
              className="p-3 number-of-guests-form"
              title="number-of-guests-form"
            >
              <div className="mb-3 d-flex align-items-center">
                <p className="mb-0 me-auto" title="r">
                  {" "}
                  Adults
                </p>
                <button
                  title="button"
                  type="button"
                  className="btn btn-primary decrease-button"
                  onClick={() => handleChangeNumber("dec", "adults")}
                  disabled={numberOfAdults <= 1}
                >
                  <span>
                    <RemoveIcon />
                  </span>
                </button>
                <p className="mb-0 px-3">{numberOfAdults}</p>
                <button
                  type="button"
                  className="btn btn-primary increase-button"
                  onClick={() => handleChangeNumber("inc", "adults")}
                >
                  <span>
                    <AddIcon titel="AddIcon" />
                  </span>
                </button>
              </div>
              <div className="d-flex  align-items-center">
                <p className="mb-0 me-auto">Children</p>
                <button
                  type="button"
                  className="btn btn-primary decrease-button"
                  onClick={() => handleChangeNumber("dec", "children")}
                  disabled={numberOfChildren <= 0}
                >
                  <span>
                    <RemoveIcon />
                  </span>
                </button>
                <p className="mb-0 px-3">{numberOfChildren}</p>
                <button
                  type="button"
                  className="btn btn-primary increase-button"
                  onClick={() => handleChangeNumber("inc", "children")}
                >
                  <span>
                    <AddIcon />
                  </span>
                </button>
              </div>
            </div>
          </Popover>

          <br />

          <div className="d-flex justify-content-center">
            <div className="row w-100">
              <button
                className="btn btn-dark"
                title="btn-dark"
                onClick={handlesearch}
              >
                {" "}
                check availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResponsiveDatePickers;
