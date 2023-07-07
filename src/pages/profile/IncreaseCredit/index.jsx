import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Profile/Sidebar";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { cookies, makeURL } from "../../../Utils/common";
import references from "../../../assets/References.json";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Image from "next/image";

export default function Credit() {
  const [amountOfMoney, setAmountOfMoney] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleChangeAmountOfMoney = (event) => {
    if (!isNaN(event.target.value)) {
      setAmountOfMoney(parseInt(event.target.value));
    }
    if (!event.target.value) {
      setAmountOfMoney(0);
    }
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

  useEffect(() => {
    axios
      .get(makeURL(references.url_add_credit), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((response) => {
        console.log("res for get request: ", response.data);
        setBalance(response.data.balance);
      })
      .catch((error) => {
        console.log("error fro get request: ", error);
      });
  }, []);

  const handlePay = () => {
    console.log(amountOfMoney);
    setLoading(true);
    if (amountOfMoney) {
      axios
        .patch(
          makeURL(references.url_add_credit),
          { amount: amountOfMoney },
          {
            headers: {
              Authorization: cookies.get("Authorization"),
            },
          }
        )
        .then((response) => {
          setOpen(true);
          setLoading(false);
          console.log("response for credits: ", response.data);
          setBalance(response.data.balance);
          setMessage("Account balance increased successfully.");
        })
        .catch((error) => {
          setLoading(false);
          setOpen(true);
          console.log("an error occured: ", error);
          setMessage("An error occured.Please try again.");
        });
    }
  };

  return (
    <div className="container">
      <div className="row pt-5">
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className="col-lg-9">
          <div className="container wallet border">
            <div className="row content">
              <div className="col-lg-6 border-end increase-credit-form">
                <h6 className="mb-4">Increase credit</h6>
                <p>Select one of these options:</p>
                <div className="row">
                  <div className="col-sm-4">
                    <Button
                      variant="outlined"
                      className="w-100"
                      data-testid="no1"
                      onClick={() => {
                        setAmountOfMoney(100);
                      }}
                    >
                      $100
                    </Button>
                  </div>
                  <div className="col-sm-4 my-2 my-sm-0">
                    <Button
                      variant="outlined"
                      className="w-100"
                      data-testid="no2"
                      onClick={() => {
                        setAmountOfMoney(200);
                      }}
                    >
                      $200
                    </Button>
                  </div>
                  <div className="col-sm-4">
                    <Button
                      variant="outlined"
                      className="w-100"
                      data-testid="no3"
                      onClick={() => {
                        setAmountOfMoney(500);
                      }}
                    >
                      $500
                    </Button>
                  </div>
                </div>
                <p className="mb-3 mt-2">
                  or enter your desired amount of money here:
                </p>
                <TextField
                  name="amountOfMoney"
                  className="w-100 mb-4"
                  label="Amount of money"
                  variant="outlined"
                  value={amountOfMoney}
                  onChange={(event) => handleChangeAmountOfMoney(event)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  className="w-100"
                  onClick={handlePay}
                  disabled={amountOfMoney === 0}
                >
                  {loading ? (
                    <CircularProgress style={{ color: "#fff" }} size="1.5rem" />
                  ) : (
                    "Pay"
                  )}
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={4000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert
                    onClose={handleClose}
                    severity={
                      message === "Account balance increased successfully."
                        ? "success"
                        : "error"
                    }
                    sx={{ width: "100%" }}
                  >
                    {message}
                  </Alert>
                </Snackbar>
              </div>
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h6>Your wallet balance</h6>
                <div className="money-card mt-4 mt-lg-5">
                  <Image
                    src="/logo/white_logo_3.png"
                    width={262}
                    height={252}
                  />
                  <div className="h-100">
                    <p className="site-name">Hotel Center</p>
                    <div className="fw-bold d-flex card-content">
                      <p>Account balance:</p>
                      <p>${balance}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
