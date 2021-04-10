import { render } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import Login from "../Login";

describe("Login component", () => {
  test("Prove Register Link text equality.", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(
      document.querySelector("span.newRegisterLogin > a").textContent
    ).toBe("Регистрирайте се оттук.");
  });
});
