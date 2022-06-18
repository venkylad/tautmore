import React,{useState,useEffect} from "react";
import Table from "../../../utility/table";
import { teacherLeaveData } from "../mockdata";

import * as Icon from "react-feather";
import { getTeacherLeavesAction,cancelTeacherLeaveAction,approveTeacherLeaveAction } from "../../../../../redux/actions/manage-teacher/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import LeaveConfirmPopup from "./LeaveConfirmPopup";
import LeavesFilter from "./LeavesFilter";
import * as question_api from "../../../../tautmore-components/services/apis/manage-teacher/manage-teacher-api";
import moment,{format} from "moment";

const Leaves = ({ id,teachersLeavesData,approvedeLeavesData,cancelledLeavesData, getTeacherLeaves,
  cancelTeacherLeave,approveTeacherLeave }) => {

  const [model, setModel] = useState(false);
  const [teacherLeaves, setTeacherLeaves] = useState([]);
  const [teacherId, setTeacherId] = useState('');
  const [leaveStatus, setLeaveStatus] = useState('');

  const onLeaveApprove = (leaveID) => {
    // approveTeacherLeave(leaveID);
    setTeacherId(leaveID);
    setLeaveStatus('approve');
    setModel(true);
  }

  const onLeaveReject = (leaveID) => {
    // cancelTeacherLeave(leaveID);
    setTeacherId(leaveID);
    setLeaveStatus('cancel');
    setModel(true);
  }

  const format2 = 'YYYY-MM-DD';
  const dateformatted = moment('2022-03-25').format('LLLL');
  console.log(dateformatted,"FF");

  // const [LeavesData,setLeavesData] = useState([])

  // useEffect(() => {
  //   if (teachersLeavesData.length===0 || approvedeLeavesData?.data || cancelledLeavesData?.data) {
  //     getTeacherLeaves(id);
  //   }
      
  // }, [getTeacherLeaves, id, teachersLeavesData.length, approvedeLeavesData, cancelledLeavesData]);

  useEffect(() => {
    if (approvedeLeavesData?.status === 'success'){
      toast.success("Leave Approved");
      approveTeacherLeave();
    }
  }, [approveTeacherLeave, approvedeLeavesData]);

  useEffect(() => {
    if (cancelledLeavesData?.status === 'success'){
      toast.success("Leave Denied");
      cancelTeacherLeave();
    }
  }, [cancelledLeavesData]);

  // useEffect(() => {
  //   if (teachersLeavesData?.data?.length > 0) {
  //     const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  //     const fromTo = teachersLeavesData?.data.map((item) => ({
  //       from: `${month[new Date(item?.from).getMonth()]} ${new Date(item?.from).getDate()}, ${new Date(item?.from).getFullYear()}`,
  //       to: `${month[new Date(item?.to).getMonth()]} ${new Date(item?.to).getDate()}, ${new Date(item?.to).getFullYear()}`,
  //     }));
  //     const cdata = teachersLeavesData?.data.map((data, ind) => ({
  //       fromTo: `${fromTo[ind].from} - ${fromTo[ind].to}`,
  //       comments:data.reason,
  //       status:data.status,
  //       id:data._id
  //     }));
  //     setTeacherLeaves(cdata);
  //   }
  // }, [teachersLeavesData, approvedeLeavesData, cancelledLeavesData]);

  // useEffect(() => {
  //   question_api
  //     .getTeacherLeaves(id,{pageNumber:1,limit:30})
  //       .then((response) => {
  //         console.log(response, 'res from leaves');
  //         const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  //         const fromTo = response?.data?.data?.map((item) => ({
  //           from: `${month[new Date(item?.from).getMonth()]} ${new Date(item?.from).getDate()}, ${new Date(item?.from).getFullYear()}`,
  //           to: `${month[new Date(item?.to).getMonth()]} ${new Date(item?.to).getDate()}, ${new Date(item?.to).getFullYear()}`,
  //         }));
  //         const cdata = response?.data?.data?.map((data, ind) => ({
  //           fromTo: `${fromTo[ind].from} - ${fromTo[ind].to}`,
  //           comments:data.reason,
  //           status:data.status,
  //           id:data._id
  //         }));
  //         setTeacherLeaves(cdata);
  //       }).catch((err) => {
  //         console.log(err, 'err')
  //       }) 
  // }, [approvedeLeavesData, cancelledLeavesData]);

  // useEffect(() => {
  //   question_api
  //     .getTeacherLeaves(id,{pageNumber:1,limit:30})
  //       .then((response) => {
  //         console.log(response, 'res from leaves');
  //         const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  //         const fromTo = response?.data?.data?.leaveList.map((item) => ({
  //           from: `${month[new Date(item?.from).getMonth()]} ${new Date(item?.from).getDate()}, ${new Date(item?.from).getFullYear()}`,
  //           to: `${month[new Date(item?.to).getMonth()]} ${new Date(item?.to).getDate()}, ${new Date(item?.to).getFullYear()}`,
  //         }));
  //         const cdata = response?.data?.data?.leavesList.map((data, ind) => ({
  //           fromTo: `${fromTo[ind].from} - ${fromTo[ind].to}`,
  //           comments:data.reason,
  //           status:data.status,
  //           id:data._id
  //         }));
  //         setTeacherLeaves(cdata);
  //       }).catch((err) => {
  //         console.log(err, 'err')
  //       }) 
  // }, [approvedeLeavesData, cancelledLeavesData]);

  useEffect(() => {
    question_api
      .getTeacherLeaves(id,{pageNumber:1,limit:30})
        .then((response) => {
          console.log(response, 'res from leaves');
          console.log(response?.data?.data?.leaveList, 'Leaves List');

          const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          const fromTo = response?.data?.data?.leaveList.map((item) => ({
            from: `${month[new Date(item?.from).getMonth()]} ${new Date(item?.from).getDate()}, ${new Date(item?.from).getFullYear()}`,
            to: `${month[new Date(item?.to).getMonth()]} ${new Date(item?.to).getDate()}, ${new Date(item?.to).getFullYear()}`,
          }));
          // console.log(fromTo,"From to")

          // const cdata = response?.data?.data?.leavesList?.map((data, ind) => ({
          //   fromTo: `${fromTo[ind]?.from} - ${fromTo[ind]?.to}`,
          //   comments:data?.reason,
          //   status:data?.status,
          //   id:data?._id
          // }));
          // console.log(cdata,"cdata !!")
          // setTeacherLeaves(cdata);

            // My code
          const cData1 = response?.data?.data?.leaveList.map((item)=>({
            from: moment(item?.from?.substr(0,10)).format('LL'),
            to: moment(item?.to?.substr(0,10)).format('LL'),
            // fromD: moment(item.from.substr(0,10), format2.format('LLLL'),
            // fromTo:`${moment(item?.from?.substr(0,10)).format('LLLL')}+`-`+${moment(item?.to?.substr(0,10)).format('LLLL')}`,
            status: item.status,
            comment:item.reason,
            id:item._id
          }))

          console.log(cData1,"cdata")

          const cdata2 = cData1.map((item)=>({
            fromTo:`${item?.from}-${item?.to}`,
            comments: item.comment,
            id:item.id,
            status:item.status
          }))

       setTeacherLeaves(cdata2);
       console.log(cdata2,"cdata!")

        }).catch((err) => {
          console.log(err, 'err')
        }) 
  }, [approvedeLeavesData, cancelledLeavesData]);


  console.log(teacherLeaves,"Teacher Leaves dATA")

  const tableColumns = [
    {
      id: 2,
      name: "From - To",
      selector: (row) => (
        <div className="teacher-id">
          <span className="teacher-icon leave-no">{row.fromTo}</span>
        </div>
      ),             
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: "Comments",
      selector: (row) => row.comments,
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: "Status",                              
      selector: (row) => (
        <p className={`leave-status ${row.status}`}>   
          {row.status === "pending"
            ? "Approval pending"
            : row.status === "approved"
            ? "Approved"
            : "Cancelled"}
        </p>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 6,
      name: "",
      selector: (row) =>
        row.status === "pending" && (
          <div className="table-action">
            <button onClick={()=>onLeaveApprove(row.id)}>
              <Icon.Check size="25" className="approve-btn" />
            </button>
            <button onClick={()=>onLeaveReject(row.id)}>
              <Icon.X size="25" className="reject-btn" />
            </button>
          </div>
        ),
      sortable: true,
      reorder: true,
    },
  ];

  console.log(teachersLeavesData, 'teachersLeavesData from leaves');

  const rowClickHandler = (row) => {
    console.log("Clicked row: => ", row);
  };

  return (
    <>
      {/* <LeavesFilter /> */}
      <div className="leave-history-table">
        <Table
          columns={tableColumns}
          data={teacherLeaves}
          onRowClicked={rowClickHandler}
          rowsPerPage={5}
          parentClassName="teacher-table-container"
          tableClassName="teacher-table"
          shouldPaginate={false}
        />
      </div>
      <LeaveConfirmPopup 
        model={model} 
        handleModel={(value) => setModel(value)}
        teacherId={teacherId}
        leaveStatus={leaveStatus}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  teachersLeavesData: state.adminTeacher.teacherLeaves,
  approvedeLeavesData: state.adminTeacher.approvedLeaves,
  cancelledLeavesData: state.adminTeacher.cancelledLeaves,
});

const mapDispatchToProps = (dispatch) => ({
  getTeacherLeaves: (id) => dispatch(getTeacherLeavesAction(id)),
  cancelTeacherLeave: (id) => dispatch(cancelTeacherLeaveAction(id)),    
  approveTeacherLeave: (id) => dispatch(approveTeacherLeaveAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaves);
