import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { GalleryList } from "./ImageGallery.styled";

export const ImageGallery = ({ images }) => {
  return (
    images && (
        <GalleryList>
          {images.map(({ webformatURL, id, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              largeImageURL={largeImageURL}
              
            />
          ))}
        </GalleryList>
    )
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
