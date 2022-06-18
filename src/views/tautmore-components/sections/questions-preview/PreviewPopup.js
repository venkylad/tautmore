import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import QuestionPreview from "./QuestionPreview";
import "./style.scss";

const PreviewPopup = ({
  isDetailPage,
  modal,
  setModal,
  queDetails,
  addData,
  setData,
}) => {
  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={() => setModal(!modal)}
        className="preview-popup"
      >
        {/* <ModalHeader toggle={toggle}>Modal title</ModalHeader> */}
        <ModalBody>
          <QuestionPreview queDetails={queDetails} />
        </ModalBody>
        <ModalFooter>
          {!isDetailPage &&
            (window.location.href.indexOf("add-question") !== -1 ? (
              <Button color="primary" className="update" onClick={addData}>
                Add
              </Button>
            ) : (
              <Button color="primary" className="update" onClick={setData}>
                Update
              </Button>
            ))}

          <Button
            color="primary"
            className="update"
            onClick={() => setModal(!modal)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PreviewPopup;
