import React, { useState } from "react";
import Box from "@mui/material/Box";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Popover from "@mui/material/Popover";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useTheme } from "@mui/material/styles";
import moment from "moment";

import SearchFormCSS from "./SearchForm.module.scss";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { Country, State, City } from "country-state-city";

const oneDay = 24 * 60 * 60 * 1000; // represents one day in miliseconds

function SearchForm(props) {
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [destination, setDestination] = useState(null);
  const [anchor, setAnchor] = useState(null);
  const [numberOfAdults, setNumberOfAdults] = useState(2);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const theme = useTheme();

  // useEffect(() => {
  //   console.log(checkinDate);
  //   console.log(checkoutDate);
  // }, [checkinDate, checkoutDate]);

  let checkin = checkinDate; // value from your state
  let checkout = checkoutDate; // value from your state
  let formattedcheckinDate = moment(checkin).format("YYYY-MM-DD");
  let formattedcheckoutDate = moment(checkout).format("YYYY-MM-DD");
  let numberOfPeople = numberOfAdults + numberOfChildren;

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 20,
  });

  let numberWidth;
  if (numberOfAdults >= 10 || numberOfAdults >= 10) {
    numberWidth = 50;
  } else {
    numberWidth = 41;
  }

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };
  const router = useRouter();

  const handleSearch = () => {
    if (destination && checkinDate && checkoutDate) {
      router.push({
        pathname: "/search",
        query: {
          city: destination.name,
          check_in: formattedcheckinDate,
          check_out: formattedcheckoutDate,
          size: numberOfPeople,
        },
      });
    }
  };

  const handleChangeNumber = (actionType, guestType) => {
    actionType === "dec"
      ? guestType === "adults"
        ? setNumberOfAdults(numberOfAdults > 1 ? numberOfAdults - 1 : 1)
        : setNumberOfChildren(numberOfChildren > 0 ? numberOfChildren - 1 : 0)
      : guestType === "adults"
      ? setNumberOfAdults(numberOfAdults + 1)
      : setNumberOfChildren(numberOfChildren + 1);
  };

  const open = Boolean(anchor);
  const id = open ? "popover" : undefined;

  let buttonState;
  if (!destination || !checkinDate || !checkoutDate) {
    buttonState = "outlined";
  } else {
    buttonState = "contained";
  }

  return (
    <div
      className={[
        SearchFormCSS.searchForm,
        "p-1",
        "col-12",
        "col-sm-11",
        "row",
      ].join(" ")}
      style={{ position: "relative" }}
    >
      <Autocomplete
        className={[
          SearchFormCSS.cityPicker,
          "mb-1",
          "mb-lg-0",
          "me-lg-1",
        ].join(" ")}
        id="destination"
        filterOptions={filterOptions}
        options={City.getAllCities()}
        autoHighlight
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box component="li" role="listbox" {...props}>
            <LocationOnIcon color="primary" className="my-auto me-3" />
            <div>
              <b className="text-dark">{option.name}</b>
              <br />
              <div className="text-secondary">
                {Country.getCountryByCode(option.countryCode).name}
                {", "}
                {
                  State.getStateByCodeAndCountry(
                    option.stateCode,
                    option.countryCode
                  ).name
                }
              </div>
            </div>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              backgroundColor: "white",
            }}
            placeholder="Destination"
            inputProps={{
              ...params.inputProps,
            }}
            variant="outlined"
          />
        )}
        value={destination}
        onChange={(event, newValue) => {
          setDestination(newValue);
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          disablePast
          slotProps={{
            textField: { placeholder: "Check In" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "gray",
              opacity: 1,
            },
          }}
          className={[
            SearchFormCSS.datePicker,
            "mb-1",
            "mb-lg-0",
            "me-lg-1",
          ].join(" ")}
          maxDate={
            checkoutDate ? new Date(checkoutDate.getTime() - oneDay) : null
          }
          value={checkinDate}
          onChange={(newValue) => {
            setCheckinDate(newValue);
          }}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          disablePast
          slotProps={{ textField: { placeholder: "Check Out" } }}
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "white",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "gray",
              opacity: 1,
            },
          }}
          className={[
            SearchFormCSS.datePicker,
            "mb-1",
            "mb-lg-0",
            "me-lg-1",
          ].join(" ")}
          minDate={
            checkinDate ? new Date(checkinDate.getTime() + oneDay) : null
          }
          // label="Check out"
          value={checkoutDate}
          onChange={(newValue) => {
            setCheckoutDate(newValue);
          }}
          renderInput={(params) => (
            <input {...params} placeholder="asd"></input>
          )}
        />
      </LocalizationProvider>
      <TextField
        sx={{
          backgroundColor: "white",
        }}
        className={[
          SearchFormCSS.personCountBox,
          "mb-1",
          "mb-lg-0",
          "me-lg-1",
        ].join(" ")}
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
        value={
          numberOfAdults + " Adults" + " - " + numberOfChildren + " Children"
        }
      />
      <Button
        id="searchButton"
        variant={buttonState}
        disabled={buttonState == "contained" ? false : true}
        // type="button"
        className={[SearchFormCSS.searchButton].join(" ")}
        style={{}}
        onClick={handleSearch}
      >
        <span>Search</span>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div
          className={[SearchFormCSS.personCountPopover, "px-4 py-2"].join(" ")}
        >
          <div className="mb-3 d-flex align-items-center">
            <span className="me-4">Adults</span>
            <IconButton
              sx={{
                width: "40px",
                height: "40px",
                bgcolor: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                },
                "&:disabled": {
                  bgcolor: theme.palette.primary.light,
                },
              }}
              onClick={() => handleChangeNumber("dec", "adults")}
              disabled={numberOfAdults <= 1}
            >
              <RemoveIcon />
            </IconButton>
            <span className="px-3 text-center" style={{ width: numberWidth }}>
              {numberOfAdults}
            </span>
            <IconButton
              sx={{
                width: "40px",
                height: "40px",
                bgcolor: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
              onClick={() => handleChangeNumber("inc", "adults")}
            >
              <AddIcon />
            </IconButton>
          </div>
          <div className="d-flex  align-items-center">
            <span className="me-auto">Children</span>
            <IconButton
              sx={{
                width: "40px",
                height: "40px",
                bgcolor: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                },
                "&:disabled": {
                  bgcolor: theme.palette.primary.light,
                },
              }}
              onClick={() => handleChangeNumber("dec", "children")}
              disabled={numberOfChildren <= 0}
            >
              <span>
                <RemoveIcon />
              </span>
            </IconButton>
            <span className="px-3 text-center" style={{ width: numberWidth }}>
              {numberOfChildren}
            </span>
            <IconButton
              sx={{
                width: "40px",
                height: "40px",
                bgcolor: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
              onClick={() => handleChangeNumber("inc", "children")}
            >
              <AddIcon />
            </IconButton>
          </div>
        </div>
      </Popover>
    </div>
  );
}

export default SearchForm;
