import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import ThemeContext from "../../contexts/ThemeContext";

test("always true test", () => {
  expect(true).toBe(true);
});

describe("", () => {
  test("Home component", () => {
    let theme = "light";
    let themeContext = {
      theme: theme || "light",
      changeTheme: onChangeThemeHandler,
    };

    function onChangeThemeHandler(theme) {
      localStorage.saveState("theme", theme);
      themeContext = { ...themeContext, theme: theme };
    }
    render(
      <BrowserRouter>
        <ThemeContext.Provider value={themeContext}>
          <Home />
        </ThemeContext.Provider>
      </BrowserRouter>
    );
    // console.log(document.querySelectorAll("section").length);
    // console.log(screen.getAllByText("Вижте Вашите SearchSet-ове"));

    // let a = document.querySelector("h3").textContent;
    // console.log(a);
    // expect(document.querySelector("Link").textContent).toBe(
    //   "Вижте Вашите SearchSet-ове"
    // );
  });
});
