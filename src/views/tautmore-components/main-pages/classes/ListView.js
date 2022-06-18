import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
} from "reactstrap";
import "./classes.scss";
import DataListConfig from "../classes/DataListConfig";
import ClassesFilter from "../classes/classesFilter";
import * as question_api from "../../services/apis/tautmore_online_class_apis/online_class_apis";
import Spinner from "../../../../components/@vuexy/spinner/Loading-spinner";
import DeletePopup from "./DeletePopup";
import { toast } from "react-toastify";
import { deleteBatch } from "../../../../redux/actions/online-class/Index";

const Listview = ({deleteBatchData, deleteBatch}) => {
  const [totalBatch, setTotalBatch] = useState(false);
  const [batchText, setBatchText] = useState('');
  const [scheduledVal, setScheduledVal] = useState('All');
  const [batchData, setBatchData] = useState([
    {batchId: '', batch: '', grade: '', subjects: '', board: '', students: '', teacher: '', schedule: ''}
  ]);
  const [resultText, setResultText] = useState("Searching for content..");
  const [deleteModel, setDeleteModel] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState('');

  // const checkScheduleValue = () => {
  //   if(scheduledVal  === 'Scheduled'){
  //     return true
  //   }else if(
  //     scheduledVal  === 'Scheduled'
  //   )
  // }

  useEffect(() => {
    setResultText("Searching for content..");
    question_api
      .getListAllBatches({
        isScheduled: scheduledVal === 'Scheduled' ? true : false || scheduledVal === 'All' ? "all" : "" || scheduledVal === 'Not Scheduled' ? false : "",
        searchText: batchText,
        page_no:1
      })
      .then((response) => {
        console.log(response, 'res from datalistconfig');
        const resData = response?.data?.data[0]?.response?.map((data) => ({
          batchId: data?._id,
          batch: data?.batchName,
          grade: data?.gradeInfo,
          subjects: data?.subjectInfo,
          board: data?.boardInfo,
          students: data?.numOfStudents,
          teacher: data?.teacherInfo,
          schedule: data?.isScheduled,
        }));
        setTotalBatch(response?.data?.data[0]?.count[0]?.count);
        setBatchData(resData);
        if (!resData.length) {
          setResultText("No Batch found");
        }
      })
      .catch((err) => {
        setResultText("No Batch found");
        setTotalBatch(true);
      })
  }, [batchText, scheduledVal, deleteBatchData]);

  useEffect(() => {
    if(deleteBatchData?.status === 'success'){
      toast.success("Batch deleted successfully!");
      const data = {
        batch: ""
      };
      deleteBatch(data);
    }

  }, [deleteBatchData]);

  

  

  const renderClassFilter = () => 
  <ClassesFilter 
    batchText={batchText} 
    handleBatchText={setBatchText} 
    scheduledVal={scheduledVal}
    setScheduledVal={setScheduledVal}
  />;

  console.log(batchData, 'batchData');

  return (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-3">
        <Col sm="8">
          <h4 className="rp-manage-school-header-title">Classes</h4>
        </Col>
      </Row>
      
      <div>
        {renderClassFilter()}
        {totalBatch !== false ? (
          <DataListConfig
            batchData={batchData}
            resultText={resultText}
            setDeleteModel={setDeleteModel}
            setSelectedBatchId={setSelectedBatchId}
          />
        ): (
          <Spinner />
        )}
      </div>
      <DeletePopup
        model={deleteModel}
        handleModel={(value) => setDeleteModel(value)}
        selectedBatchId={selectedBatchId}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  deleteBatchData: state.onlineClass.deleteBatch,
});

const mapDispatchToProps = (dispatch) => ({
  deleteBatch: (data) => dispatch(deleteBatch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Listview);