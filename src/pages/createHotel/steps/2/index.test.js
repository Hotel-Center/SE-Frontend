import React from "react";
import { render } from "@testing-library/react";
import CreateHotelHeader from "./[hid_s2]";
import "@testing-library/jest-dom";

jest.mock("axios");

describe("CreateHotelHeader", () => {
  it("1.renders without crashing", () => {
    render(<CreateHotelHeader />);
  });

  it("2.displays a header picture input field", () => {
    const HeaderPage = render(<CreateHotelHeader />);
    const pic = HeaderPage.getByTitle("f2");
    expect(pic).toBeInTheDocument();
  });

  // it("4.uploads an image and redirects to a new page on success", async () => {
  //   const axios = require("axios");
  //   const { getByTitle, getByText } = render(<CreateHotelHeader />);
  //   axios.post.mockResolvedValueOnce({ data: "success" });
  //   const input = getByTitle("f2");
  //   const button = getByTitle("submit");
  //   fireEvent.change(input, {
  //     target: { files: [new File([""], "test.png")] },
  //   });
  //   fireEvent.click(button);
  //   let hotelid = window.location.pathname.split("/")[4];
  //   await waitFor(() =>
  //     expect(axios.post).toHaveBeenCalledWith(
  //       expect.stringContaining(
  //         references.url_onehotelImage +
  //           "/" +
  //           hotelid +
  //           "/images/?is_header=true"
  //       ),
  //       expect.any(FormData),
  //       {
  //         headers: { Authorization: expect.any(String) },
  //       }
  //     )
  //   );
  //   expect(window.location.pathname).toContain(
  //     "/createHotel/steps/3/" + hotelid
  //   );
  // });
});
