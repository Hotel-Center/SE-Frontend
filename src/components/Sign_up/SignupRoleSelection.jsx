import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography, Button, Link } from "@mui/material";

function SignupRoleSelection(props) {
  const options = {
    customer: "I am planning to search, view and reserve hotels",
    company: "I am planning to manage and advertise my hotels",
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Typography variant="h6">
        How are you going to use Hotel Center?
      </Typography>
      <RadioGroup
        value={props.role}
        onChange={(event) =>
          props.dispatch({
            type: "set_role",
            value: event.target.value,
          })
        }
      >
        <FormControlLabel
          value="customer"
          control={<Radio />}
          label={options["customer"]}
        ></FormControlLabel>
        <FormControlLabel
          value="company"
          control={<Radio />}
          label={options["company"]}
        ></FormControlLabel>
      </RadioGroup>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          width: "100%",
        }}
      >
        <Button
          sx={{
            height: "40px",
            width: "45%",
            ml: "auto",
          }}
          variant="contained"
          onClick={props.nextStep}
          disabled={props.role === "unknown"}
        >
          Next
        </Button>
      </Box>
      <Link
        to="./login"
        variant="body2"
        sx={{
          color: "black",
          mt: 2,
        }}
      >
        Already have an account? Sign in
      </Link>
    </Box>
  );
}

export default SignupRoleSelection;
