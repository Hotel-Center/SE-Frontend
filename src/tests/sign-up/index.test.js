import renderer from "react-test-renderer";
import Signup from "src/pages/sign-up";

describe("Signup Page", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Signup />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
