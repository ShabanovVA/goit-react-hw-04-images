import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import { ImageItem, Image, ImageModal } from "./ImageGalleryItem.styled";
import { useState } from "react";

export default function ImageGalleryItem({webformatURL, tags, largeImageURL}) {
    const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);

    if ({ showModal: true }) {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  };

    return (
      <ImageItem>
        <Image
          src={webformatURL}
          alt={tags}
          onClick={toggleModal}
        />
        {showModal && (
          <Modal onModalClick={toggleModal}>
            <ImageModal src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </ImageItem>
    );
  }

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};