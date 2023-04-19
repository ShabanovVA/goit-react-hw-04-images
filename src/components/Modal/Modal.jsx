import { Component } from "react";
import { ModalImg, Overlay } from "./Modal.styled";
 
export default class Modal extends Component {
  hideModalKeydown = (e) => {
    if (e.key === "Escape") {
      this.props.onModalClick();
    }
  };

  hideModalClick = (e) => {
    if (e.target.dataset.action === "overlay") {
      this.props.onModalClick();
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.hideModalKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.hideModalKeydown);
  }

  render() {
    return (
      <Overlay onClick={this.hideModalClick} data-action="overlay">
        <ModalImg>{this.props.children}</ModalImg>
      </Overlay>
    );
  }
}

