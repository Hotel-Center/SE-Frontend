import React, { Fragment, useEffect, useReducer } from "react";
import Logo from "/public/logo/logo2.png";
// import UseAnimations from "react-useanimations";
// import menu3 from "react-useanimations/lib/menu3";
import { me, logout } from "../../../../Utils/connection";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import Image from "next/image";

import Hamburger from "hamburger-react";
import Link from "next/link";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { cookies } from "src/Utils/common";

function Navbar() {
  const theme = useTheme();
  const router = useRouter();
  const initialState = {
    openMenu: false,
    navbarMoved: false,
    is_loggedin: false,
    open: Boolean(null),
    navbarExpand: false,
    isAdminPanelPage: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "user/check_admin":
        return {
          ...state,
          isAdminPanelPage: window.location.pathname.includes("adminpanel"),
        };
      case "user/check_auth":
        return {
          ...state,
          is_loggedin: action.response,
        };
      case "predicate/update":
        return {
          ...state,
          navbarExpand: window.innerWidth < 992,
        };
      case "menu/toggle":
        return {
          ...state,
          openMenu: !state.openMenu,
        };
      case "navbar/open":
        return {
          ...state,
          open: true,
        };
      case "navbar/close":
        return {
          ...state,
          openMenu: false,
        };
      case "navbar/update_movement":
        return {
          ...state,
          navbarMoved: action.scrolled >= 10,
        };
      default:
        break;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const hamburgerButton = (
    <Hamburger
      onToggle={() => {
        dispatch({ type: "menu/toggle" });
      }}
      color={theme.palette.primary.main}
      size={24}
    />
  );

  function handleScroll() {
    var scrolled = document.scrollingElement.scrollTop;
    dispatch({ type: "navbar/update_movement", scrolled: scrolled });
  }
  function updatePredicate() {
    dispatch({ type: "predicate/update" });
  }

  useEffect(() => {
    document.scrollingElement.scrollTop = 0;
    updatePredicate();
    window.addEventListener("resize", updatePredicate);
    document.addEventListener("scroll", handleScroll);

    me().then((response) => {
      dispatch({ type: "user/check_auth", response: response });
    });

    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updatePredicate);
    };
  }, []);

  useEffect(() => {
    dispatch({
      type: "user/check_auth",
      response: cookies.get("Authorization"),
    });
    dispatch({ type: "user/check_admin" });
  }, [router]);

  function handleLogout() {
    logout().then((message) => {
      dispatch({ type: "user/check_auth", response: !message });
      if (message === true) {
        router.push("/").then(handleClose);
      }
    });
  }

  function handleClose() {
    dispatch({ type: "navbar/close" });
  }

  function handleGotoProfile() {
    router.push("/profile").then(handleClose);
  }
  return (
    <nav
      className={
        state.isAdminPanelPage
          ? "d-none"
          : state.navbarMoved
            ? "navbar navbar-expand-md navbar-light sticky-top nav-scrolled w-100 nav-style"
            : "navbar navbar-expand-md navbar-light sticky-top nav-top w-100 nav-style"
      }
    >
      <div className="container-fluid">
        <Link href="/" className="navbar-brand logo">
          <Image src={Logo} alt="Hotel Center" height={48} />
          <span className="fw-bold logo-text-font">Hotel Center</span>
        </Link>

        <div className="collapse navbar-collapse" id="navMenu">
          <div className="ms-auto pt-3 pt-sm-0">
            <ul className="navbar-nav">
              {!state.is_loggedin ? (
                <Box
                  sx={{
                    display: "flex",
                    gap: "2",
                  }}
                >
                  <Link href="/login" style={{ marginRight: 16 }}>
                    <Button variant="contained">Login</Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button variant="contained">Sign up</Button>
                  </Link>
                </Box>
              ) : (
                <Fragment>
                  {state.navbarExpand ? (
                    hamburgerButton
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        gap: "8",
                      }}
                    >
                      <Link href="/profile" style={{ marginRight: 16 }}>
                        <Button variant="contained">Profile</Button>
                      </Link>
                      <Button variant="contained" onClick={handleLogout}>
                        Logout
                      </Button>
                    </Box>
                  )}
                </Fragment>
              )}
            </ul>
          </div>
        </div>
        <Menu
          anchorEl={hamburgerButton}
          id="account-menu"
          open={state.openMenu}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              // "&:before": {
              //   content: '""',
              //   display: "block",
              //   position: "absolute",
              //   top: 0,
              //   right: 14,
              //   width: 10,
              //   height: 10,
              //   bgcolor: "background.paper",
              //   transform: "translateY(-50%) rotate(45deg)",
              //   zIndex: 0,
              // },
            },
          }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          disableEnforceFocus
        >
          {/* <Link href="/profile"> */}
          <MenuItem
            style={{ width: "150px" }}
            onClick={() => {
              handleGotoProfile();
            }}
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          {/* </Link> */}
          <MenuItem
            onClick={() => {
              handleLogout();
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
}

export default Navbar;
