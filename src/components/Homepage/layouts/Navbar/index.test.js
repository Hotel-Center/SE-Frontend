import renderer from "react-test-renderer";
import Navbar from ".";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
    };
  },
}));

describe("Navbar", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Navbar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
