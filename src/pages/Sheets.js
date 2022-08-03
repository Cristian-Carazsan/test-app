import React, { useEffect, useState } from "react";
import NoData from "../components/NoData";

function Sheets() {
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    const storedSheets = JSON.parse(localStorage.getItem("sheets"));
    if (storedSheets) {
      setSheets(storedSheets);
    }
  }, []);
  console.log(sheets);
  return sheets.length ? (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {sheets.map((item) => {
          return (
            <tr key={item.indexKey}>
              <td>{item.title}</td>
              <td>{item.sum}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <NoData name="Sheets" />
  );
}

export default Sheets;
