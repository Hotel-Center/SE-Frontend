import React, { useEffect, useState } from "react";

function Footer() {
  const [isAdminPanelPage, setIsAdminPanelPage] = useState(false);

  useEffect(() => {
    setIsAdminPanelPage(window.location.pathname.includes("adminpanel"));
  }, []);

  return (
    <div className={isAdminPanelPage ? "d-none" : "footer-bg-color mt-5"}>
      <div className="container py-5">
        <div className="row text-white">
          <div className="col-md-4 mb-4 mb-md-0">
            <h1 className="fw-bold fs-5" title="header1">
              Support
            </h1>
            <p className="fw-light">Help center</p>
            <p className="fw-light">Safety information</p>
            <p className="mb-0 fw-light">How to register a hotel</p>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <p className="fw-bold fs-5" title="header2">
              Booking tutorial
            </p>
            <p className="fw-light">Hotel reservation guidance</p>
            <p className="fw-light">Payment methods</p>
            <p className="mb-0 fw-light">Cancellation options</p>
          </div>
          <div className="col-md-4">
            <p className="fw-bold fs-5" title="header3">
              About Us
            </p>
            <p className="fw-light">Rules</p>
            <p className="fw-light">Magazine</p>
            <p className="mb-0 fw-light">Contact us</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
