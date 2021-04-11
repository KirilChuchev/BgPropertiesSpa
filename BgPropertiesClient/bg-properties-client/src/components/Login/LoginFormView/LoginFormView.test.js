import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import Login from "../Login";
import LoginFormView from "./LoginFormView";

describe("LoginFormView component", () => {
  test("Fulfill Email and Password fields", async () => {
    function handleSubmit(values) {
      console.log(values);
    }

    render(
      <BrowserRouter>
        <LoginFormView handleSubmit={handleSubmit} />
      </BrowserRouter>
    );

    let emailInputElement = document.querySelector("#email");
    emailInputElement.textContent = "my@email.com";

    let passwordInputElement = document.querySelector("#password");
    passwordInputElement.textContent = "Aa!123";

    // console.log(document.querySelector("input[name='email']").textContent);
    // console.log(document.querySelector("input[name='password']").textContent);

    // console.log(document.querySelector("input.submitButton").value);

    expect(screen.getByLabelText("Email").textContent).toBe("my@email.com");
    expect(screen.getByLabelText("Password").textContent).toBe("Aa!123");

    // fireEvent.click(document.querySelector("input.submitButton"));
    // await waitFor(() => document.querySelector("input[name='email']"));
    // await waitFor(() => document.querySelector("input[name='password']"));

    // await waitFor(() => document.querySelector("input.submitButton"));

  });
});
