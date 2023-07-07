import renderer from "react-test-renderer";
import SignupForm from ".";

describe("Signup Form", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<SignupForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
