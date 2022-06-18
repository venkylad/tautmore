import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

const ConfirmationModal = ({ name, modal, handleConfirm, setModal }) => {
  const handleClick = () => {
    handleConfirm();
    setModal(false);
  };
  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={() => setModal(!modal)}
        className="delete-popup"
      >
        {/* <ModalHeader toggle={toggle}>Modal title</ModalHeader> */}
        <ModalBody>{`Do you want to ${name} all questions?`}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleClick()}>
            Yes
          </Button>
          <Button color="secondary" onClick={() => setModal(!modal)}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
