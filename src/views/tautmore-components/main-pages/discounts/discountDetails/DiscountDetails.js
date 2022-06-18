import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card, CardBody } from "reactstrap";
import "./DiscountDetails.scss";
import { getDiscountDetail } from "../../../services/apis/tautmore_discounts_apis/tautmore_discounts_api";
// import { useParams } from "react-router-dom";
import DeletePopup from "../../question-list/DeletePopup";
import { history } from "../../../../../history";
import moment from 'moment';
import { deleteDiscount } from "../../../services/apis/tautmore_discounts_apis/tautmore_discounts_api";
import { toast } from "react-toastify";
import Sidebar from "../../../forms/discount-form/Discount-Add-Edit";
import classnames from "classnames";
import "../../../../../assets/scss/pages/data-list.scss";

const DiscountDetails = () => {
  // const params = useParams();
  const [modal, setModal] = useState(false);
  const [discountDetailsData, setDiscountDetailsData] = useState({});
  const [sidebar, setSidebar] = useState(false);

  const callToDiscountDeatail = async () => {
    const data = {
      code: localStorage.getItem('discount'),
    };
    try {
      const res = await getDiscountDetail(data);
      if (res.status === 200) {
        setDiscountDetailsData(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggle = async (id) => {
    try{
      const res = await deleteDiscount(id)
      if(res.status === 200 ){
        toast.success("Discount Data Deleted Successfully");
        history.push('/discounts')
      }
    }catch(error){
      toast.error(error.message);
    }
  };

  const discountList = () => {
    localStorage.removeItem('discount')
    history.push("/discounts");
  };

  const handleSidebar = (value) => {
    // this.setState({ sidebar: value });
    setSidebar(value);
  };

  useEffect(() => {
    callToDiscountDeatail();
  }, []);

  return discountDetailsData.code ? (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-1 discountDetCoupon">
        <Col sm="8">
          <div className="discountDetailsHead">
            <h1>{discountDetailsData.name}</h1>
            <div>
            <h3 className="discountCoupon">{discountDetailsData.code}</h3>
            </div>
          </div>
          <span className="discountSpan">
         Get  {discountDetailsData.discountAmountType != "percentage"
              ? "flat "
              : ""}{discountDetailsData.currencyCode} {discountDetailsData.discountAmount}
            {discountDetailsData.discountAmountType === "percentage"
              ? "%"
              : ""}{" "}
            off on your one child
          </span>
        </Col>
        <Col sm="4">
          <div className="discountBtnGrp">
            <Button className="discountDetBtn 1111"  onClick={() => {
            handleSidebar(true);
          }}>Edit</Button>
            <Button
              outline
              color="dark"
              className="admin-details-delete"
              onClick={() => setModal(!modal)}
            >
              Delete
            </Button>
            <Button
              className="admin-details-delete back"
              outline
              onClick={discountList}
            >
              Back
            </Button>
          </div>
        </Col>
      </Row>

      <Card className="">
        <CardBody className="discountDetCardbody">
          <Row className="discountDetailsCard">
            <Col>
              <h4>Name</h4>
              <h2>{discountDetailsData.name}</h2>
            </Col>
            <Col>
              <h4>Code</h4>
              <h2>{discountDetailsData.code}</h2>
            </Col>
            <Col>
              <h4>Amount</h4>
              <h2>{discountDetailsData.discountAmountType != "percentage"
              ? "flat "
              : ""}{discountDetailsData.currencyCode} {discountDetailsData.discountAmount}
            {discountDetailsData.discountAmountType === "percentage"
              ? "%"
              : ""}{" "} off</h2>
            </Col>
          </Row>

          <Row className="discountDetailsCard">
            <Col>
              <h4>Created on</h4>
              <h2>{moment(discountDetailsData.createdAt).format("MMM DD YYYY")}</h2>
            </Col>
            <Col>
              <h4>Expiry</h4>
              <h2>{moment(discountDetailsData.expiryDate).format("MMM DD YYYY")}</h2>
            </Col>
            <Col>
              <h4>Status</h4>
              <h2>{discountDetailsData.status}</h2>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <h4>No. of times used</h4>
              <h2>{discountDetailsData.couponUsedCounts}</h2>
            </Col> 
            <Col sm="4">
              <h4>No. of Discounts</h4>
              <h2>{discountDetailsData.discountUse}</h2>
            </Col>
            <Col sm="4">
              <h4>Types of discount</h4>
              <h2>{discountDetailsData.discountType}</h2>
            </Col>
           
          </Row>
        </CardBody>
      </Card>
      <DeletePopup modal={modal} toggle={toggle} setModal={setModal} id={discountDetailsData._id} />
      <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
      <Sidebar
        show={sidebar}
        idValue={discountDetailsData._id}
        isEditAble={true}
        data={discountDetailsData}
        handleSidebar={handleSidebar}
        title={"EDIT"}
        loadData={callToDiscountDeatail}
      />

      <div
        className={classnames("data-list-overlay", {
          show: sidebar,
        })}
        onClick={() => handleSidebar(false)}
      />
      </div>
    </React.Fragment>
  ) : (
    ""
  );
};

export default DiscountDetails;
