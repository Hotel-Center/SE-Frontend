import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        mt: 8,
      }}
    >
      <Divider />
      <Box
        p={4}
        sx={{
          width: "100%",
          gap: 4,
          px: 12,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body2">FAQ</Typography>
        <Typography variant="body2">Terms of Service</Typography>
        <Typography variant="body2">Privacy</Typography>
        <Typography variant="body2">Newsletter</Typography>
        <Typography variant="body2">About HotelCenter</Typography>
        <Typography variant="body2">Contant Us</Typography>
      </Box>
    </Box>
  );
}
