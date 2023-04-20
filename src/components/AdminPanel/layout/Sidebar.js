import React from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { logout } from "../../../Utils/connection";
import Logo from "../../../statics/logo/logo2.png";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import CopyrightIcon from "@mui/icons-material/Copyright";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import KingBedIcon from "@mui/icons-material/KingBed";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import ChatIcon from "@mui/icons-material/Chat";

export default function MySidebar(props) {
  const handleLogout = () => {
    logout();
  };

  return (
    <Sidebar
      toggled={props.toggled}
      breakPoint="md"
      onToggle={props.handleToggleSidebar}
      style={{ backgroundColor: "white !important" }}
    >
      {/* <SidebarHeader> */}
      <a href="/" className="navbar-brand logo">
        <img src={Logo} alt="Hotel Center" />
        <span className="fw-bold logo-text-font">Hotel Center</span>
      </a>
      {/* </SidebarHeader> */}
      {/* <SidebarContent> */}
      <Menu iconShape="circle">
        <MenuItem icon={<BubbleChartIcon />}>
          <Link to={`/adminpanel/${props.id}/statistics`}>
            <p className="mb-0">Statistics</p>
          </Link>
        </MenuItem>
        <MenuItem icon={<KingBedIcon />}>
          <Link to={`/adminpanel/${props.id}/roomsstatus`}>
            <p className="mb-0">Rooms status</p>
          </Link>
        </MenuItem>
        <MenuItem icon={<DomainAddIcon />}>
          <Link to={`/adminpanel/${props.id}/createrooom`}>
            <p className="mb-0">Create room</p>
          </Link>
        </MenuItem>
        <MenuItem icon={<EditIcon />}>
          <Link to={`/adminpanel/${props.id}/edithotel`}>
            <p className="mb-0">Edit hotel</p>
          </Link>
        </MenuItem>
        <MenuItem icon={<ChatIcon />}>
          <Link to={`/adminpanel/${props.id}/messages`}>
            <p className="mb-0">Messages</p>
          </Link>
        </MenuItem>
        <MenuItem
          icon={<LogoutIcon />}
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      {/* </SidebarContent> */}
      {/* <SidebarFooter */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <CopyrightIcon />
        Vira Team
      </div>
      {/* </SidebarFooter> */}
    </Sidebar>
  );
}
