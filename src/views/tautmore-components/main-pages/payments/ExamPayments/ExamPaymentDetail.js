import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import "../PaymentsMain.scss";
import { useParams } from "react-router-dom";
import {examPayDetails}  from "../../../services/apis/payments-api/payments_api";
import { history } from "../../../../../history";
import DeletePopup from "../../question-list/DeletePopup";
import { deleteExamPayment } from "../../../services/apis/payments-api/payments_api";
import { toast } from "react-toastify";

const ExamPaymetsDetail = () => {
  const [examPaymDetails, setExamPaymDetails] = useState([]);
  const [modal, setModal] = useState(false);
  const params = useParams();

  const getExamPayDetails = async () =>{
      const res = await examPayDetails(params.id);
      setExamPaymDetails(res?.data?.data)
  }

  const toggle = async (id) =>{
    // let idString = id.toString();
    // console.log(isString(id));
    try{
      const res = await deleteExamPayment(id)
      if(res.status === 200){
        toast.success("Exam Payments Deleted Successfully");
        setModal(!modal);
        history.push('/exam-payments')
      }
    }catch(error){
      toast.error("something went wrong");
    }
   
  }

  const examPaymentsList =() =>{
    history.push('/exam-payments');
  }

  const editExamData = (id) =>{
    history.push(`/edit-exam/${id}`)
  }

  useEffect(() => {
    getExamPayDetails();
  }, []);

  return examPaymDetails.examType ? (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-1">
        <Col sm="6">
          <h4 className="rp-manage-school-header-title">
            Class {examPaymDetails.grade.name}
          </h4>
        </Col>
        <Col sm="6" style={{'textAlign':'right'}}>
          <Button className="admin-details-edit 1111"
            
            onClick={()=>editExamData(examPaymDetails._id)}
            >
            Edit Details
          </Button>
          <Button
                  className="admin-details-delete "
                  outline
                  onClick={() => setModal(!modal)}
                >
                  Delete
                </Button>
                <Button
                  className="admin-details-delete back"
                  outline
                  onClick={examPaymentsList}
                >
                  Back
                </Button>
        </Col>
      </Row>
      <div className="examPaymentsDetailsCard">
        <Card className="PaymentDetailCard">
          <CardBody className="paymentDetCardBody">
            <Row className="payementDetDesc">
              <Col sm="4">
                <h4>Exam Type</h4>
                <h2 className="mb-0">{examPaymDetails.examType}</h2>
              </Col>

              <Col sm="4">
                <h4>Grade</h4>
                <h2 className="mb-0">{examPaymDetails.grade.name}</h2>
              </Col>

              <Col sm="4">
                <h4>Subject</h4>
                <h2 className="mb-0">
                    {examPaymDetails.subject.name}
                  </h2>
              </Col>
            </Row>

            <Row className="paymentDetDescSecond">
              <Col sm="4">
                <h4>Exam Price</h4>
                <h2 className="mb-0">
                    {examPaymDetails.currency_code}.{" "}
                {examPaymDetails.examPrice}</h2>
              </Col>

              <Col sm="4">
                <h4>Country</h4>
                <h2 className="mb-0">{examPaymDetails.country_code}</h2>
              </Col>
              <Col sm="4"></Col>

            </Row>

           
          </CardBody>
        </Card>
      </div>
      <DeletePopup
        modal={modal}
        toggle={toggle}
        setModal={setModal}
        id={examPaymDetails._id}
      />
    </React.Fragment>
    
  ) : (
    ""
  )
};

export default ExamPaymetsDetail;
