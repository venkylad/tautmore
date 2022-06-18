import React from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

const HardDeleteModal = ({
  open,
  onclose,
  teacherName,
  deleteTeacher
  // setMonthlySalary,
  // setIncentives,
  // onApprove,
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
              Are you sure want to remove {teacherName}?
            </div>
           
          </div>
        </ModalBody>
        <ModalFooter className="approve-footer">
          <Button 
            color="ivory" 
            onClick={()=>{deleteTeacher();
              onclose(false);
            }}
            
            >
            Yes, I am sure.
          </Button>

          <Button 
            color="primary" 
            onClick={()=>onclose(false)}
            >
            Cancel
          </Button>
           
         </ModalFooter>
      </Modal>
    </div>
  );
};

export default HardDeleteModal;
