import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function TimePickers() {
  const [value, setValue] = React.useState(
    new Date("2018-01-01T00:00:00.000Z")
  );
  const [value2, setValue2] = React.useState(
    new Date("2018-01-01T00:00:00.000Z")
  );
  const [Type, setType] = React.useState(null);
  const handleChange = (event) => {
    setType(event.target.value);
  };

  localStorage.setItem("Check_in_range", JSON.stringify(value));
  localStorage.setItem("Check_out_range", JSON.stringify(value2));
  localStorage.setItem("Type", JSON.stringify(Type));

  return (
    <div className="col-12 col-xl-7">
      <div className="row">
        <div className="col-md-4">
          <label className="ms-2 mt-1 form-label">check in range :</label>
        </div>
        <div className="col-md-8">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopTimePicker
              label="Time"
              value={value}
              style={{ color: "black" }}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>

      <hr class="dashed" />

      <div className="row">
        <div className="col-md-4">
          <label className="ms-2 mt-1 form-label">check out range :</label>
        </div>
        <div className="col-md-8">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopTimePicker
              label="Time"
              value={value2}
              sx={{ innerWidth: "40px" }}
              onChange={(newValue) => {
                setValue2(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>

      <hr class="dashed" />

      <div className="row">
        <div className="col-md-4">
          <label className="ms-2 mt-1 form-label">Type :</label>
        </div>
        <div className="col-md-8">
          <FormControl sx={{ minWidth: 245 }}>
            <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={Type}
              label="Type"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"hotel"}>hotel</MenuItem>

              <MenuItem value={"apartment"}>apartment</MenuItem>
              <MenuItem value={"house"}>house</MenuItem>
              <MenuItem value={"suite"}>suite</MenuItem>
              <MenuItem value={"eco - lodge"}>eco-lodge</MenuItem>
              <MenuItem value={"villa"}>villa</MenuItem>
              <MenuItem value={"cottage"}>cottage</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
