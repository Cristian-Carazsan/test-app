import React, { useEffect, useState } from "react";
import NoData from "../components/NoData";
import ImageGalleryComponent from "reactjs-image-gallery";

function Images() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("images"));
    if (storedImages) {
      setImages(storedImages);
    }
  }, []);

  return images.length ? (
    <ImageGalleryComponent images={images} />
  ) : (
    <NoData name="Images" />
  );
}

export default Images;
