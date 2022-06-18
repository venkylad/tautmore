import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { deleteBatch } from '../../../../redux/actions/online-class/Index';

const DeletePopup = ({model, handleModel, deleteBatch, selectedBatchId}) => {

    const deleteRecord = () => {
        const data = {
            batch: selectedBatchId,
        };
        deleteBatch(data);
        handleModel(false);
    };

    return (
        <Modal
            isOpen={model}
            className="confirm-leave-popup"
            >
            <ModalHeader toggle={() => {
                handleModel(false);
            }} />
            <ModalBody>
                <h3>Do you want to delete this batch ?</h3>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" type="button" onClick={deleteRecord}>Yes</Button>
                <Button color="secondary" type="button" onClick={() => handleModel(false)}>No</Button>
            </ModalFooter>
        </Modal>
    )
};

const mapDispatchToProps = (dispatch) => ({
    deleteBatch: (data) => dispatch(deleteBatch(data)),
});

export default connect(null, mapDispatchToProps)(DeletePopup);
