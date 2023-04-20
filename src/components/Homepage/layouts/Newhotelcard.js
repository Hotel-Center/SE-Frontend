import * as React from "react";
import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import axios from "axios";
import references from "../../../assets/References.json";
import { cookies, makeURL } from "../../../Utils/common";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function Newhotelcard(props) {
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

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

  const handleRedirect = () => {
    window.location = "http://localhost:3000/" + "hotelpage/" + props.id;
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

  return (
    <div class="col mt-5">
      <div class="card h-100">
        <img src={props.image} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">
            <a className="link hotel-links" href={"/hotelpage/" + props.id}>
              {props.name}
            </a>
          </h5>
          <Box
            sx={{
              width: 50,
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
              marginLeft: "2px",
            }}
          >
            <Rating name="read-only" value={props.rate} readOnly />
          </Box>
          <a href="">{props.address}</a>
          <p class="card-text">{props.description.slice(0, 250) + " ..."}</p>
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
