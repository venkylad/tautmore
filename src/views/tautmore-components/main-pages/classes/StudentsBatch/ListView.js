import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";
import "../classes.scss";
import DataListConfig from "./DataListConfig";
import { history } from "../../../../../history";
import StudentsBatchFilter from "./StudentsBatchFilter";
import * as question_api from "../../../services/apis/tautmore_online_class_apis/online_class_apis";
import { createBatch } from "../../../../../redux/actions/online-class/Index";
import { toast } from "react-toastify";
import Spinner from "../../../../../components/@vuexy/spinner/Loading-spinner";

const ListView = ({setStudentList, selectedSubject, selectedGrade, formikData, createBatch, createBatchData}) => {

  const [selectedStudentList, setSelectedStudentList] = useState([]);
  const [studentData, setStudentData] = useState([
    {id: '', name: '', grade: '', subject: ''}
  ]);
  const [studentListError, setStudentListError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchText,setSearchText] = useState('')

  useEffect(() => {
   
    question_api
      .getListAllStudents({
        grade: selectedGrade,
        subject: selectedSubject,
        searchText: searchText,
        page_no: 1,
        timezone:"",
        remainingClassCount:0

      })
      .then((response) => {
        console.log(response, 'res from allstudent')
      
        const resData = response?.data?.data[0]?.response?.map((data) => ({
          id: data?._id,
          name: data?.studentName,
          timezone: data?.timezone,
          remainingclasses: data?.subjectsEnrolled[0]?.remainingClassCount,
        }));
        console.log(resData,"Res Data")
        setStudentData(resData);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      })
  }, [searchText]);

  console.log(studentData,"studentData")

  useEffect(() => {
    if(createBatchData?.status === 'success'){
      toast.success("Batch Added successfully!");
      history.push('/classes');
      createBatch();
    }
  }, [createBatchData]);

  const saveBatch = () => {
    if(selectedStudentList.length === 0){
      setStudentListError(true);
      return;
    };
    const data = {
      batchName: formikData?.batchname,
      board: formikData?.boardname?.id,
      grade: formikData?.grade?.id,
      subject: formikData?.subject?.id,
      teacher: formikData?.teacher?.id,
      students: selectedStudentList,
      timezone: formikData?.timezone?.value,
    };
    createBatch(data);
  };
    
    const rederStudentsBatchFilter = () =>(
        <StudentsBatchFilter searchText={searchText} setSearchText={setSearchText}/>
    )
  return (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-3">
        <Col sm="8">
          <h4 className="rp-manage-school-header-title">Select Students</h4>
        </Col>
      </Row>
      { loader ? ( <Spinner />) :
      <>
        {rederStudentsBatchFilter()}
        
          <DataListConfig
            studentData={studentData}
            selectedStudentList={selectedStudentList}
            setSelectedStudentList={setSelectedStudentList}
            setStudentListError={setStudentListError}
          />
        
        {studentListError && <div className="rp-manage-school_error-message mt-25" style={{ textAlign: "center"}}>Student is required</div>}
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-center align-items-center mt-1">
          <Button
            type="button"
            className="tautmore-manage-school_submit"
            // disabled={loader}
            onClick={saveBatch}
          >
            Save Batch
          </Button>
          <Button
            className="ml-1 rp-manage-school_cancel"
            color="dark"
            outline
            // onClick={() => history.push("/add-batch")}
            onClick={() =>setStudentList(false)}
          >
            Back
          </Button>
        </div>
      </>
      }
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  createBatchData: state.onlineClass.createBatch,
});

const mapDispatchToProps = (dispatch) => ({
  createBatch: (data) => dispatch(createBatch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListView);