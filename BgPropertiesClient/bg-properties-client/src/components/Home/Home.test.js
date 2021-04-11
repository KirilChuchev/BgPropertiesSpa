import { act, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import ThemeContext from "../../contexts/ThemeContext";
import userService from "../../services/userService";
import authService from "../../services/authService";

jest.mock("../../services/userService");

describe("", () => {
  test("Home component", async () => {
    let theme = "light";
    let themeContext = {
      theme: theme || "light",
      changeTheme: onChangeThemeHandler,
    };

    function onChangeThemeHandler(theme) {
      localStorage.saveState("theme", theme);
      themeContext = { ...themeContext, theme: theme };
    }

    // userService.userDataInfo.mockResolvedValue({
    //     allSearchSetsByUser: 1,
    //     allNewlyBgPropertiesByUser: 3,
    //     allTrackedBgPropertiesByUser: 1,
    // })

    // await waitFor(() => userService.userDataInfo.mockResolvedValue({
    //     allSearchSetsByUser: 1,
    //     allNewlyBgPropertiesByUser: 3,
    //     allTrackedBgPropertiesByUser: 1,
    // }).mockResolvedValue(true));

    render(
      <BrowserRouter>
        <ThemeContext.Provider value={themeContext}>
          <Home />
        </ThemeContext.Provider>
      </BrowserRouter>
    );

    // expect(screen.getByLabelText("Email").textContent).toBe("my@email.com");
    // expect(document.querySelectorAll("span.detailValue")[0].textContent).toBe("1");

    // await waitFor(() => screen.getByText("Вижте Вашите SearchSet-ове"));

    // console.log(document.querySelectorAll(".detailValue").length);

    // console.log(screen.getByText("Вижте Вашите SearchSet-ове"));

    // console.log(document.querySelectorAll("section").length);
    // console.log(screen.getAllByText("Вижте Вашите SearchSet-ове"));

    // let a = document.querySelector("h3").textContent;
    // console.log(a);
    // expect(document.querySelector("Link").textContent).toBe(
    //   "Вижте Вашите SearchSet-ове"
    // );
  });

  //   test("", () => {
  //     let homeComponent = shallow;
  //   });
});

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () =>
//       Promise.resolve({
//         allSearchSetsByUser: 1,
//         allNewlyBgPropertiesByUser: 3,
//         allTrackedBgPropertiesByUser: 1,
//       }),
//   })
// );

// jest.mock("../../services/authService");

//  let currentUser = authService.getLocalStorageUserClaims.mockResolvedValue({
//     username: "Pesho",
//     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ0ZXN0MTJAdGVzdC5iZyIsImp0aSI6IjY3MDI3NTM0LTBlN2QtNDIwMC04YjJmLWE5MzJhN2EzZWE3NCIsImV4cCI6MTYxODE0NzkyNSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo2MTk1NSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.x83ACYysqpWwe1b03CgRA5Yx2PGqsx8E-ijGHTcVCxk"
// });

// console.log(currentUser.token);
jest.mock("../../services/authService");

describe("", () => {
  global.fetch = jest.fn((token) =>
    Promise.resolve({
      allSearchSetsByUser: 1,
      allNewlyBgPropertiesByUser: 3,
      allTrackedBgPropertiesByUser: 1,
    })
  );

  let theme = "light";
  let themeContext = {
    theme: theme || "light",
    changeTheme: onChangeThemeHandler,
  };

  function onChangeThemeHandler(theme) {
    localStorage.saveState("theme", theme);
    themeContext = { ...themeContext, theme: theme };
  }

  let currentUser = authService.getLocalStorageUserClaims.mockResolvedValue({
    username: "Pesho",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ0ZXN0MTJAdGVzdC5iZyIsImp0aSI6IjY3MDI3NTM0LTBlN2QtNDIwMC04YjJmLWE5MzJhN2EzZWE3NCIsImV4cCI6MTYxODE0NzkyNSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo2MTk1NSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.x83ACYysqpWwe1b03CgRA5Yx2PGqsx8E-ijGHTcVCxk",
  });

  test("Fetched data rendering", async () => {
    //    console.log(currentUser.token);

    await act(async () =>
      render(
        <BrowserRouter>
          <ThemeContext.Provider value={themeContext}>
            <Home />
          </ThemeContext.Provider>
        </BrowserRouter>
      )
    );
    //   console.log(screen.getByText("Вижте Вашите SearchSet-ове"));
    expect(screen.getByText("Вижте Вашите SearchSet-ове")).toBeInTheDocument();
    // let values = document.querySelectorAll(".detailValue");
    // console.log(values.length);
  });
});
