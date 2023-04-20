/* eslint-disable react/no-unescaped-entities */
// import renderer from "react-test-renderer";
import Sign_up from "../src/components/Sign_up/sign_up";
import Footer from "./components/Homepage/layouts/Footer";
import Filter from "./components/Homepage/layouts/Filter";
import ResponsiveDatePickers from "../src/components/HotelPage/ResponsiveDatePickers";
// import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import SimpleAccordion from "../src/components/HotelPage/accordion";
import SearchForm from "../src/components/Homepage/layouts/SearchForm";
import EditProfile from "../src/components/Profile/Editprofile";
import IncreaseCredit from "../src/components/Profile/IncreaseCredit";
import Favorites from "../src/components/Profile/Favorites";
import RoomStatus from "../src/components/AdminPanel/Pages/RoomsStatus";
import Createroom from "../src/components/AdminPanel/Pages/Createroom";
import Edithotel from "../src/components/AdminPanel/Pages/Edithotel";
import CreateHotel from "./components/CreateHotel/HotelInfo4";
// import Reservation from '../src/components/Reservation/reservation';

describe("Create hotel", () => {
  it("snapshot test", () => {
    <BrowserRouter>
      const component = renderer.create(
      <CreateHotel />
      ); let tree = component.toJSON(); expect(tree).toMatchSnapshot();
    </BrowserRouter>;
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
  });

  it("renders without crashing", () => {
    <BrowserRouter>
      const div = document.createElement("div"); ReactDOM.render(
      <CreateHotel />, div); ReactDOM.unmountComponentAtNode(div);
    </BrowserRouter>;
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.queryAllByRole("heading");
    expect(AdminElements.length).toBe(1);
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.queryAllByRole("button");
    expect(AdminElements.length).toBe(5);
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("f1");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("f2");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("f3");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("f4");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("f5");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("f6");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("f7");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("f8");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("f9");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("f10");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a1");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a2");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a3");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a4");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a5");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a6");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a7");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a8");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a9");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a10");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a11");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a12");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a13");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a14");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a15");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a16");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a17");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a18");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a19");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <CreateHotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("a20");
    expect(AdminElements).toBeInTheDocument();
  });
});

describe("Edit hotel", () => {
  it("snapshot test", () => {
    <BrowserRouter>
      const component = renderer.create(
      <Edithotel />
      ); let tree = component.toJSON(); expect(tree).toMatchSnapshot();
    </BrowserRouter>;
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Edithotel />
      </BrowserRouter>
    );
  });

  it("renders without crashing", () => {
    <BrowserRouter>
      const div = document.createElement("div"); ReactDOM.render(
      <Edithotel />, div); ReactDOM.unmountComponentAtNode(div);
    </BrowserRouter>;
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Edithotel />
      </BrowserRouter>
    );
    const AdminElements = screen.queryAllByRole("heading");
    expect(AdminElements.length).toBe(1);
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Edithotel />
      </BrowserRouter>
    );
    const AdminElements = screen.queryAllByRole("button");
    expect(AdminElements.length).toBe(12);
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Edithotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("e1");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Edithotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("e2");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Edithotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("e3");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Edithotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("e4");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Edithotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("e5");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Edithotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("e6");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Edithotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("e7");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Edithotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("e8");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Edithotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("e9");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Edithotel />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("e10");
    expect(AdminElements).toBeInTheDocument();
  });
});

describe("Createroom", () => {
  it("snapshot test", () => {
    <BrowserRouter>
      const component = renderer.create(
      <Createroom />
      ); let tree = component.toJSON(); expect(tree).toMatchSnapshot();
    </BrowserRouter>;
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Createroom />
      </BrowserRouter>
    );
  });

  it("renders without crashing", () => {
    <BrowserRouter>
      const div = document.createElement("div"); ReactDOM.render(
      <Createroom />, div); ReactDOM.unmountComponentAtNode(div);
    </BrowserRouter>;
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Createroom />
      </BrowserRouter>
    );
    const AdminElements = screen.queryAllByRole("heading");
    expect(AdminElements.length).toBe(1);
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Createroom />
      </BrowserRouter>
    );
    const AdminElements = screen.queryAllByRole("button");
    expect(AdminElements.length).toBe(12);
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Createroom />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("element1");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Createroom />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("element2");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Createroom />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("element3");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Createroom />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("element4");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Createroom />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("element5");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Createroom />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("element6");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Createroom />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("element7");
    expect(AdminElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Createroom />
      </BrowserRouter>
    );
    const AdminElements = screen.getByTitle("element8");
    expect(AdminElements).toBeInTheDocument();
  });
});

describe("RoomStatus", () => {
  it("Function testing", () => {
    <BrowserRouter>
      let component = renderer.create(
      <RoomStatus />
      ).getInstance(209, "doubleRoom", "available", "room 209 description"); let
      tree = component.createData(209, "doubleRoom", "available", "room 209
      description"); expect(tree).toBe();
    </BrowserRouter>;
  });

  it("Function testing", () => {
    <BrowserRouter>
      let component = renderer.create(
      <RoomStatus />
      ).getInstance(101, "singleRoom", "available", "room 101 description"); let
      tree = component.createData(101, "singleRoom", "available", "room 101
      description"); expect(tree).toBe();
    </BrowserRouter>;
  });

  it("snapshot test", () => {
    <BrowserRouter>
      const component = renderer.create(
      <RoomStatus />
      ); let tree = component.toJSON(); expect(tree).toMatchSnapshot();
    </BrowserRouter>;
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <RoomStatus />
      </BrowserRouter>
    );
  });

  it("renders without crashing", () => {
    <BrowserRouter>
      const div = document.createElement("div"); ReactDOM.render(
      <RoomStatus />, div); ReactDOM.unmountComponentAtNode(div);
    </BrowserRouter>;
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <RoomStatus />
      </BrowserRouter>
    );
    const AdminElements = screen.queryAllByRole("heading");
    expect(AdminElements.length).toBe(1);
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <RoomStatus />
      </BrowserRouter>
    );
    const AdminElements = screen.queryAllByRole("button");
    expect(AdminElements.length).toBe(13);
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <RoomStatus />
      </BrowserRouter>
    );
    const AdminElements = screen.getByText(/Search and Filters:/i);
    expect(AdminElements).toBeInTheDocument();
  });
});

describe("Favorites", () => {
  it("snapshot test", () => {
    <BrowserRouter>
      const component = renderer.create(
      <Favorites />
      ); let tree = component.toJSON(); expect(tree).toMatchSnapshot();
    </BrowserRouter>;
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );
  });

  it("renders without crashing", () => {
    <BrowserRouter>
      const div = document.createElement("div"); ReactDOM.render(
      <Favorites />, div); ReactDOM.unmountComponentAtNode(div);
    </BrowserRouter>;
  });
});

// describe("IncreaseCredit", () => {
//   it("snapshot test", () => {
//     <BrowserRouter>
//       const component = renderer.create(
//       <IncreaseCredit />
//       ); let tree = component.toJSON(); expect(tree).toMatchSnapshot();
//     </BrowserRouter>;
//   });

//   it("should render the correct content", async () => {
//     render(
//       <BrowserRouter>
//         <IncreaseCredit />
//       </BrowserRouter>
//     );
//     const CreditElements = screen.queryAllByRole("button");
//     expect(CreditElements.length).toBe(4);
//   });

//   it("should render the correct content", async () => {
//     render(
//       <BrowserRouter>
//         <IncreaseCredit />
//       </BrowserRouter>
//     );
//     const CreditElements = screen.queryAllByRole("heading");
//     expect(CreditElements.length).toBe(2);
//   });
// });

describe("Edit profile", () => {
  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <EditProfile />
      </BrowserRouter>
    );
  });

  it("renders without crashing", () => {
    <BrowserRouter>
      const div = document.createElement("div"); ReactDOM.render(
      <EditProfile />, div); ReactDOM.unmountComponentAtNode(div);
    </BrowserRouter>;
  });
});

const mockedProfile = jest.fn();

describe("Edit profile", () => {
  //   test("should call setSelectedImage", () => {
  //     const setSelectedImageSpy = jest.fn();

  //     const { getByTestId } = render(
  //       <BrowserRouter>
  //         <EditProfile setSelectedImage={setSelectedImageSpy} />
  //       </BrowserRouter>
  //     );

  //     fireEvent.change(getByTestId("no1"));

  //     expect(setSelectedImageSpy).toHaveBeenCalled();
  //   });

  it("snapshot test", () => {
    <BrowserRouter>
      const component = renderer.create(
      <EditProfile />
      ); let tree = component.toJSON(); expect(tree).toMatchSnapshot();
    </BrowserRouter>;
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <EditProfile />
      </BrowserRouter>
    );
  });

  it("renders without crashing", () => {
    <BrowserRouter>
      const div = document.createElement("div"); ReactDOM.render(
      <EditProfile />, div); ReactDOM.unmountComponentAtNode(div);
    </BrowserRouter>;
  });

  it("should render correct birthdate", async () => {
    render(
      <BrowserRouter>
        <EditProfile birthdate={null} setBirthdate={mockedProfile} />
      </BrowserRouter>
    );
    const ProfileElement = screen.getByLabelText(/Birthdate/i);
    fireEvent.select(ProfileElement, { target: { value: "09/11/2022" } });
    expect(ProfileElement.value).toBe("09/11/2022");
  });

  it("should render correct gender", async () => {
    render(
      <BrowserRouter>
        <EditProfile genValue={null} setGenValue={mockedProfile} />
      </BrowserRouter>
    );
    const ProfileElement = screen.getByLabelText(/Female/i);
    fireEvent.select(ProfileElement, { target: { value: "Female" } });
    expect(ProfileElement.value).toBe("Female");
  });
});

const mockedIncreaseCredit = jest.fn();

