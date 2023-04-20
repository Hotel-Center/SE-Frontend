import React, { useState, useEffect } from "react";
import MySidebar from "../layout/Sidebar";
import Logo from "../../../statics/logo/logo2.png";
import MenuIcon from "@mui/icons-material/Menu";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBox from "../layout/ChatBox";
import axios from "axios";
import { cookies, makeURL } from "../../../Utils/common";
import references from "../../../assets/References.json";

export default function Messages() {
  const [toggled, setToggled] = useState(false);
  const [hotelId, setHotelId] = useState(null);
  const [chatroomlist, setChatroomlist] = useState(null);

  useEffect(() => {
    setHotelId(parseInt(window.location.pathname.split("/")[2], 10));
    let hotelid = window.location.pathname.split("/")[2];
    let tmpCookie = cookies.get("Authorization");

    axios
      .get(makeURL(references.url_hotelchatlist + hotelid + "/"), {
        headers: {
          Authorization: tmpCookie,
        },
      })
      .then((response) => {
        console.log("response for messeges: ", response.data);
        setChatroomlist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className={`admin-panel ${toggled ? "toggled" : ""} d-flex`}>
      <MySidebar
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        id={hotelId}
      />
      <div className="w-100 admin-content">
        <div className="adminpanel-header-mobile">
          <a href="/" className="navbar-brand logo d-md-none">
            <img src={Logo} alt="Hotel Center" />
            <span className="fw-bold logo-text-font">Hotel Center</span>
          </a>
          <div
            className="btn-toggle d-md-none"
            onClick={() => handleToggleSidebar(true)}
          >
            <MenuIcon fontSize="large" />
          </div>
        </div>
        <div className="container py-5 px-lg-5">
          <h2 className="mb-4 fw-bold d-flex">
            <ChatIcon className="me-2" fontSize="large" />
            Messages
          </h2>
          <div className="chatbox">
            {chatroomlist ? (
              <ChatBox chatRoomsList={chatroomlist} />
            ) : (
              "loading..."
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
