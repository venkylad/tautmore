import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
} from "reactstrap";
import "./cocurricular.scss";
import DataListConfig from "../cocurricular/DataListConfig";
import CoCurricularFilter from "../cocurricular/cocurricularFilter";
import {getBatchList} from '../../services/apis/co_curricular_apis/co-curricular-apis';
import queryString from "query-string";

const Listview = (props) => {

  const [batchData, setBatchData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [resultText, setResultText] = useState("Searching for content..");
  const [searchText, setSearchText] = useState('');
  const [scheduled, setScheduled] =useState('All');

  const paginateData = queryString.parse(props.location.search)

  const loadBatchList = async() =>{
    const params = {
      isScheduled: scheduled,
      searchText: searchText,
      page_no:paginateData?.page ? paginateData?.page : 1,
    }
    try{
      setBatchData([]);
      setResultText("Searching for content..")
      const res = await getBatchList(params)
      const batchDetails = res?.data.data[0]?.response;
      setBatchData(res?.data.data[0]?.response);
      setTotalPage(Math.ceil(res?.data?.data[0]?.count[0]?.count /10))
      if (!batchDetails.length) {
        setResultText("No Batches found");
      } else {
        setResultText("");
      }
    }catch(error){
      setResultText("No Batches found");
    }
  }

  useEffect(()=>{
    loadBatchList();
  },[paginateData?.page,scheduled,searchText])

  const renderClassFilter = () => (
    <CoCurricularFilter  handleSearch={setSearchText}
    
    handleScheduled={setScheduled}/>
  );

  return (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-3">
        <Col sm="8">
          <h4 className="rp-manage-school-header-title">Co-Curricular</h4>
        </Col>
      </Row>
      
      <div>
      {renderClassFilter()}
      <DataListConfig
      batchData={batchData}
      totalPage={totalPage}
      resultText={resultText}
      parsedFilter={queryString.parse(props.location.search)}
      loadBatchList={loadBatchList}
      />
      </div>
    </React.Fragment>
  );
};

export default Listview;
