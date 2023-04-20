import * as React from "react";
import "../../css/Profile.css";

export default function Myhotelscard(props) {
  const handleClick = () => {
    let hotelid = props.id;
    console.log("hotel id: ", hotelid);
    const url = "http://localhost:3000/adminpanel/" + hotelid + "/statistics";
    window.location.href = url;
  };

  return (
    <div className="col">
      <div className="card h-100">
        <img src={props.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
        </div>
        <div className="card-footer myhotels">
          <button
            type="button"
            className="btn btn-primary view-hotel-button"
            onClick={handleClick}
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
}
