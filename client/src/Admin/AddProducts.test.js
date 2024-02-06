import React from "react";
import { createRoot } from "react-dom/client";
import { jest } from "@jest/globals";
import { act } from "react-dom/test-utils";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddProducts from "./AddProducts";
import DataAdmin from "../context/DataAdmin";

describe("AddProducts", () => {
  test("renders without crashing", () => {
    const component = <AddProducts />;
    const div = document.createElement("div");
    const root = createRoot(div);
    act(() => root.render(component));
  });

  test("renders without error", () => {
    render(
      <DataAdmin.Provider
        value={{
          token: "someToken",
          setLoading: () => {},
          setReFetch: () => {},
        }}
      >
        <AddProducts />
      </DataAdmin.Provider>
    );
  });

  test("displays a form with input fields", () => {
    const { getByLabelText } = render(<AddProducts />);

    expect(getByLabelText("Name")).toBeInTheDocument();
    expect(getByLabelText("Price")).toBeInTheDocument();
    expect(getByLabelText("On storage")).toBeInTheDocument();
    expect(getByLabelText("Product type")).toBeInTheDocument();
    expect(getByLabelText("Product image")).toBeInTheDocument();
  });

  test("updates state when input fields change", () => {
    const { getByLabelText } = render(
      <DataAdmin.Provider
        value={{
          token: "someToken",
          setLoading: () => {},
          setReFetch: () => {},
        }}
      >
        <AddProducts />
      </DataAdmin.Provider>
    );

    const productNameInput = getByLabelText("Name");
    const priceInput = getByLabelText("Price");
    const onStorageInput = getByLabelText("On storage");
    const productTypeInput = getByLabelText("Product type");

    fireEvent.change(productNameInput, { target: { value: "Test Product" } });
    fireEvent.change(priceInput, { target: { value: "10.99" } });
    fireEvent.change(onStorageInput, { target: { value: "10" } });
    fireEvent.change(productTypeInput, { target: { value: "beef" } });

    expect(productNameInput.value).toBe("Test Product");
    expect(priceInput.value).toBe("10.99");
    expect(onStorageInput.value).toBe("10");
    expect(productTypeInput.value).toBe("beef");
  });

  test("displays a submit button", () => {
    const { getByText } = render(
      <DataAdmin.Provider
        value={{
          token: "someToken",
          setLoading: () => {},
          setReFetch: () => {},
        }}
      >
        <AddProducts />
      </DataAdmin.Provider>
    );

    expect(getByText("ADD PRODUCT")).toBeInTheDocument();
  });

  test("calls a submit function when submit button is clicked", async () => {
    const submitMock = jest.fn();
    const { getByText } = render(
      <DataAdmin.Provider
        value={{
          token: "someToken",
          setLoading: () => {},
          setReFetch: () => {},
        }}
      >
        <AddProducts />
      </DataAdmin.Provider>
    );

    const form = document.querySelector("form");
    form.onsubmit = submitMock;

    const submitButton = getByText("ADD PRODUCT");
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(submitMock).toHaveBeenCalled();
  });

  beforeAll(() => {
    global.fetch = () =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Product added successfully!" }),
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => "mock-url");
  });

  afterAll(() => {
    global.URL.createObjectURL.mockRestore();
  });

  test("calls handleAddSubmit function when form is submitted", async () => {
    const { getByLabelText, getByText } = render(
      <DataAdmin.Provider
        value={{
          token: "someToken",
          setLoading: () => {},
          setReFetch: () => {},
        }}
      >
        <AddProducts />
      </DataAdmin.Provider>
    );

    const productNameInput = getByLabelText("Name");
    const priceInput = getByLabelText("Price");
    const onStorageInput = getByLabelText("On storage");
    const productTypeInput = getByLabelText("Product type");
    const imgSrcInput = getByLabelText("Product image");

    fireEvent.change(productNameInput, { target: { value: "Test Product" } });
    fireEvent.change(priceInput, { target: { value: "10.99" } });
    fireEvent.change(onStorageInput, { target: { value: "10" } });
    fireEvent.change(productTypeInput, { target: { value: "beef" } });
    const file = new File(["(⌐□_□)"], "chucknorris.png", {
      type: "image/png",
    });
    fireEvent.change(imgSrcInput, { target: { files: [file] } });

    const form = document.querySelector("form");

    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      const displayedMessage = screen.getByText("Product added successfully!");
      expect(displayedMessage).toBeInTheDocument();
    });
  });
});
