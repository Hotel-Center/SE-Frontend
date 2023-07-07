import renderer from "react-test-renderer";
import Credit from "src/pages/profile/IncreaseCredit";

describe("Wallet Page", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Credit />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
