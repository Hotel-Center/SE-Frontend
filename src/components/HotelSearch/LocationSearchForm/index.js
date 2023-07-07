import HotelLocationSelectionDialog from "@/components/hotel_location/HotelLocationSelectionDialog";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LocationSearchForm() {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [location, setLocation] = useState({
    longitude: null,
    latitude: null,
  });
  const startDialog = () => {
    setOpenDialog(true);
  };
  const handleChange = (loc) => {
    setLocation(loc);
  };
  const handleSubmit = () => {
    router.push({
      pathname: "/search",
      query: {
        longitude: location.longitude,
        latitude: location.latitude,
      },
    });
  };
  const hasLocation = location.longitude !== null && location.latitude !== null;
  return (
    <>
      <Card
        sx={{
          zIndex: 1,
          padding: 1,
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Button size="large" onClick={startDialog} variant="outlined">
          {hasLocation ? "Change Location" : "Select Location"}
        </Button>
        <Button
          size="large"
          onClick={handleSubmit}
          variant="contained"
          disabled={!hasLocation}
        >
          Search by Location
        </Button>
      </Card>
      <HotelLocationSelectionDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onChange={handleChange}
        value={location}
      />
    </>
  );
}
