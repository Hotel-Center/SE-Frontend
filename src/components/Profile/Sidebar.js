import React from "react";
import { Link } from "react-router-dom";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import BedIcon from "@mui/icons-material/Bed";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AddCardIcon from "@mui/icons-material/AddCard";

export default function Sidebar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 profile-sidebar border mb-4 mb-lg-0">
      <div className="row">
        <Link
          to="/profile"
          class="nav-link link-dark sidebar-items d-lg-flex mb-lg-2"
        >
          <ModeEditOutlinedIcon className="icon-style" />
          <p className="mb-0">Edit Profile</p>
        </Link>

        <hr className="mb-2" />
        <Link
          to="/myhotels"
          class="nav-link link-dark sidebar-items d-lg-flex mb-lg-2"
        >
          <BedIcon className="icon-style" />
          <p className="mb-0">My Hotels</p>
        </Link>

        <hr className="mb-2" />
        {/* <Link to="#" class="nav-link link-dark sidebar-items d-lg-flex mb-lg-2">
          <CardTravelIcon className="icon-style" />
          <p className="mb-0">My Travels</p>
        </Link>
        <hr className="mb-2" /> */}
        <Link
          to="/profile/favorites"
          class="nav-link link-dark sidebar-items d-lg-flex mb-lg-2"
        >
          <FavoriteBorderIcon className="icon-style" />
          <p className="mb-0">Favorites</p>
        </Link>
        <hr className="mb-2" />

        <Link
          to="/profile/IncreaseCredit"
          class="nav-link link-dark sidebar-items d-lg-flex"
        >
          <AddCardIcon className="icon-style" />
          <p className="mb-0">Wallet</p>
        </Link>

        <hr className="mb-2" />

        <Link
          to="/profile/reservedrooms"
          class="nav-link link-dark sidebar-items d-lg-flex"
        >
          <BookmarkBorderIcon className="icon-style" />
          <p className="mb-0">Reservations</p>
        </Link>
      </div>
    </div>
  );
}