describe("Increase credit", () => {
  it("should render correct amount of money", async () => {
    render(
      <BrowserRouter>
        <IncreaseCredit
          amountOfMoney={null}
          setAmountOfMoney={mockedIncreaseCredit}
        />
      </BrowserRouter>
    );
    const CreditElement = screen.getByLabelText(/Amount of money/i);
    fireEvent.select(CreditElement, { target: { value: "200000" } });
    expect(CreditElement.value).toBe("200000");
  });

  // test("should call setAmountOfMoney", () => {
  //   const setAmountOfMoneySpy = jest.fn();

  //   const { getByTestId } = render(
  //     <BrowserRouter>
  //       <IncreaseCredit setAmountOfMoney={setAmountOfMoneySpy} />
  //     </BrowserRouter>
  //   );

  //   //fireEvent.click(getByTestId("no1"));
  //   fireEvent.submit(getByTestId("no1"));
  //   expect(setAmountOfMoneySpy).toHaveBeenCalled();
  // });

  // test("should call setAmountOfMoney", () => {
  //   const setAmountOfMoneySpy = jest.fn();

  //   const { getByTestId } = render(
  //     <BrowserRouter>
  //       <IncreaseCredit setAmountOfMoney={setAmountOfMoneySpy} />
  //     </BrowserRouter>
  //   );

  //   fireEvent.click(getByTestId("no2"));

  //   expect(setAmountOfMoneySpy).toHaveBeenCalled();
  // });

  // test("should call setAmountOfMoney", () => {
  //   const setAmountOfMoneySpy = jest.fn();

  //   const { getByTestId } = render(
  //     <BrowserRouter>
  //       <IncreaseCredit setAmountOfMoney={setAmountOfMoneySpy} />
  //     </BrowserRouter>
  //   );

  //   fireEvent.click(getByTestId("no3"));

  //   expect(setAmountOfMoneySpy).toHaveBeenCalled();
  // });

  it("snapshot test", () => {
    <BrowserRouter>
      const component = renderer.create(
      <IncreaseCredit />
      ); let tree = component.toJSON(); expect(tree).toMatchSnapshot();
    </BrowserRouter>;
  });

  it("should fetch and render input element", async () => {
    render(
      <BrowserRouter>
        <IncreaseCredit />
      </BrowserRouter>
    );
  });

  it("renders without crashing", () => {
    <BrowserRouter>
      const div = document.createElement("div"); ReactDOM.render(
      <IncreaseCredit />, div); ReactDOM.unmountComponentAtNode(div);
    </BrowserRouter>;
  });

  it("should render correct amount of money", async () => {
    render(
      <BrowserRouter>
        <IncreaseCredit
          amountOfMoney={null}
          setAmountOfMoney={mockedIncreaseCredit}
        />
      </BrowserRouter>
    );
    const CreditElement = screen.getByLabelText(/Amount of money/i);
    fireEvent.select(CreditElement, { target: { value: "300" } });
    expect(CreditElement.value).toBe("300");
  });

  it("should render correct amount of money", async () => {
    render(
      <BrowserRouter>
        <IncreaseCredit
          amountOfMoney={null}
          setAmountOfMoney={mockedIncreaseCredit}
        />
      </BrowserRouter>
    );
    const CreditElement = screen.getByLabelText(/Amount of money/i);
    fireEvent.select(CreditElement, { target: { value: "10000" } });
    expect(CreditElement.value).toBe("10000");
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <IncreaseCredit />
      </BrowserRouter>
    );
    const CreditElements = screen.queryAllByRole("heading");
    expect(CreditElements.length).toBe(2);
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <IncreaseCredit />
      </BrowserRouter>
    );
    const CreditElements = screen.queryAllByRole("button");
    expect(CreditElements.length).toBe(4);
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <IncreaseCredit />
      </BrowserRouter>
    );
    const CreditElements = screen.getByText(/Increase credit/i);
    expect(CreditElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <IncreaseCredit />
      </BrowserRouter>
    );
    const CreditElements = screen.getByText(/Select one of these options:/i);
    expect(CreditElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <IncreaseCredit />
      </BrowserRouter>
    );
    const CreditElements = screen.getByText(
      /or enter your desired amount of money here:/i
    );
    expect(CreditElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <IncreaseCredit />
      </BrowserRouter>
    );
    const CreditElements = screen.getByText(/Pay/i);
    expect(CreditElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <IncreaseCredit />
      </BrowserRouter>
    );
    const CreditElements = screen.getByText(/Your wallet balance/i);
    expect(CreditElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <IncreaseCredit />
      </BrowserRouter>
    );
    const CreditElements = screen.getByText(/Account balance:/i);
    expect(CreditElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <IncreaseCredit />
      </BrowserRouter>
    );
    const CreditElements = screen.getByText("$100");
    expect(CreditElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <IncreaseCredit />
      </BrowserRouter>
    );
    const CreditElements = screen.getByText("$200");
    expect(CreditElements).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(
      <BrowserRouter>
        <IncreaseCredit />
      </BrowserRouter>
    );
    const CreditElements = screen.getByText("$500");
    expect(CreditElements).toBeInTheDocument();
  });
});

