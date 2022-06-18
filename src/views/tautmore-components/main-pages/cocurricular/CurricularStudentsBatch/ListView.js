import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "reactstrap";
import "../cocurricular.scss";
import DataListConfig from "./DataListConfig";
import { getStudentsData, createCoCurrBatch } from "../../../services/apis/co_curricular_apis/co-curricular-apis";
import { history } from "../../../../../history";
import queryString from "query-string";
import CoCurrStudentsFilter from "./CoCurrStudentsFilter";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const ListView = (props) => {
  const [studentsListData, setStudentsListData] = useState([]);
  const location = useLocation();
  const [totalPage, setTotalPage] = useState(0);
  const [resultText, setResultText] = useState("Searching for content..");
  const [selectedStud, setSelectedStud] = useState([]);
  const [searchText, setSearchText] = useState('');

  const batchLocalData=JSON.parse(localStorage.getItem('batchData'));

  const paginateData = queryString.parse(props.location.search)
  const rederStudentsBatchFilter = () =>(
      <CoCurrStudentsFilter
      handleSearchText={setSearchText}/>
  )

  const getStudentsList = async () => {
    const params = {
      grade: batchLocalData.grade.id,
      activity: batchLocalData.activity.id,
      searchText: searchText,
      timezone: "",
      cocurricularRemainingClassCount: 0,
      page_no: paginateData?.page ? paginateData?.page : 1,
    };
    try{
      setStudentsListData([]);
           setResultText("Searching for content..")
      const res = await getStudentsData(params);
      console.log(res)
      const studData = res?.data?.data[0]?.response;
      setStudentsListData(res?.data?.data[0]?.response);
      setTotalPage(Math.ceil(res?.data?.data[0]?.count[0]?.count / 10));
      if (!studData.length) {
        setResultText("No Students found");
      } else {
        setResultText("");
      }
    }catch(error){
      setResultText("No Students found");
    }
  };

  const saveBatch = async () =>{
    if(selectedStud.length > 0){
      const params = {
        batchName:batchLocalData.batchname,
        board:batchLocalData.boardname.id,
        grade:batchLocalData.grade.id,
        activity:batchLocalData.activity.id,
        teacher:batchLocalData.teacher.id,
        students:selectedStud,
        timezone:batchLocalData.timezone.value
      }
      try{
        const res = await createCoCurrBatch(params)
        toast.success("Batch Added successfully!")
        // localStorage.removeItem('cocurrStudents');
        localStorage.removeItem('batchData')
        history.push('/co-curricular')
      }catch(error){
        toast.error(error.response.data.message)
      }
    }else{
      toast.error("Select Atleast one Student")
    }
  }

  const backtoCoCurrCreate = () =>{
    history.push('/add-cocurricular-batch')
    localStorage.removeItem('batchData');
    // localStorage.removeItem('cocurrStudents')
  }

  useEffect(() => {
      getStudentsList();
  }, [searchText, paginateData?.page]);

  return (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-3">
        <Col sm="8">
          <h4 className="rp-manage-school-header-title">Select Students</h4>
        </Col>
      </Row>
      {rederStudentsBatchFilter()}
      <DataListConfig studentsList={studentsListData}
      totalPage={totalPage}
      resultText={resultText}
      parsedFilter={queryString.parse(props.location.search)}
      selectedStud={selectedStud}
      setSelectedStud={setSelectedStud}
      />
      <div className="data-list-sidebar-footer px-2 d-flex justify-content-center align-items-center mt-1">
        <Button
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
          onClick={() => backtoCoCurrCreate()}
        >
          Back
        </Button>
      </div>
    </React.Fragment>
  );
};

export default ListView;
