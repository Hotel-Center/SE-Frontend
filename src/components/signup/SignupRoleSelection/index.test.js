import renderer from "react-test-renderer";
import SignupRoleSelection from ".";

describe("Signup Role Selection Step", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<SignupRoleSelection />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
