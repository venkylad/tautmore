import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Row,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  CardHeader,
  CustomInput,
} from "reactstrap";
import "./cocurricular.scss";
import { Check } from "react-feather";
import { useParams } from "react-router-dom";
import {DatePicker} from 'antd'
import 'antd/dist/antd.css';
import * as Yup from "yup";
import moment from 'moment';
import './cocurricular.scss'

import { getScheduleBatchDetails, getTeacherAvailableSlots, addSchedule, updateSchedule } from "../../services/apis/co_curricular_apis/co-curricular-apis";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { history } from "../../../../history";
import Spinner from "../../../../components/@vuexy/spinner/Loading-spinner";



const CoCurricularBatchDetails = () => {

  const add_schedule_schema = Yup.object().shape({
    startDate: Yup.date().required("Start Date is Required"),
    endDate: Yup.date().required("End Date is Required"),
  });

  const [scheduleDetailsData, setScheduleDetailsData] = useState([]);
  const [scheduleInfo, setScheduleInfo] = useState([]);
  const [teacherSlotsData, setTeacherSlotsData]= useState([]);
  const [totalTime, setTotaltime] = useState([]);
  const [dates, setDates] = React.useState([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState([]);
  const [loader, setLoader] = useState(true);
  const params = useParams();


  const getBatchDetails = async () =>{
    try{
      const res = await getScheduleBatchDetails({batch: params.id})
      if(res.status === 200){
        setScheduleDetailsData(res?.data?.data?.batchInfo[0]);
        setScheduleInfo(res?.data?.data?.scheduleInfo);
        const teacher_id = res?.data?.data?.batchInfo[0]?.teacherInfo?._id;
        getTeacherSlots(teacher_id);
      }
      
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    setLoader(true) 
  }, []);

  const endDateChange = (val, setFieldValue, values) => {
    setFieldValue('endDate',moment(val));
    const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    const start = moment(values.startDate)
    const end = moment(val)
    
    const daysBetween = end.diff(start,'days');


    const arr = [];

    for (let i = 0; i <= daysBetween; i++) {
      console.log(moment(val).add(i, 'day'))
       const temp = moment(values.startDate).add(i, 'day');
      // temp.setDate(start.getDate() + i)
      
        arr.push(weekday[temp.day()]);
    }
   
    const data = teacherSlotsData?.filter(data => arr.includes(data.day));

    const dts= data?.map((da)=>{
      return {
        day:da.day,
        timeSlot:da.timeSlot.map(ts=>{
          const day_index=scheduleInfo.findIndex(fd=>fd.dayOfWeek === da.day)
         if(day_index > -1)
         {
          const timeArray=scheduleInfo[day_index].timeSlots
          return {checked:timeArray.includes(ts),time:ts}
         }
         return {checked:false,time:ts}
        })
      }
    })
  
    setTotaltime(dts);

    let timeSLot = data.map((data) => ({day: data.day, time:[]}));
    setSelectedTimeslot(timeSLot);
  }

  const startDateChange = (val, setFieldValue, values) => {
   
   
   
  
    setFieldValue('startDate',moment(val));
   const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
   const start = moment(val)
   const end = moment(values.endDate);

   const daysBetween = end.diff(start,'days');

   const arr = [];

   for (let i = 0; i <= daysBetween; i++) {
     console.log(moment(val).add(i, 'day'))
      const temp = moment(val).add(i, 'day');
     // temp.setDate(start.getDate() + i)
     
       arr.push(weekday[temp.day()]);
   }
  console.log(arr)
   const data = teacherSlotsData?.filter(data => arr.includes(data.day));

   const dts= data?.map((da)=>{
     return {
       day:da.day,
       timeSlot:da.timeSlot.map(ts=>{
         const day_index=scheduleInfo.findIndex(fd=>fd.dayOfWeek === da.day)
        if(day_index > -1)
        {
         const timeArray=scheduleInfo[day_index].timeSlots
         return {checked:timeArray.includes(ts),time:ts}
        }
        return {checked:false,time:ts}
       })
     }
   })

   setTotaltime(dts);
   let timeSLot = data.map((data) => ({day: data.day, time:[]}));
   setSelectedTimeslot(timeSLot);
 };


 useEffect(() => {

   
   
  console.log(teacherSlotsData)
  console.log(scheduleDetailsData)
   if(scheduleInfo.length !== 0){
     console.log(teacherSlotsData)
   
  
    
   const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
   const start = moment(scheduleDetailsData?.startDate);
   const end = moment(scheduleDetailsData?.endDate);
   const daysBetween = end.diff(start,'days');
   const arr = [];

   for (let i = 0; i <= daysBetween; i++) {
   
     const temp = moment(scheduleDetailsData?.startDate).add(i, 'day');

    
     arr.push(weekday[temp.day()]);
   }
   console.log(arr,teacherSlotsData)

   setDates(arr);
   console.log(teacherSlotsData)
   const data = teacherSlotsData?.filter(data => arr.includes(data.day));
   console.log(data)
  const ex= data?.map((da)=>{
     return {
       day:da.day,
       timeSlot:da.timeSlot.map(ts=>{
         const day_index=scheduleInfo.findIndex(fd=>fd.dayOfWeek === da.day)
        if(day_index > -1)
        {
         const timeArray=scheduleInfo[day_index].timeSlots
         return {checked:timeArray.includes(ts),time:ts}
        }
        return {checked:false,time:ts}
       })
     }
   })
   console.log(ex)
   setTotaltime(ex);

     console.log('yes in schedule');
   
   
     //setTotaltime(scheduleDetailsData?.data?.scheduleInfo.map((data) => ({day: data?.dayOfWeek, timeSlot: data?.timeSlots})));
     //setSelectedTimeslot(scheduleDetailsData?.data?.scheduleInfo.map((data) => ({day: data?.dayOfWeek, time: data?.timeSlots})));
   }
   else {
    if(teacherSlotsData?.length > 0)
    {
     const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
     const start = moment().add(1,'days')
     const end = moment().add(2,'days');
    
     const daysBetween = end.diff(start,'days');
 
     const arr = [];
 
     for (let i = 0; i <= daysBetween; i++) {
      
        const temp = moment(start).add(i, 'day');
       // temp.setDate(start.getDate() + i)
       
         arr.push(weekday[temp.day()]);
     }
    console.log(arr)
     const data = teacherSlotsData?.filter(data => arr.includes(data.day));

     const dts= data?.map((da)=>{
       return {
         day:da.day,
         timeSlot:da.timeSlot.map(ts=>{
           const day_index=scheduleInfo.findIndex(fd=>fd.dayOfWeek === da.day)
          if(day_index > -1)
          {
           const timeArray=scheduleInfo[day_index].timeSlots
           return {checked:timeArray.includes(ts),time:ts}
          }
          return {checked:false,time:ts}
         })
       }
     })
     setTotaltime(dts);
     let timeSLot = data.map((data) => ({day: data.day, time:[]}));
     setSelectedTimeslot(timeSLot);
    }
  
   }

 }, [scheduleDetailsData, teacherSlotsData]);

 const changeTimeslot = (e,slab,index) => {
console.log(e,slab,index)
  const ex=  totalTime.map(tld=>{
      if(tld.day === slab.day)
      {
        return {
          ...tld,timeSlot:slab.timeSlot.map((ts,i)=>{
            if(i === index)
            {
              return {...ts,checked:e.target.checked}
            }
            return ts
          })
        }
      }
      return tld
    })
    setTotaltime(ex)

};

 const getTeacherSlots = async (tid) =>{
   const res = await getTeacherAvailableSlots({id:tid})
   if(res.status === 200){
     setTeacherSlotsData(res?.data?.data);
     setLoader(false) 
   }
 }

 const scheduleClass = (value) => {
  const checkedSlots = totalTime.map(sc=>({day:sc.day,time:sc.timeSlot.filter(tf=>tf.checked).map(t=>t.time)}))
  const checkingData = checkedSlots.map((data)=>{
    if(data.time.length > 0){
      return true
    }else{
      return false
    }
  })
  const selectedTimeData = checkingData.find(obj => obj === true);

  // if (value.startDate === '' || value.endDate === ''){
  //   toast.error("Select atleast one time slot")
  //   return;
  // }
  console.log(totalTime)
  const data = {
    batch: params?.id,
    schedule: {
      startDate: moment(value.startDate).format('YYYY-MM-DD'),
      endDate: moment(value.endDate).format('YYYY-MM-DD'),
      slots: totalTime.map(sc=>({day:sc.day,time:sc.timeSlot.filter(tf=>tf.checked).map(t=>t.time)})),
    }
  };
  if(scheduleInfo.length === 0){
    if(selectedTimeData === true){
      addCoCurrSchedule(data)
    }else{
      toast.error("Select atleast one time slot")
    }
  }
  else if(scheduleInfo.length !== 0){
    if(selectedTimeData === true){
      updateCoCurrSchedule(data)
    }else{
      toast.error("Select atleast one time slot")
    }
  }
 }

 const updateCoCurrSchedule = async (data) =>{
   try{
    const res = await updateSchedule(data)
    if(res.status === 200){
      toast.success("Class Schedule Updated Successfully");
      history.push('/co-curricular')
    }
   }catch(error){
     toast.error(error.response.data.message)
   }
 }

 const addCoCurrSchedule = async (data) =>{
   try{
    const res = await addSchedule(data)
    if(res.status === 200){
      toast.success("Class Scheduled is Successfull");
      history.push('/co-curricular')
    }
   }catch(error){
     toast.error(error.response.data.message)
   }
    
 }

//  useEffect(() => {
//   if(scheduleDetailsData){
//     console.log('true')
//     const teacher_id = scheduleDetailsData?.teacherInfo?._id;
//     getTeacherSlots(teacher_id);
//   }
// }, [scheduleDetailsData]);

  const handleAddSubmit = (data) => {
    console.log('formik data', data)
  };

  useEffect(()=>{
    getBatchDetails()
  }, [])
  return (
    <div>
      <React.Fragment>
        {!loader ? 
        (
          <div>
            <Card>
          <CardBody>
            <h4 className="rp-manage-school-header-title">Co-Curricular Batch Details</h4>
            <div className="data-list-header d-flex justify-content-between flex-wrap">
              <div className="rp-manageSchool-head-main-batchDet align-items-center justify-content-between d-flex flex-wrap mt-sm-0 mt-2">
              <div>
                  <h3>Teacher Name</h3>
                  <h2>{scheduleDetailsData?.teacherInfo?.fullName}</h2>
                </div>


                <div>
                  <h3>Grade</h3>
                  <h2>{scheduleDetailsData?.gradeInfo?.name}</h2>
                </div>

                <div>
                  <h3>Activity</h3>
                  <h2>{scheduleDetailsData?.activityInfo?.activityName}</h2>
                </div>

                <div>
                  <h3>Board</h3>
                  <h2>{scheduleDetailsData?.boardInfo?.name}</h2>
                </div>

                <div>
                  <h3>Students</h3>
                  <h2>{scheduleDetailsData?.numOfStudents}</h2>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        {/* </Row> */}
       <Formik
       initialValues={{
        startDate: scheduleInfo.length !== 0 ? scheduleDetailsData?.startDate : moment().add(1,'days'), 
        endDate: scheduleInfo.length !== 0 ? scheduleDetailsData?.endDate : moment().add(2,'days'), 
      }}
      validationSchema={add_schedule_schema}
      onSubmit={(data) => handleAddSubmit(data)}
      validator={() => ({})}
       >
         {({
           errors,
           touched,
           values,
           handleSubmit,
           handleChange,
           setFieldValue,
           resetForm,
         })=>{
          return (
            <Form onSubmit={handleSubmit}>
              <div className="batch-details-main">
                <Card>
                <CardBody>
                  <Row>
                    <Col sm="3">
                      <FormGroup>
                        <Label
                          for="data-name"
                          className="rp-manage-school-input-title"
                        >
         
                          Start Date
                        </Label>
                        <DatePicker
                        name="startDate"
                        id="from"
                        showToday={false}
                        allowClear={false}
                        value={moment(values.startDate)}
                        className="form-control"
                        onChange={(value) => startDateChange(value, setFieldValue, values)}
                        disabledDate={(current) => current.isBefore(moment())}
                        />

                        
                       {/* <Input
                        type="date"
                        name="startDate"
                        id="from"
                        value={values.startDate}
                        minDate={"2022-03-22T12:00:00.000Z"}
                        // min={values.examdate}
                        //   onChange={(e) => setFromDate(e.target.value)}
                        className="form-control"
                        onChange={(e) => startDateChange(e, setFieldValue, values)}
                        

                      /> */}
                        {errors.startDate && touched.startDate ? (
                          <div className="rp-manage-school_error-message mt-25">
                            {errors.startDate}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <Label
                          for="data-name"
                          className="rp-manage-school-input-title"
                        >
                          End Date
                        </Label>
                        
                        <DatePicker
                        name="endDate"
                        id="enddate"
                        showToday={false}
                        allowClear={false}
                        onChange={(value) => endDateChange(value, setFieldValue, values)}
                        value={moment(values.endDate)}
                        disabledDate={(current) => current.isBefore(moment(values.startDate))}
                        className="form-control"
                        // min={values.examdate}
                      /> 
                       
                        {errors.endDate && touched.endDate ? (
                          <div className="rp-manage-school_error-message mt-25">
                            {errors.endDate}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col sm="6" className="schedule-btn-part">
                      <div className="data-list-sidebar-footer px-2 d-flex justify-content-end align-items-end mt-1">
                        {/* <Button type="button" onClick={() => scheduleToday(setFieldValue)} className="tautmore-manage-school_submit">Schedule Today</Button> */}
                        <Button type="submit" onClick={() => scheduleClass(values)} className="tautmore-manage-school_submit">
                          { scheduleInfo.length !== 0 ? 'Update Schedule' : 'Schedule Class'}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                </Card>
                <Row className="time-table">
                {totalTime?.map((data, i) => (
                  // <Col sm="6" key={i}>
                  <div className="time-table-sub"  key={i}>
                    <Card >
                      <CardHeader>
                        <h3>{data.day}</h3>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          {data?.timeSlot?.map((val, index) => {
                          return (
                            <Col sm="4" key={index}>
                              <CustomInput
                                className="custom-check-dark customLabelCheck mr-1 mb-2"
                                type="checkbox"
                               // defaultChecked={isClassBooked(scheduleDetailsData,i, val,data) ? 'checked' : ''}
                                checked={val.checked}
                                icon={<Check className="vx-icon" size={20} />}
                                id={val.time + i + index}
                                name={val.time + i + index}
                                label={val.time}
                                onChange={(e) => changeTimeslot(e,data,index)}
                              />
                            </Col>
                          )})}
                        </Row>
                      </CardBody>
                    </Card>
                  </div>
                  // </Col>
                ))}
              </Row>
              <div className="data-list-sidebar-footer px-2 d-flex justify-content-end align-items-end mt-1">
                        {/* <Button type="button" onClick={() => scheduleToday(setFieldValue)} className="tautmore-manage-school_submit">Schedule Today</Button> */}
                        <Button type="submit" onClick={() => scheduleClass(values)} className="tautmore-manage-school_submit">
                          { scheduleInfo.length !== 0 ? 'Update Schedule' : 'Schedule Class'}
                        </Button>
                      </div>
              </div>
            </Form>
          )
         }}
       </Formik>
          </div>
        ) : <Spinner/>}
        {/* <Row className="ml-0 mr-0 mb-3"> */}
        
      </React.Fragment>
    </div>
  );
};

export default CoCurricularBatchDetails;
