import React from "react";
import { Link } from "react-router-dom";

function NoData(props) {
  return (
    <div>
      No {props.name || "Data"} stored yet. You can go and add some{" "}
      <b>
        <Link to="/">here</Link>
      </b>
      .
    </div>
  );
}

export default NoData;
