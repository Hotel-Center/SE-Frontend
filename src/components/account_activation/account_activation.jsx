import React from "react";
import { DoubleBubble } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";
import { AccountActivation } from "../../Utils/connection";

class account_activation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      token: "",
    };
  }

  async componentDidMount() {
    var splitted = window.location.toString().split("/");
    await this.setState({ token: decodeURIComponent(splitted.pop()) });
    await this.setState({ uid: decodeURIComponent(splitted.pop()) });
    console.log(this.state.token + ",,,,,,,,," + this.state.uid);
    AccountActivation(this.state.uid, this.state.token).then((ret) => {
      if (ret == true) {
        window.location.replace("/login");
      }
    });
  }

  render() {
    return (
      <div>
        <DoubleBubble center={true} text="activating..." bgColor={"white"} />
      </div>
    );
  }
}
export default account_activation;
