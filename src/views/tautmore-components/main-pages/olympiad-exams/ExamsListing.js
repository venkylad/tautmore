import React, { useEffect, useState } from "react";
import { getOlympiadExamsList } from "../../services/apis/tautmore_exams_apis/tautmore_exams_apis";
import { Row, Col, Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import moment from "moment";
import * as Icon from "react-feather";
import ReactPaginate from "react-paginate";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import { ChevronLeft, ChevronRight } from "react-feather";
import { history } from "../../../../history";
import ExamFilter from './OlympiadExamFilter';

const ExamsListing = (props) => {
  const [examsData, setExamsData] = useState([]);
  const [resultText, setResultText] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [classFilter, setClassFilter] = useState("");
  const [subject, setSubject] = useState("");
  const [searchText, setSearchText] = useState("");

  const loadData = async () => {
    const data = {
      page_no: props.parsedFilter?.page ? props.parsedFilter?.page : 1,
      class: classFilter.id,
      subject: subject.id,
      subjectName: "",
      searchText: searchText,
      examType: props.examType,
    };
    try {
      setExamsData([]);
      setResultText("Searching for content..");
      const res = await getOlympiadExamsList(data);
      if (res.status === 200) {
        console.log(res);
        const examdata = res?.data?.data?.response;
        setExamsData(res?.data?.data?.response);
        setTotalPage(Math.ceil(res?.data?.data?.count / 10));
        if (!examdata.length) {
          setResultText("No Exams found");
        } else {
          setResultText("");
        }
      }
    } catch (error) {
      console.log(error);
      setExamsData("");
      setTotalPage(0);
      setResultText("No Exams found");
    }
  };

  const handlePagination = (page) => {
    let urlPrefix = "/olympiad-exams";
    history.push(`${urlPrefix}?page=${page.selected + 1}`);
  };

  const renderFilter = () => (
    <ExamFilter
      searchtext={searchText}
      handleSearchtext={setSearchText}
      classFilter={classFilter}
      handleClassFilter={setClassFilter}
      subject={subject}
      handleSubjectFilter={setSubject}
    />
  );

  const examdetails = (id) => {
      // console.log(id)
    history.push(`/olympiad-exams/${id}`);
  };

  useEffect(() => {
    // setExamsData(QuestData);
    loadData();
  }, [
    props.examType,
    // props.sidebar,
    props.parsedFilter?.page,
    searchText,
    classFilter,
    subject
  ]);

  return (
    <div>
      {renderFilter()}
      <div className="data-list">
        <Row>
          <div className="d-flex justify-content-center w-100">
            <h3 className="">{resultText}</h3>
          </div>

          {examsData
            ? examsData.map((exam, i) => (
                <Col sm="6" key={i}>
                  <Card
                    className="cardClickClass"
                    onClick={() => examdetails(exam._id)}
                  >
                    <CardHeader>
                      <CardTitle className="cardTitleExam">
                        {exam.name}<br/>
                        {exam.subjectName.map((data, i)=>{
                            return <p key={i} style={{fontSize:'20px', marginBottom:'0px'}}>{data}</p>
                        })}
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col sm="6">
                          {" "}
                          <h3 className="examClassText">
                            Class {exam.class.name}
                          </h3>
                        </Col>
                        <Col sm="6">
                          <h5 className="examClassDate">
                            Start Date : {moment(exam.startDate).format("ll")}
                          </h5>
                          
                            <h5 className="examClassDate">
                              End Date : {moment(exam.endDate).format("ll")}
                            </h5>
                          
                          {/* {exam?.startTime && (
                            <h5 className="examClassDate">
                              Time : {exam.startTime}
                            </h5>
                          )} */}
                        </Col>
                      </Row>

                      <Row className="rowPaddingExam">
                        <div>
                          <Icon.Clock size={28} className="" />
                          <label className="">{exam.totalTime} minutes</label>
                        </div>
                        <div>
                          <Icon.Book size={28} className="" />
                          <label className="">
                            {exam.questions ? exam.questions.length : "0"} Quest
                          </label>
                        </div>
                        <div>
                          <Icon.CheckCircle size={28} className="" />
                          <label className="">{exam.totalMarks} marks</label>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              ))
            : ""}
        </Row>
        <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
          {examsData.length === 0 ? (
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
              forcePage={
                props.parsedFilter.page
                  ? parseInt(props.parsedFilter.page - 1)
                  : 0
              }
              onPageChange={(page) => {
                handlePagination(page);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamsListing;
