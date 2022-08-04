import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";

const allowedExtensions = ["csv", "png"];

function Home() {
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [sheetsData, setSheetsData] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const inputEl = useRef(null);

  useEffect(() => {
    const csvFiles = JSON.parse(localStorage.getItem("sheets"));
    const images = JSON.parse(localStorage.getItem("images"));
    if (csvFiles) {
      setSheetsData(csvFiles);
    }
    if (images) {
      setImagesData(images);
    }
  }, []);

  useEffect(() => {
    if (sheetsData.length) {
      localStorage.setItem("sheets", JSON.stringify(sheetsData));
    }
  }, [sheetsData]);

  useEffect(() => {
    if (imagesData.length) {
      localStorage.setItem("images", JSON.stringify(imagesData));
    }
  }, [imagesData]);

  function handleChange(e) {
    setError("");
    setMessage("");
    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a file with the right format");
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
    }
  }
  function uploadCsv() {
    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      if (parsedData.length) {
        const columnNames = Object.keys(parsedData[0]);

        if (
          columnNames.length !== 1 ||
          !(columnNames[0] !== "total" || columnNames[0] !== "Total")
        ) {
          return setError("Enter a valid CSV file");
        }

        const sumOfTotalCollumn = parsedData.reduce(
          (acumulator, value) =>
            acumulator + Number(value.total || value.Total),
          0
        );

        setSheetsData([
          ...sheetsData,
          {
            title: file.name,
            sum: sumOfTotalCollumn,
            indexKey: uuidv4(),
          },
        ]);
        setMessage("File uploaded succesfuly!");
      }
    };
    reader.readAsText(file);

    clearInput();
  }

  function uploadImage() {
    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      // convert file to base64 String
      const base64String = target.result
        .replace("data:", "")
        .replace(/^.+,/, "");

      setImagesData([
        ...imagesData,
        {
          url: `data:image/png;base64,${base64String}`,
          title: file.name,
          thumbUrl: `data:image/png;base64,${base64String}`,
        },
      ]);
      setMessage("File uploaded succesfuly!");
    };
    reader.readAsDataURL(file);
    clearInput();
  }

  function clearInput() {
    inputEl.current.value = null;
    setFile(null);
  }

  function handleUpload() {
    if (!file) return setError("Enter a valid file");
    if (file?.type.split("/")[1] === "csv") {
      uploadCsv();
    } else {
      uploadImage();
    }
  }

  return (
    <div className="App">
      <h2>Upload a file</h2>
      <h4>*Only PNG and CSV formats are allowed</h4>
      {error ? (
        <div data-testid="upload-error" className="upload-error">
          {error}
        </div>
      ) : null}
      {message ? (
        <div data-testid="upload-message" className="upload-message">
          {message}
        </div>
      ) : null}
      <input
        className="upload-input"
        data-testid="upload-input"
        ref={inputEl}
        type="file"
        onChange={handleChange}
        multiple={false}
      />
      <button
        data-testid="upload-button"
        className="upload-button"
        disabled={!file}
        onClick={handleUpload}
      >
        Upload File
      </button>
    </div>
  );
}

export default Home;
