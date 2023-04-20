import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography, Button, Link } from "@mui/material";

function SignupRoleSelection(props) {
  const options = {
    customer: "I am planning to search, view and reserve hotels",
    manager: "I am planning to manage and advertise my hotels",
  };
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
            value="manager"
            control={<Radio />}
            label={options["manager"]}
          ></FormControlLabel>
        </RadioGroup>
      </Box>
      <Link
        href="/login"
        variant="body2"
        sx={{
          color: "black",
          mt: "auto",
        }}
      >
        Already have an account? Sign in
      </Link>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          mt: 2,
          mb: 2,
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
    </Box>
  );
}

export default SignupRoleSelection;
