import React from "react";
import SlideOne from "../../../statics/img/slide01.jpg";
import SlideTwo from "../../../statics/img/slide02.jpg";
import SlideThree from "../../../statics/img/slide03.jpg";
import SearchForm from "./SearchForm";

function Header(props) {
  return (
    <div className="header">
      <div
        id="carousel"
        className="carousel slide w-100"
        data-bs-ride="carousel"
      >
        {/* <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div> */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={SlideOne} className="d-block w-100" alt="Slide 1" />
            {/* <div className="carousel-caption d-none d-md-block">
              <h5 className="carousel-caption-style">What is Hotel center?</h5>
              <p className="carousel-caption-style">
                An online travel agency for lodging reservations, vacation
                rentals, and tourism activities.
              </p>
            </div> */}
          </div>
          <div className="carousel-item">
            <img src={SlideTwo} className="d-block w-100" alt="Slide 2" />
            {/* <div className="carousel-caption d-none d-md-block">
              <h5 className="carousel-caption-style">Second slide label</h5>
              <p className="carousel-caption-style">
                Some representative placeholder content for the second slide.
              </p>
            </div> */}
          </div>
          <div className="carousel-item">
            <img src={SlideThree} className="d-block w-100" alt="Slide 3" />
            {/* <div className="carousel-caption d-none d-md-block">
              <h5 className="carousel-caption-style">Third slide label</h5>
              <p className="carousel-caption-style">
                Some representative placeholder content for the third slide.
              </p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="search-form">
        <SearchForm setHotels={props.setHotels} />
      </div>
    </div>
  );
}

export default Header;
