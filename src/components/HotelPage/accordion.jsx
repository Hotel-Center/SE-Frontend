import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { one_hotel_connection } from "../../Utils/connection";

class SimpleAccordion extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    description: "",
    phone_numbers: 0,
  };

  async componentDidMount() {
    var splitted = window.location.toString().split("/");
    await this.setState({ id: decodeURIComponent(splitted.pop()) });
    decodeURIComponent(this.state.id);

    one_hotel_connection(this.state.id).then((res) => {
      this.setState({ description: res.description });
      this.setState({ phone_numbers: res.phone_numbers });
    });
  }

  render() {
    const first = this.state.description.slice(0, 250);
    const sec = this.state.description.slice(250, 100000);

    return (
      <div title="accordion1" data-testid="accordion1">
        <Accordion
          data-testid="accordion"
          title="accordion"
          style={{ borderRadius: "5px" }}
        >
          <AccordionSummary
            title="AccordionSummery"
            expandIcon={
              <ExpandMoreIcon data-testid="expand" title="expandMoreIcon" />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography data-testid="typo" title="Typography">
              {first} ...
            </Typography>
          </AccordionSummary>

          <AccordionDetails title="AccordionDetails">
            <Typography data-testid="test" />
            {sec}
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

export default SimpleAccordion;
