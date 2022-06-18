import React, { useEffect, useState } from "react";
import { history } from "../../../../../history";
import { Row, Col, Button, Pagination } from "reactstrap";
import { examPaymentsList } from "../../../services/apis/payments-api/payments_api";
import "../PaymentsMain.scss";
import ExamPaymentsTable from "./ExamPaymentsTable";
import queryString from "query-string";
import ExamFilters from "./ExamFilters";

const ListView = (props) => {
  const [examPayments, setExamPayments] = useState([]);
  const [classFilter, setClassFilter] = useState("");
  const [subject, setSubject] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [searchtext, setSearchtext] = useState("");
  const [resultText, setResultText] = useState("Searching for content..");
  const paginateData = queryString.parse(props.location.search);
  const addExamPayments = () => {
    history.push("/add-exam");
  };

  const getExamPaymentsList = async () => {
    setExamPayments([]);
    setResultText("Searching for content..");
    const params = {
      examType: searchtext,
      pageNumber: paginateData?.page ? paginateData.page : 1,
      limit: 10,
      grade: classFilter.id,
      subject: subject.id,
    };
    try {
      const res = await examPaymentsList(params);
      if (res.status === 200) {
        const examData = res?.data?.data?.ExamPaymentList;
        setExamPayments(res?.data?.data?.ExamPaymentList);
        setTotalPage(res?.data?.data?.totalPaginationCount);
        if (!examData.length) {
          setResultText("No Exams found");
        } else {
          setResultText("");
        }
      }
    } catch (error) {
      console.log(error);
      setResultText("No Exams found");
    }
  };

  const renderExamFilter = () => (
    <ExamFilters
      subClass={classFilter}
      handleSubClassFilter={setClassFilter}
      subSubject={subject}
      handleSubSubjectFilter={setSubject}
      handleSearchtext={setSearchtext}
      searchtext={searchtext}
    />
  );

  useEffect(() => {
    getExamPaymentsList();
  }, [paginateData?.page, searchtext, classFilter, subject]);

  return (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-1">
        <Col sm="8">
          <h4 className="rp-manage-school-header-title">Exam Payments</h4>
        </Col>
        <Col sm="4">
          <Button className="paymentDetBtn 1111">
            {/* <Edit height="18" width="18" /> */}
            <span
              className="tautmore-admin-add-btn"
              onClick={() => addExamPayments()}
            >
              Add Exam
            </span>
          </Button>
        </Col>
      </Row>
      {renderExamFilter()}
      <ExamPaymentsTable
        examPayments={examPayments}
        getExamPaymentsList={getExamPaymentsList}
        resultText={resultText}
        totalPage={totalPage}
        parsedFilter={queryString.parse(props.location.search)}
      />
    </React.Fragment>
  );
};

export default ListView;
