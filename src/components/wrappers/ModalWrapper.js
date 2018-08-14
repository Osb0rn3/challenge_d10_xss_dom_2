import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import OrderModal from "../../containers/modals/OrderModal";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: 200,
    width: 300,
    paddingTop: 50
  }
};

class ModalWrapper extends Component {
  static propTypes = {
    modalName: PropTypes.string.isRequired,
    modalData: PropTypes.object,
    closeModal: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired
  };

  getModalComponent = () => {
    const { modalName, closeModal, modalData } = this.props;
    switch (modalName) {
      case "OrderModal":
        return <OrderModal closeModal={closeModal} modalData={modalData} />;
      default:
        return null;
    }
  };

  render() {
    const { isModalOpen, closeModal } = this.props;
    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        {this.getModalComponent()}
      </Modal>
    );
  }
}

export default ModalWrapper;
