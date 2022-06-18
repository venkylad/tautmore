import React from 'react';
import { connect } from 'react-redux';
import { func, bool, string } from 'prop-types';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { approveTeacherLeaveAction, cancelTeacherLeaveAction } from '../../../../../redux/actions/manage-teacher';

const LeaveConfirmPopup = ({ model, handleModel, teacherId, leaveStatus, approveTeacherLeave, cancelTeacherLeave }) => {
   const actionLeave = () => {
       if (leaveStatus === 'approve') {
            approveTeacherLeave(teacherId);
            handleModel(false);
       }
       if (leaveStatus === 'cancel') {
            cancelTeacherLeave(teacherId);
            handleModel(false);
       }
   }; 
   console.log(leaveStatus, 'leaveStatus from confirm');
return (
    <Modal
        isOpen={model}
        className="confirm-leave-popup"
    >
        <ModalHeader toggle={() => {
            handleModel(false);
          }} />
        <ModalBody>
            {leaveStatus === 'approve' &&
                <h3>Do you want to Approve this leave?</h3>
            }
            {leaveStatus === 'cancel' &&
                <h3>Do you want to Denied this leave?</h3>
            }
            
        </ModalBody>
        <ModalFooter>
            <Button color="primary" type="button" onClick={actionLeave}>Yes</Button>
            <Button color="secondary" type="button" onClick={() => handleModel(false)}>No</Button>
        </ModalFooter>
    </Modal>
);
};

LeaveConfirmPopup.propTypes = {
    model: bool.isRequired,
    handleModel: func.isRequired,
    teacherId: string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  cancelTeacherLeave: (id) => dispatch(cancelTeacherLeaveAction(id)),    
  approveTeacherLeave: (id) => dispatch(approveTeacherLeaveAction(id)),
});

export default connect(null, mapDispatchToProps)(LeaveConfirmPopup);
