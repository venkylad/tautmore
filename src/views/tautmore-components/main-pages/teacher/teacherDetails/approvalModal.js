import React from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

const ApprovalModal = ({
  open,
  onclose,
  teacherName,
  setMonthlySalary,
  setIncentives,
  onApprove,
}) => {
  return (
    <div>
      <Modal
        className="approval-modal"
        centered
        fullscreen
        size="md"
        isOpen={open}
      >
        <ModalHeader
          className="approval-header"
          toggle={() => {
            onclose(false);
          }}
        ></ModalHeader>
        <ModalBody className="body-wrapper">
          <div className="approval-body">
            <div className="approval-heading">
              Assign {teacherName} as a teacher?
            </div>
            <input
              placeholder="Set monthly salary"
              type="number"
              onChange={(e) => setMonthlySalary(e.target.value)}
            />
            <input
              placeholder="Set monthly incentives (%)"
              type="number"
              onChange={(e) => setIncentives(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter className="approve-footer">
          <Button color="primary" onClick={onApprove}>
            APPROVE
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ApprovalModal;
