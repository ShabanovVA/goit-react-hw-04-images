import { useEffect } from "react";
import { ModalImg, Overlay } from "./Modal.styled";
 
export default function Modal ({onModalClick, children}) {
  const hideModalKeydown = (e) => {
    if (e.key === "Escape") {
      onModalClick();
    }
  };

  const hideModalClick = (e) => {
    if (e.target.dataset.action === "overlay") {
      onModalClick();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", hideModalKeydown);

    return () => {
      window.removeEventListener("keydown", hideModalKeydown);
    }
  })

    return (
      <Overlay onClick={hideModalClick} data-action="overlay">
        <ModalImg>{children}</ModalImg>
      </Overlay>
    );
  }


