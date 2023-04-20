import React, { useState, useEffect } from "react";
import MySidebar from "../layout/Sidebar";
import Logo from "../../../statics/logo/logo2.png";
import MenuIcon from "@mui/icons-material/Menu";
import Widget from "../layout/Widget";
import Chart from "../layout/Chart";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import BoyIcon from "@mui/icons-material/Boy";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { makeURL, cookies } from "../../../Utils/common";
import references from "../../../assets/References.json";

//name: month name   //Total: total income for that month
const incomeData = [
  { name: "Nov", Total: 221000 },
  { name: "Dec", Total: 428000 },
  { name: "Jan", Total: 206000 },
  { name: "Feb", Total: 559000 },
  { name: "Mar", Total: 683000 },
  { name: "Apr", Total: 320000 },
];

//name: month name   //Total: total number of reserved rooms in that month
const totalRoomsData = [
  { name: "Nov", Total: 52 },
  { name: "Dec", Total: 68 },
  { name: "Jan", Total: 40 },
  { name: "Feb", Total: 90 },
  { name: "Mar", Total: 64 },
  { name: "Apr", Total: 45 },
];

// key: room type -> value: percent
const widgetData = {
  singleRoom: 50,
  doubleRoom: 38,
  tripleRoom: 67,
  suiteRoom: 92,
};

export default function Statistics() {
  const [toggled, setToggled] = useState(false);
  const [hotelId, setHotelId] = useState(null);
  const [roomPercentage, setRoompercentage] = useState(null);

  useEffect(() => {
    setHotelId(parseInt(window.location.pathname.split("/")[2], 10));
    let hotelid = window.location.pathname.split("/")[2];
    axios
      .get(makeURL(references.url_admimpanel_mainpage + hotelid + "/"), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((res) => {
        console.log("adminpanel res: ", res.data.spaces_percentage);
        setRoompercentage(res.data.spaces_percentage);
      })
      .catch((err) => {
        console.log("adminpanel err: ", err);
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
          <div
            className="btn-toggle d-md-none"
            onClick={() => handleToggleSidebar(true)}
          >
            <MenuIcon fontSize="large" />
          </div>
          <a href="/" className="navbar-brand logo d-md-none">
            <span className="fw-bold logo-text-font">Hotel Center</span>
            <img src={Logo} alt="Hotel Center" />
          </a>
        </div>
        <div className="container py-5 px-lg-5">
          <h2 className="mb-4 fw-bold d-flex">
            <BubbleChartIcon className="me-2" fontSize="large" />
            Statistics
          </h2>
          <div className="d-flex row">
            <div className="col-12 col-sm-6 col-xl-3 mb-3">
              <Widget
                type="single room"
                percent={
                  roomPercentage
                    ? parseInt(roomPercentage["singleRoom"])
                    : widgetData["singleRoom"]
                }
                icon={<BoyIcon className="me-1" fontSize="medium" />}
              />
            </div>
            <div className="col-12 col-sm-6 col-xl-3 mb-3">
              <Widget
                type="double room"
                percent={
                  roomPercentage
                    ? parseInt(roomPercentage["doubleRoom"])
                    : widgetData["doubleRoom"]
                }
                icon={
                  <EscalatorWarningIcon className="me-2" fontSize="medium" />
                }
              />
            </div>
            <div className="col-12 col-sm-6 col-xl-3 mb-3">
              <Widget
                type="triple room"
                percent={
                  roomPercentage
                    ? parseInt(roomPercentage["tripleRoom"])
                    : widgetData["tripleRoom"]
                }
                icon={<FamilyRestroomIcon className="me-2" fontSize="medium" />}
              />
            </div>
            <div className="col-12 col-sm-6 col-xl-3 mb-3">
              <Widget
                type="suite room"
                percent={
                  roomPercentage
                    ? parseInt(roomPercentage["suiteRoom"])
                    : widgetData["suiteRoom"]
                }
                icon={<HomeIcon className="me-2" fontSize="medium" />}
              />
            </div>
          </div>
          <div className="d-flex row">
            <div className="col-12 col-xl-6 mb-3">
              <Chart
                title="Total Reservations (Last 6 months)"
                data={totalRoomsData}
              />
            </div>
            <div className="col-12 col-xl-6 mb-3">
              <Chart title="Total Income (Last 6 months)" data={incomeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