describe("Simple Accordion", () => {
  it("should render same text ", () => {
    render(
      <BrowserRouter>
        <SimpleAccordion />
      </BrowserRouter>
    );
    const h1Element = screen.getByTestId("accordion");
    expect(h1Element).toBeInTheDocument();
  });

  it("snapshot test", () => {
    <BrowserRouter>
      const component = renderer.create(
      <SimpleAccordion />
      ); let tree = component.toJSON(); expect(tree).toMatchSnapshot();
    </BrowserRouter>;
  });

  it("renders without crashing", () => {
    <BrowserRouter>
      const div = document.createElement("div"); ReactDOM.render(
      <SimpleAccordion />, div); ReactDOM.unmountComponentAtNode(div);
    </BrowserRouter>;
  });

  it("should render same text ", () => {
    render(
      <BrowserRouter>
        <SimpleAccordion />
      </BrowserRouter>
    );
    const h1Element = screen.getByTestId("expand");
    expect(h1Element).toBeInTheDocument();
  });

  it("should render same text ", () => {
    render(
      <BrowserRouter>
        <SimpleAccordion />
      </BrowserRouter>
    );
    const h1Element = screen.getByTestId("typo");
    expect(h1Element).toBeInTheDocument();
  });

  it("should render same text ", () => {
    render(
      <BrowserRouter>
        <SimpleAccordion />
      </BrowserRouter>
    );
    const h1Element = screen.getByTestId("accordion1");
    expect(h1Element).toBeInTheDocument();
  });

  // it("should render same text ", () => {
  //   render(
  //     <BrowserRouter>
  //       <SimpleAccordion />
  //     </BrowserRouter>
  //   );
  //   const h1Element = screen.getByTestId("a");
  //   expect(h1Element).toBeInTheDocument();
  // });
});

const mockedSearchForm = jest.fn();

