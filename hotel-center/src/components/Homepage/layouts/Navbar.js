import React, { useState, useEffect, useCallback, Component } from "react";
import Logo from "../../../statics/logo/logo2.png";
import UseAnimations from "react-useanimations";
import menu3 from "react-useanimations/lib/menu3";

class Navbar extends Component {
  state = {
    openMenu: false,
    navbarMoved: false,
  };

  componentDidMount() {
    document.scrollingElement.scrollTop = 0;
    document.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
  }

  handleOpenMenu = () => {
    this.state.openMenu
      ? this.setState({ openMenu: false })
      : this.setState({ openMenu: true });
  };

  handleScroll = () => {
    var scrolled = document.scrollingElement.scrollTop;
    if (scrolled >= 10) {
      if (!this.state.navbarMoved) {
        this.setState({
          navbarMoved: true,
        });
      }
    } else {
      if (this.state.navbarMoved) {
        this.setState({
          navbarMoved: false,
        });
      }
    }
  };

  render() {
    return (
      <nav
        className={
          this.state.navbarMoved
            ? "navbar navbar-expand-sm navbar-light sticky-top nav-scrolled w-100 nav-style"
            : "navbar navbar-expand-sm navbar-light sticky-top nav-top w-100 nav-style"
        }
      >
        <div className="container">
          <a href="#" className="navbar-brand logo">
            <img src={Logo} alt="Hotel Center" />
            <span className="fw-bold">Hotel Center</span>
          </a>

          <button
            className="navbar-toggler nav-hamburger-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
          >
            <UseAnimations
              reverse={this.state.openMenu}
              onClick={this.handleOpenMenu}
              size={40}
              animation={menu3}
              speed={3}
              strokeColor="#cd9a2d"
            />
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <div className="ms-auto pt-3 pt-sm-0">
              <button
                type="button"
                class="btn btn-outline-dark me-2 nav-button"
              >
                Login
              </button>
              <button type="button" class="btn btn-outline-dark nav-button">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
