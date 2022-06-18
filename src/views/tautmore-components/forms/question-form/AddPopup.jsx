import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import './AddPopup.scss';
import { history } from '../../../../history';
import { connect } from 'react-redux';

const AddPopup = ({adminRole,addModal, setAddModal, setOptionItems, setQuebodyval, setExplanationAnsText, setExpimg, defaultOption}) => {

    const addQuestion = () => {
      window.scroll({top:0,behavior:'smooth'})
      setAddModal(false);
      setOptionItems(defaultOption);
      setQuebodyval('');
      setExplanationAnsText('');
      setExpimg('');
        // window.scrollTo({top: -1, behavior: 'smooth'})
    };

    const cancelQuestion = () => {
        setAddModal(false);
        // history.push("/questions-listing");
        if (adminRole === 'data-entry-operator') {
          history.push("/operator-questions");
        } else {
          history.push("/questions-listing");
        }
    };
    return (
      <Modal
        isOpen={addModal}
        toggle={() => setAddModal(!addModal)}
        className="delete-popup add-popup"
      >
        {/* <ModalHeader toggle={toggle}>Modal title</ModalHeader> */}
        <ModalBody>
          if you want to add more questions then you can Continue To Add Question else Cancel
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={cancelQuestion}>
            Cancel
          </Button>
          <Button color="primary right-btn" onClick={addQuestion}>
            Continue To Add Question
          </Button>
        </ModalFooter>
      </Modal>
    )
}
const mapStateToProps = (state) => ({
  adminRole: state.auth.login?.userData?.role,
});
export default connect(mapStateToProps) (AddPopup)