describe("Search form", () => {
  it("snapshot test", () => {
    <BrowserRouter>
      const component = renderer.create(
      <SearchForm />
      ); let tree = component.toJSON(); expect(tree).toMatchSnapshot();
    </BrowserRouter>;
  });

  it("should render correct city", async () => {
    render(<SearchForm destination={null} setDestination={mockedSearchForm} />);
    const SearchElement = screen.getByLabelText(/Destination/i);
    fireEvent.select(SearchElement, { target: { value: "Tehran" } });
    expect(SearchElement.value).toBe("Tehran");
  });

  it("renders without crashing", () => {
    <BrowserRouter>
      const div = document.createElement("div"); ReactDOM.render(
      <SearchForm />, div); ReactDOM.unmountComponentAtNode(div);
    </BrowserRouter>;
  });

  it("should render correct check in date", async () => {
    render(<SearchForm checkinDate={null} setCheckinDate={mockedSearchForm} />);
    const SearchElement = screen.getByLabelText(/Check in/i);
    fireEvent.submit(SearchElement, { target: { value: "05/19/2022" } });
    expect(SearchElement.value).toBe("05/19/2022");
  });

  it("should render correct check out date", async () => {
    render(<SearchForm Check out={null} setCheckoutDate={mockedSearchForm} />);
    const SearchElement = screen.getByLabelText(/Check out/i);
    fireEvent.submit(SearchElement, { target: { value: "05/19/2022" } });
    expect(SearchElement.value).toBe("05/19/2022");
  });

  it("should render correct city", async () => {
    render(<SearchForm destination={null} setDestination={mockedSearchForm} />);
    const SearchElement = screen.getByPlaceholderText(/0 adults - 0 children/i);
    fireEvent.click(SearchElement, {
      target: { value: "1 adults - 0 children" },
    });
    fireEvent.click(SearchElement, {
      target: { value: "2 adults - 0 children" },
    });
    fireEvent.click(SearchElement, {
      target: { value: "2 adults - 1 children" },
    });
    expect(SearchElement.value).toBe("2 adults - 1 children");
  });

  it("should render the correct content", async () => {
    render(<SearchForm />);
    const SearchElement = screen.getByPlaceholderText(/0 adults - 0 children/i);
    expect(SearchElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<SearchForm />);
    const SearchElement = screen.getByLabelText(/Number of guests/i);
    expect(SearchElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<SearchForm />);
    const SearchElement = screen.getByLabelText(/Check out/i);
    expect(SearchElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<SearchForm />);
    const SearchElement = screen.getByLabelText(/Check in/i);
    expect(SearchElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<SearchForm />);
    const SearchElement = screen.getByLabelText(/Destination/i);
    expect(SearchElement).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("snapshot test", () => {
    <BrowserRouter>
      const component = renderer.create(
      <Footer />
      ); let tree = component.toJSON(); expect(tree).toMatchSnapshot();
    </BrowserRouter>;
  });

  it("should render the correct content", async () => {
    render(<Footer />);
    const FooterElement = screen.getByText(/Support/i);
    expect(FooterElement).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    <BrowserRouter>
      const div = document.createElement("div"); ReactDOM.render(
      <Footer />, div); ReactDOM.unmountComponentAtNode(div);
    </BrowserRouter>;
  });

  it("should render the correct content", async () => {
    render(<Footer />);
    const FooterElement = screen.getByText(/Help center/i);
    expect(FooterElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<Footer />);
    const FooterElement = screen.getByText(/Safety information/i);
    expect(FooterElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<Footer />);
    const FooterElement = screen.getByText(/How to register a hotel/i);
    expect(FooterElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<Footer />);
    const FooterElement = screen.getByText(/Booking tutorial/i);
    expect(FooterElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<Footer />);
    const FooterElement = screen.getByText(/Hotel reservation guidance/i);
    expect(FooterElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<Footer />);
    const FooterElement = screen.getByText(/Payment methods/i);
    expect(FooterElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<Footer />);
    const FooterElement = screen.getByText(/Cancellation options/i);
    expect(FooterElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<Footer />);
    const FooterElement = screen.getByText(/About Us/i);
    expect(FooterElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<Footer />);
    const FooterElement = screen.getByText(/Rules/i);
    expect(FooterElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<Footer />);
    const FooterElement = screen.getByText(/Magazine/i);
    expect(FooterElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<Footer />);
    const FooterElement = screen.getByText(/Contact us/i);
    expect(FooterElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<Footer />);
    const FooterElement = screen.getByTitle("header2");
    expect(FooterElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<Footer />);
    const FooterElement = await screen.findByText(/Magazine/i);
    expect(FooterElement).toBeInTheDocument();
  });

  it("should render the correct content", async () => {
    render(<Footer />);
    const FooterElements = screen.queryAllByRole("button");
    expect(FooterElements.length).toBe(0);
  });

  it("should render the correct content", async () => {
    render(<Footer />);
    const FooterElements = screen.queryByText(/cars/i);
    expect(FooterElements).not.toBeInTheDocument();
  });
});

describe("Filter", () => {
  it("snapshot test", () => {
    <BrowserRouter>
      const component = renderer.create(
      <Filter />
      ); let tree = component.toJSON(); expect(tree).toMatchSnapshot();
    </BrowserRouter>;
  });

  it("should render the correct content", async () => {
    render(<Filter />);
    const FilterElements = screen.queryAllByRole("button");
    expect(FilterElements.length).toBe(2);
  });

  it("renders without crashing", () => {
    <BrowserRouter>
      const div = document.createElement("div"); ReactDOM.render(
      <Filter />, div); ReactDOM.unmountComponentAtNode(div);
    </BrowserRouter>;
  });

  it("should render the correct content", async () => {
    render(<Filter />);
    const FilterElement = screen.getByTitle("stars");
    expect(FilterElement).toBeInTheDocument();
  });
});

const mockFn = jest.fn();
describe("Sign up", () => {
  it("should render input element", () => {
    render(
      <BrowserRouter>
        <Sign_up v={""} f={mockFn} />
      </BrowserRouter>
    );
    const inputElement = screen.getByLabelText(/Email Address/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("functionality of button when is cliked", () => {
    render(
      <BrowserRouter>
        {" "}
        <Sign_up v={""} f={mockFn} />
      </BrowserRouter>
    );
    const inputElement = screen.getByLabelText(/Email Address/i);

    fireEvent.change(inputElement, { target: { value: "fatima@gmail.com" } });
    const buttonElement = screen.getByRole("button", { name: /Sign Up/i });
    fireEvent.click(buttonElement);
    expect(inputElement.value).toBe("fatima@gmail.com");
  });
});

const MockList = () => {
  return (
    <BrowserRouter>
      <ResponsiveDatePickers />
    </BrowserRouter>
  );
};

afterAll(() => {
  console.log("RUNS ONCE AFTER ALL TESTS");
});

it("should fetch and render input element", async () => {
  render(<MockList />);

  const followerDivElement = await screen.queryByText(/animals/i);
  expect(followerDivElement).not.toBeInTheDocument();
});

describe("Accordion", () => {
  it("should fetch and render input element", async () => {
    render(
      <BrowserRouter>
        <SimpleAccordion />
      </BrowserRouter>
    );

    const followerDivElement = await screen.getByTestId("test");
    expect(followerDivElement).toBeInTheDocument();
  });

  it("should render same text ", () => {
    render(<SimpleAccordion />);
    const h1Element = screen.getByTitle(/accordion1/i);
    expect(h1Element).toBeInTheDocument();
  });

  it("should render same text ", () => {
    render(<SimpleAccordion />);
    const h1Element = screen.getByTitle(/AccordionSummery/i);
    expect(h1Element).toBeInTheDocument();
  });

  it("should render same text ", () => {
    render(<SimpleAccordion />);
    const h1Element = screen.getByTitle(/expandMoreIcon/i);
    expect(h1Element).toBeInTheDocument();
  });

  it("should render same text ", () => {
    render(<SimpleAccordion />);
    const h1Element = screen.getByTitle(/Typography/i);
    expect(h1Element).toBeInTheDocument();
  });

  it("should render same text ", () => {
    render(<SimpleAccordion />);
    const h1Element = screen.getByTitle(/AccordionDetails/i);
    expect(h1Element).toBeInTheDocument();
  });

  // it("should render same text ", () => {
  //   render(
  //     <BrowserRouter>
  //       <SimpleAccordion />
  //     </BrowserRouter>
  //   );
  //   const h1Element = screen.getByTitle(/href/i);
  //   expect(h1Element).toBeInTheDocument();
  // });
});

describe("Responsive date picker", () => {
  it("snapshot test", () => {
    <BrowserRouter>
      const component = renderer.create(
      <ResponsiveDatePickers />
      ); let tree = component.toJSON(); expect(tree).toMatchSnapshot();
    </BrowserRouter>;
  });

  it("should render same text ", () => {
    render(<ResponsiveDatePickers />);
    const h1Element = screen.getByTitle(/AccordionSummery/i);
    expect(h1Element).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    <BrowserRouter>
      const div = document.createElement("div"); ReactDOM.render(
      <ResponsiveDatePickers />, div); ReactDOM.unmountComponentAtNode(div);
    </BrowserRouter>;
  });

  it("should render same text ", () => {
    render(<ResponsiveDatePickers />);
    const h1Element = screen.getByTitle(/btn-dark/i);
    expect(h1Element).toBeInTheDocument();
  });

  it("should render same text ", () => {
    render(<ResponsiveDatePickers />);
    const h1Element = screen.getByTitle(/GoldenTextField/i);
    expect(h1Element).toBeInTheDocument();
  });
});

describe("SignUp", () => {
  it("snapshot test", () => {
    <BrowserRouter>
      const component = renderer.create(
      <Sign_up />
      ); let tree = component.toJSON(); expect(tree).toMatchSnapshot();
    </BrowserRouter>;
  });

  it("should be able to type into input", () => {
    render(
      <BrowserRouter>
        {" "}
        <Sign_up v={""} f={mockFn} />
      </BrowserRouter>
    );
    const inputElement = screen.getByLabelText(/Email Address/i);

    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "Fatima@gmail.com" } });
    expect(inputElement.value).toBe("Fatima@gmail.com");
  });
});
