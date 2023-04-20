import React from "react";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { cookies, makeURL } from "../../Utils/common";
import references from "../../assets/References.json";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function SingleNewHotelCard(props) {
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  // handle request to backend when click on heart button
  const handleClick = () => {
    setIsFavorite(!isFavorite);
    // request to backend
    axios
      .post(
        makeURL(references.url_addfavoritehotel),
        { hotel_id: props.id },
        {
          headers: {
            Authorization: cookies.get("Authorization"),
          },
        }
      )
      .then((response) => {
        console.log("adding favorite hotel: ", response.data);
        setOpen(true);
        setMessage(
          isFavorite === false
            ? "Hotel was added to your favorites successfully!"
            : "Hotel was removed from your favorites successfully!"
        );
        setTimeout(() => window.location.reload(true), 1000);
      })
      .catch((error) => {
        console.log("failed to add favorite hotel: ", error);
        setOpen(true);
        setMessage("An error occured.Please try again.");
      });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleRedirect = () => {
    window.location = "http://localhost:3000/" + "hotelpage/" + props.id;
  };

  return (
    <div className="col">
      <div className="card h-100 shadow">
        <img src={props.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="mb-2 d-flex justify-content-between">
            <div className="d-flex">
              <StarIcon className="rate-icon-style me-1" />
              <span>{props.score}</span>
            </div>
            <span className="new-label">New</span>
          </div>
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text text-muted">
            {props.country}/{props.city}
          </p>
        </div>
        <div className="card-footer">
          <button
            type="button"
            className="btn btn-primary view-hotel-button"
            onClick={handleRedirect}
          >
            View details
          </button>
          <button className="btn favorite-btn-style" onClick={handleClick}>
            {isFavorite ? (
              <FavoriteIcon className="favorite-icon-style" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </button>
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity={
                message === "An error occured.Please try again."
                  ? "error"
                  : "success"
              }
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}
