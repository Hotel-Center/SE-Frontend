import React, { useState, useEffect } from "react";
import MySidebar from "../layout/Sidebar";
import Logo from "../../../statics/logo/logo2.png";
import MenuIcon from "@mui/icons-material/Menu";
import KingBedIcon from "@mui/icons-material/KingBed";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { GoldenTextField } from "../../../theme/GoldenTextField";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { makeURL, cookies } from "../../../Utils/common";
import references from "../../../assets/References.json";

function createData(roomNumber, roomType, roomStatus, roomDescription) {
  return {
    roomNumber,
    roomType,
    roomStatus,
    roomDescription,
  };
}
// res.data =[
//            {
//              number: 012,
//              type: "singleRoom",
//              status: "reserved",
//              description: "sjdhfshfisof"
//            },
//            {},...]

// rows = [..., newData]

// type   -> singleRoom, doubleRoom, tripleRoom, suiteRoom
// status -> available, reserved

const StyledTablePagination = styled(TablePagination)(() => ({
  ".MuiTablePagination-selectLabel": {
    marginBottom: 0,
  },
  ".MuiTablePagination-displayedRows": {
    marginBottom: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#cd9a2d",
    color: theme.palette.common.white,
    "&:first-child th": {
      borderTopLeftRadius: 5,
    },
  },
}));

const RoomTypes = {
  singleRoom: "Single Room",
  doubleRoom: "Double Room",
  tripleRoom: "Triple Room",
  suiteRoom: "Suite Room",
};

export default function RoomsStatus() {
  const [toggled, setToggled] = useState(false);
  const [hotelId, setHotelId] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [roomStatus, setRoomStatus] = React.useState("");
  const [roomType, setRoomType] = React.useState("");
  const [roomNumber, setRoomNumber] = React.useState("");
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);

  useEffect(() => {
    let newFilteredRows = rows.filter((row) => {
      let checkNumber = false;
      let checkStatus = false;
      let checkType = false;
      checkNumber = roomNumber ? row.roomNumber.includes(roomNumber) : true;
      checkStatus = roomStatus ? roomStatus === row.roomStatus : true;
      checkType = roomType ? roomType === row.roomType : true;
      return checkNumber && checkStatus && checkType;
    });
    setFilteredRows(newFilteredRows);
  }, [roomStatus, roomType, roomNumber]);

  useEffect(() => {
    setHotelId(parseInt(window.location.pathname.split("/")[2], 10));
    let hotelid = window.location.pathname.split("/")[2];
    let newRows = [];

    axios
      .get(makeURL(references.url_admimpanel_mainpage + hotelid + "/"), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((res) => {
        console.log("response for rooms status: ", res.data);
        for (const [key1, value1] of Object.entries(res.data.spaces_status)) {
          if (key1 === "empty") {
            for (const [, value2] of Object.entries(value1)) {
              value2.forEach((item) => {
                newRows.push(
                  createData(item.name, item.room_type, "available", "-")
                );
              });
            }
          } else {
            for (const [, value2] of Object.entries(value1)) {
              value2.forEach((item) => {
                newRows.push(
                  createData(item.name, item.room_type, "reserved", "-")
                );
              });
            }
          }
        }
        setRows(newRows);
        setFilteredRows(newRows);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeRoomStatus = (event) => {
    console.log(event.target.value);
    setRoomStatus(event.target.value);
  };

  const handleChangeRoomType = (event) => {
    console.log(event.target.value);
    setRoomType(event.target.value);
  };

  const handleChangeRoomNumber = (event) => {
    setRoomNumber(event.target.value);

    // if (!isNaN(event.target.value)) {
    //   setRoomNumber(parseInt(event.target.value));
    // }
    // if (!event.target.value) {
    //   setRoomNumber(0);
    // }
  };

  const handleClearFilters = () => {
    setRoomNumber("");
    setRoomStatus("");
    setRoomType("");
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
            <KingBedIcon className="me-2" fontSize="large" />
            Rooms Status
          </h2>
          <div className="d-flex row search-filter-box">
            <span className="fw-bold mb-3 d-flex align-items-center justify-content-between">
              <div className="d-flex">
                <ManageSearchIcon />
                <span className="ms-1">Search and Filters:</span>
              </div>
              <button
                type="button"
                className="btn btn-primary pay-button d-flex ps-2"
                onClick={handleClearFilters}
              >
                <DeleteIcon className="me-1" /> Delete Filters
              </button>
            </span>
            <div className="col-12 col-md-4 pe-md-1 mb-3 mb-md-0">
              <GoldenTextField
                name="roomNr"
                className="w-100"
                label="Room Nr."
                variant="outlined"
                value={roomNumber}
                onChange={(event) => handleChangeRoomNumber(event)}
              />
            </div>
            <div className="col-12 col-md-4 px-md-1 mb-3 mb-md-0">
              <FormControl fullWidth>
                <GoldenTextField
                  labelId="selectRoomType"
                  id="selectRoomType"
                  value={roomType}
                  label="Room Type"
                  onChange={handleChangeRoomType}
                  select
                >
                  <MenuItem value="singleRoom">Single Room</MenuItem>
                  <MenuItem value="doubleRoom">Double Room</MenuItem>
                  <MenuItem value="tripleRoom">Triple Room</MenuItem>
                  <MenuItem value="suiteRoom">Suite Room</MenuItem>
                </GoldenTextField>
              </FormControl>
            </div>
            <div className="col-12 col-md-4 ps-md-1">
              <FormControl fullWidth>
                <GoldenTextField
                  labelId="selectRoomStatus"
                  id="selectRoomStatus"
                  value={roomStatus}
                  label="Room Status"
                  onChange={handleChangeRoomStatus}
                  select
                >
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="reserved">Reserved</MenuItem>
                </GoldenTextField>
              </FormControl>
            </div>
            <div className="col-12 col-md-4"></div>
            <div className="col-12 col-md-4"></div>
          </div>
          <div className="room-table mx-1 mx-lg-0">
            <Paper sx={{ width: "100%", backgroundColor: "#f8f8f8" }}>
              <TableContainer>
                <Table
                  aria-label="rooms table"
                  style={{
                    borderTopRightRadius: "5px",
                    borderTopLeftRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Room Nr.</StyledTableCell>
                      <StyledTableCell align="center">Type</StyledTableCell>
                      <StyledTableCell align="center">Status</StyledTableCell>
                      <StyledTableCell align="center">
                        Description
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow
                          key={row.roomNumber}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.roomNumber}
                          </TableCell>
                          <TableCell align="center">
                            {title(RoomTypes[`${row.roomType}`])}
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={title(row.roomStatus)}
                              color={
                                row.roomStatus === "available"
                                  ? "success"
                                  : "error"
                              }
                            />
                          </TableCell>
                          <TableCell align="center">
                            {row.roomDescription}
                          </TableCell>
                        </TableRow>
                      ))}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <StyledTablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}

function title(string) {
  const words = string.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
}
