import renderer from "react-test-renderer";
import Createroom from "src/pages/adminpanel/[hotel]/createrooom";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "login",
      query: "",
      asPath: "login",
      push: jest.fn(),
    };
  },
}));

describe("Hotel Room Creation Page", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Createroom />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
