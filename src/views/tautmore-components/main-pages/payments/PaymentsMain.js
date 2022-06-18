import React, {useState} from "react";
import { Col, Row, Card, CardBody, Button } from "reactstrap";
import "./PaymentsMain.scss";
import ReactPaginate from "react-paginate";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import { ChevronLeft, ChevronRight } from "react-feather";
import DeletePopup from "../question-list/DeletePopup";
import { Trash } from "react-feather";
import { deleteCoursePayment } from "../../services/apis/payments-api/payments_api";

import { CombinationsData } from "./mockdata";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
// import { history } from "../../../../history";

const PaymentMain = ({ courseList, resultText, totalPage, parsedFilter, coursePaymentList }) => {
  // console.log(courseList);
  const history = useHistory();


  const handleViewDetails = (val) => {
    history.push(`/payments-details/${val}`);
  };

  const handlePagination = (page) => {
    let urlPrefix = "/course-payments";
    history.push(`${urlPrefix}?page=${page.selected + 1}`);
  };

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex justify-content-center w-100">
          <h3 className="">{resultText}</h3>
        </div>
        {courseList
          ? courseList.map((data, i) => (
              <Col sm="6" key={i}>
                <Card
                  className="cardClickClass"
                  // onClick={() => this.examdetails(exam.id)}
                >
                  <CardBody>
                    <div className="combinationCard">
                      <Col className="">
                        <h4>Subjects</h4>
                        {data.subject.map((sub, ind) => (
                          <h2 key={ind}>{sub.name}</h2>
                        ))}
                      </Col>

                      <Col className="">
                        <h4>Grade</h4>
                        <h2>class {data.grade.name}</h2>
                      </Col>

                      {/* <Col className=""> */}
                      <ActionsComponent data={data} coursePaymentList={coursePaymentList}/>;
                        
                    </div>

                    <div className="combinationCardAmt">
                      <Col className="">
                        <h4>Duration</h4>
                        <h2>
                          {data.currency_code}. {data.discounted_price} / month
                        </h2>
                        {/* <h5>For {data.noOfClasses} classes</h5> */}
                        {/* <h5 className="mb=0">Rs. {data.amount.Year} / year</h5> */}
                      </Col>

                      <Col className="">
                        <Button
                          className="examViewDet 1111"
                          onClick={() => handleViewDetails(data._id)}
                        >
                          {/* <Edit height="18" width="18" /> */}
                          <span className="tautmore-admin-add-btn">
                            View Details
                          </span>
                        </Button>
                      </Col>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))
          : ""}
      </Row>
      <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
        {courseList.length === 0 ? (
          ""
        ) : (
          <ReactPaginate
            previousLabel={<ChevronLeft size={15} />}
            nextLabel={<ChevronRight size={15} />}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={totalPage}
            containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
            activeClassName="active"
            forcePage={parsedFilter.page ? parseInt(parsedFilter.page - 1) : 0}
            onPageChange={(page) => {
              handlePagination(page);
            }}
          />
        )}
      </div>
    </React.Fragment>
  );
};

const ActionsComponent = ({data, coursePaymentList}) => {
  const [modal, setModal] = useState(false);
  const toggle = async (id) =>{
    try{
      const res = await deleteCoursePayment(id)
      if(res.status === 200){
        toast.success("Course payment deleted successfullt");
        setModal(!modal);
        coursePaymentList();
      }
    }catch(error){
      toast.error(error.message);
    }
  }
  return (
    <div className="data-list-action data-list-viewDetails">
     
        {/* <Link to={`/discount-details/${row.code}`}>View Details</Link> */}
        <Trash
        className="cursor-pointer"
        size={20}
        onClick={() => setModal(!modal)
        }
      />

        <DeletePopup
        modal={modal}
        toggle={toggle}
        setModal={setModal}
        id={data._id}
      />
    </div>
  );
};

export default PaymentMain;
