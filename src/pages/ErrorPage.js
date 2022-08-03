import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      We could not find the page you are looking for. Please try{" "}
      <Link to="/">Home</Link> instead
    </div>
  );
}

export default ErrorPage;
