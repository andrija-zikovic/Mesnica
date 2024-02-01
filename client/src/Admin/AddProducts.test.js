import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddProducts from "./AddProducts";
import { DataAdminProvider } from "../context/DataAdmin";

describe("AddProducts", () => {
  test("renders without crashing", () => {
    const component = <AddProducts />;
    const div = document.createElement("div");
    const root = createRoot(div);
    act(() => root.render(component));
  });

  test("renders without error", () => {
    render(
      <DataAdminProvider>
        <AddProducts />
      </DataAdminProvider>
    );
  });

  test("displays a form with input fields", () => {
    const { getByLabelText } = render(
      <DataAdminProvider>
        <AddProducts />
      </DataAdminProvider>
    );

    expect(getByLabelText("Name")).toBeInTheDocument();
    expect(getByLabelText("Price")).toBeInTheDocument();
    expect(getByLabelText("On storage")).toBeInTheDocument();
    expect(getByLabelText("Product type")).toBeInTheDocument();
    expect(getByLabelText("Product image")).toBeInTheDocument();
  });

  test("updates state when input fields change", () => {
    const { getByLabelText } = render(
      <DataAdminProvider>
        <AddProducts />
      </DataAdminProvider>
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
      <DataAdminProvider>
        <AddProducts />
      </DataAdminProvider>
    );

    expect(getByText("ADD PRODUCT")).toBeInTheDocument();
  });

  test("calls a submit function when submit button is clicked", () => {
    const submitMock = jest.fn();
    const { getByText } = render(
      <DataAdminProvider>
        <AddProducts />
      </DataAdminProvider>
    );

    const form = document.querySelector("form");
    form.onsubmit = submitMock;

    const submitButton = getByText("ADD PRODUCT");
    fireEvent.click(submitButton);

    expect(submitMock).toHaveBeenCalled();
  });

  const mockContextValue = {
    // Mock values and functions
    token: jest.fn(),
    setLoading: jest.fn(),
    setReFetch: jest.fn(),
  };

  jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useContext: () => mockContextValue,
  }));

  const MockProvider = ({ children }) => (
    <DataAdminProvider value={mockContextValue}>{children}</DataAdminProvider>
  );

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: "Product Added" }),
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => "mock-url");
  });

  afterAll(() => {
    global.URL.createObjectURL.mockRestore();
  });

  test("testing a submit function", async () => {
    const { getByText, getByLabelText } = render(
      <MockProvider>
        <AddProducts />
      </MockProvider>
    );

    fetch.mockImplementationOnce(() => Promise.resolve({ ok: true }));

    const productNameInput = getByLabelText("Name");
    const priceInput = getByLabelText("Price");
    const onStorageInput = getByLabelText("On storage");
    const productTypeInput = getByLabelText("Product type");
    const imgSrcInput = getByLabelText("Product image");

    fireEvent.change(productNameInput, { target: { value: "Test Product" } });
    fireEvent.change(priceInput, { target: { value: "10.99" } });
    fireEvent.change(onStorageInput, { target: { value: "10" } });
    fireEvent.change(productTypeInput, { target: { value: "beef" } });
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    fireEvent.change(imgSrcInput, { target: { files: [file] } });

    const submitButton = getByText("ADD PRODUCT");

    await act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      const displayedMessage = screen.getByText("Product added successfully!");
      expect(displayedMessage).toBeInTheDocument();
    });
  });
});
