import React, { useState } from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Admin from "./Admin";
import DataAdmin, { DataAdminProvider } from "../context/DataAdmin";

describe("Admin Component", () => {
  it("renders without error", () => {
    render(
      <Router>
        <Admin />
      </Router>
    );
  });

  it("renders login page when not logged in", () => {
    const { getByText } = render(
      <Router>
        <Admin />
      </Router>
    );

    expect(getByText("Log in:")).toBeInTheDocument();
  });

  it("renders admin page when logged in", () => {
    const { getByRole } = render(
      <DataAdmin.Provider value={{ token: "mockToken", isLoggedIn: true }}>
        <Router>
          <Admin />
        </Router>
      </DataAdmin.Provider>
    );

    expect(getByRole("heading", { name: "Products" })).toBeInTheDocument();
  });

  it("renders admin page with loading for products", () => {
    const { container } = render(
      <DataAdmin.Provider
        value={{ token: "mockToken", isLoggedIn: true, loading: true }}
      >
        <Router>
          <Admin />
        </Router>
      </DataAdmin.Provider>
    );

    const singleElement = container.querySelector(".addProduct__loading");
    expect(singleElement).toBeInTheDocument();
  });

  it("renders admin page with error message", () => {
    const { getByText } = render(
      <DataAdmin.Provider
        value={{
          token: "mockToken",
          isLoggedIn: false,
          message: "mockMessage",
        }}
      >
        <Router>
          <Admin />
        </Router>
      </DataAdmin.Provider>
    );

    expect(getByText("mockMessage")).toBeInTheDocument();
  });

  it("renders admin page with dropdown", () => {
    const { getByText } = render(
      <DataAdmin.Provider
        value={{ token: "mockToken", isLoggedIn: true, isDropdownOpen: true }}
      >
        <Router>
          <Admin />
        </Router>
      </DataAdmin.Provider>
    );

    expect(getByText("List of products")).toBeInTheDocument();
  });

  it("log out button works", async () => {
    // First start server and then run this test
    const { container } = render(
      <DataAdminProvider>
        <Router>
          <Admin />
        </Router>
      </DataAdminProvider>
    );

    const passwordInput = container.querySelector(".adminLogIn_password");
    const usernameInput = container.querySelector(".adminLogIn_username");
    const submitButton = container.querySelector(".adminLogIn_submit");

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin" } });
    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(container.querySelector(".adminLogIn")).not.toBeInTheDocument();
    });

    const logOutButton = container.querySelector(".adminLink__nav_logOut");
    act(() => {
      fireEvent.click(logOutButton);
    });

    await waitFor(() => {
      expect(container.querySelector(".adminLogIn")).toBeInTheDocument();
    });
  });
});
