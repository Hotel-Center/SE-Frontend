import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const GoldenTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#cd9a2d",
  },
  // "& .MuiInput-underline:after": {
  //   borderBottomColor: "green",
  // },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#cd9a2d",
    },
  },
});
