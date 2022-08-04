import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Home from "../pages/Home";
import Papa from "papaparse";

afterEach(() => {
  cleanup();
});

const goodCsvData = Papa.unparse([
  {
    total: "20",
  },
  {
    total: "74",
  },
  {
    total: "79",
  },
  {
    total: "79",
  },
  {
    total: "97",
  },
]);

const badCsvData = Papa.unparse([
  {
    firstname: "1940-05-11",
    "Field Name": "24",
  },
  {
    firstname: "1900-09-29",
    "Field Name": "80",
  },
  {
    firstname: "1902-08-12",
    "Field Name": "9",
  },
  {
    firstname: "1929-12-21",
    "Field Name": "22",
  },
  {
    firstname: "1914-11-23",
    "Field Name": "52",
  },
]);

test("renders upload file button and it is disabled", () => {
  render(<Home />);
  const uploadButton = screen.getByTestId("upload-button");
  expect(uploadButton.textContent).toBe("Upload File");
  expect(uploadButton.disabled).toBe(true);
});

test("Uploading png file should work", async () => {
  const { getByTestId } = render(<Home />);
  const inputEl = getByTestId("upload-input");
  const uploadButton = getByTestId("upload-button");

  const file = new File(["(⌐□_□)"], "chucknorris.png", {
    type: "image/png",
  });

  Object.defineProperty(inputEl, "files", {
    value: [file],
  });

  fireEvent.change(inputEl);
  expect(uploadButton.disabled).toBe(false);
  act(() => {
    uploadButton.click();
  });
  await screen.findByText("File uploaded succesfuly!");
  expect(inputEl.value).toBe("");
  expect(uploadButton.disabled).toBe(true);
  const uploadMessage = getByTestId("upload-message");
  expect(uploadMessage.textContent).toBe("File uploaded succesfuly!");
});

test("Uploading jpg file should throw an error", () => {
  const { getByTestId } = render(<Home />);
  const inputEl = getByTestId("upload-input");
  const uploadButton = getByTestId("upload-button");

  const file = new File(["(⌐□_□)"], "chucknorris.jpg", {
    type: "image/jpeg",
  });

  Object.defineProperty(inputEl, "files", {
    value: [file],
  });

  fireEvent.change(inputEl);

  const uploadError = getByTestId("upload-error");
  expect(uploadButton.disabled).toBe(true);
  expect(uploadError.textContent).toBe(
    "Please input a file with the right format"
  );
});

test("Uploading csv file should work", async () => {
  const { getByTestId } = render(<Home />);
  const inputEl = getByTestId("upload-input");
  const uploadButton = getByTestId("upload-button");

  const file = new File([goodCsvData], "goodcsvfile.csv", {
    type: "text/csv",
  });

  Object.defineProperty(inputEl, "files", {
    value: [file],
  });

  fireEvent.change(inputEl);

  expect(uploadButton.disabled).toBe(false);
  act(() => {
    uploadButton.click();
  });
  await screen.findByText("File uploaded succesfuly!");
  expect(inputEl.value).toBe("");
  expect(uploadButton.disabled).toBe(true);
  const uploadMessage = screen.getByTestId("upload-message");
  expect(uploadMessage.textContent).toBe("File uploaded succesfuly!");
});

test("Uploading bad format csv file should throw an error", async () => {
  const { getByTestId } = render(<Home />);
  const inputEl = getByTestId("upload-input");
  const uploadButton = getByTestId("upload-button");

  const file = new File([badCsvData], "badcsvfile.csv", {
    type: "text/csv",
  });

  Object.defineProperty(inputEl, "files", {
    value: [file],
  });
  act(() => {
    fireEvent.change(inputEl);
  });
  expect(uploadButton.disabled).toBe(false);
  act(() => {
    uploadButton.click();
  });

  await screen.findByText("Enter a valid CSV file");
  expect(inputEl.value).toBe("");
  expect(uploadButton.disabled).toBe(true);
  const uploadError = getByTestId("upload-error");
  expect(uploadError.textContent).toBe("Enter a valid CSV file");
});
