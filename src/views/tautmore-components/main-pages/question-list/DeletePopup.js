import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

const DeletePopup = ({ modal, toggle, setModal, id }) => {
  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={() => setModal(!modal)}
        className="delete-popup"
      >
        {/* <ModalHeader toggle={toggle}>Modal title</ModalHeader> */}
        <ModalBody>Are you sure you want to delete?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => toggle(id)}>
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

export default DeletePopup;
