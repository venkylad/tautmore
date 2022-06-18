import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import moment from 'moment'
//import DatePicker from 'react-date-picker';
import {DatePicker} from 'antd'
import {differenceBy} from 'lodash/differenceBy'
import 'antd/dist/antd.css';
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
import "./classes.scss";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import { ChevronDown, Check } from "react-feather";
import { history } from "../../../../history";
import { teacherSlots, updateSchedule, scheduleDetails, addSchedule } from "../../../../redux/actions/online-class/Index";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Spinner from "../../../../components/@vuexy/spinner/Loading-spinner";

const BatchDetails = ({
  scheduleDetails, 
  scheduleDetailsData,
  teacherSlotsData, 
  teacherSlots, 
  updateSchedule, 
  match, 
  updateScheduleData, 
  addScheduleData, 
  addSchedule, 
  isLoading}) => {
  const [timeslotError, setTimeslotError] = useState(false);
  const [checked,setChecked]= useState('');
  const [dates, setDates] = React.useState([]);
  const [totalTime, setTotaltime] = useState([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState([]);
  const [loader, setLoader] = useState(false);
  const [scheduledData,setScheduledData]=useState()
  

  const add_schedule_schema = Yup.object().shape({
    startDate: Yup.date().required("Start Date is Required"),
    endDate: Yup.date().required("End Date is Required"),
  });

  const batch_id = match?.params?.id;

  useEffect(() => {
    isLoading ? setLoader(true) : setLoader(false);
  }, [isLoading]);

  useEffect(() => {
    if(!scheduleDetailsData?.data){
      scheduleDetails(batch_id);
    }
  }, [scheduleDetailsData, batch_id]);

  useEffect(() => {
    scheduleDetails(batch_id);
  }, [batch_id]);


  

  useEffect(() => {

   
   
   console.log(teacherSlotsData)
   console.log(scheduleDetailsData)
    if(scheduleDetailsData?.data?.scheduleInfo.length !== 0){
      console.log(teacherSlotsData)
    
   
     
    const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    const start = moment(scheduleDetailsData?.data?.batchInfo[0]?.startDate);
    const end = moment(scheduleDetailsData?.data?.batchInfo[0]?.endDate);
    const daysBetween = end.diff(start,'days');
    const arr = [];

    for (let i = 0; i <= daysBetween; i++) {
    
      const temp = moment(scheduleDetailsData?.data?.batchInfo[0]?.startDate).add(i, 'day');

     
      arr.push(weekday[temp.day()]);
    }
    console.log(arr,teacherSlotsData)

    setDates(arr);
    console.log(teacherSlotsData)
    const data = teacherSlotsData?.data?.filter(data => arr.includes(data.day));
    console.log(data)
   const ex= data?.map((da)=>{
      return {
        day:da.day,
        timeSlot:da.timeSlot.map(ts=>{
          const day_index=scheduleDetailsData?.data?.scheduleInfo.findIndex(fd=>fd.dayOfWeek === da.day)
         if(day_index > -1)
         {
          const timeArray=scheduleDetailsData?.data?.scheduleInfo[day_index].timeSlots
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
     if(teacherSlotsData?.data?.length > 0)
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
      const data = teacherSlotsData?.data?.filter(data => arr.includes(data.day));

      const dts= data?.map((da)=>{
        return {
          day:da.day,
          timeSlot:da.timeSlot.map(ts=>{
            const day_index=scheduleDetailsData?.data?.scheduleInfo.findIndex(fd=>fd.dayOfWeek === da.day)
           if(day_index > -1)
           {
            const timeArray=scheduleDetailsData?.data?.scheduleInfo[day_index].timeSlots
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

  }, [scheduleDetailsData, teacherSlotsData, batch_id]);

  console.log(scheduleDetailsData, 'scheduleDetailsData')

  useEffect(() => {
    if(!teacherSlotsData?.data && scheduleDetailsData?.data){
      const teacher_id = scheduleDetailsData?.data?.batchInfo[0]?.teacherInfo?._id;
      teacherSlots(teacher_id);
    }
  }, [teacherSlotsData, scheduleDetailsData]);
  console.log(teacherSlotsData, 'teacherSlotsData')
  const handleAddSubmit = (data) => {
    console.log('formik data', data)
  };

  useEffect(()=>{
    console.log(scheduleDetailsData,">>scheduleDetailsData")
    if(scheduleDetailsData)
    {
      
      //console.log(scheduleDetailsData)
      
        
        setScheduledData(scheduleDetailsData?.data?.scheduleInfo)
      
      
    }
    
  },[scheduleDetailsData])

  const changeTimeslot = (e,slab,index) => {

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

  

  const [enableEdit,setEnableEdit] = useState(false)

  const scheduleClass = (value) => {
   
    setEnableEdit(true)
   
    // if (timeMon.length === 0 && timeTue.length === 0 && timeWed.length === 0 && timeThu.length === 0 && timeFri.length === 0 && timeSat.length === 0){
    //   console.log('time issue');
    //   setTimeslotError(true);
    //   return;
    // }

    // const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    // const start = new Date(values.startDate);
    // const end = new Date(values.endDate);
    // const daysBetween = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    // const arr = [];

    // for (let i = 0; i <= daysBetween; i++) {
    //   const temp = new Date();
    //   temp.setDate(start.getDate() + i)
    //   arr.push(weekday[temp.getDay()]);
    // }
    // setDates(arr);
    // const data1 = teacherSlotsData?.data?.filter(data => arr.includes(data.day));
    // console.log(data1, 'data from end date');
    // setTotaltime(data1);


//commented by Dhanush
    // const arrLen = selectedTimeslot.map((val) => val?.time?.length);
    
    // if (arrLen.filter((data) => data > 0).length === 0) {
    //   console.log('one');
    //   setTimeslotError(true);
    //   return;
    // }


    if (value.startDate === '' || value.endDate === ''){
      console.log('value issue');
      return;
    }
    console.log(totalTime)
    const data = {
      batch: match?.params?.id,
      schedule: {
        startDate: moment(value.startDate).format('YYYY-MM-DD'),
        endDate: moment(value.endDate).format('YYYY-MM-DD'),
        slots: totalTime.map(sc=>({day:sc.day,time:sc.timeSlot.filter(tf=>tf.checked).map(t=>t.time)})),
      }
    };
    if(scheduleDetailsData?.data?.scheduleInfo.length === 0){
      addSchedule(data);
    }
    else if(scheduleDetailsData?.data?.scheduleInfo.length !== 0) {
      console.log(data)
      updateSchedule(data);
    }
  };

  // useEffect(() => {
  //   let arr = [];
  //   if (timeMon.length !== 0){
  //     arr.push({day: "monday", time: timeMon})
  //   }
  //   if (timeTue.length !== 0){
  //     arr.push({day: "tuesday", time: timeTue})
  //   }
  //   if (timeWed.length !== 0){
  //     arr.push({day: "wednesday", time: timeWed})
  //   }
  //   if (timeThu.length !== 0){
  //     arr.push({day: "thursday", time: timeThu})
  //   }
  //   if (timeFri.length !== 0){
  //     arr.push({day: "friday", time: timeFri})
  //   }
  //   if (timeSat.length !== 0){
  //     arr.push({day: "saturday", time: timeSat})
  //   }
  //   setTotalTimeslot(arr);
  // }, [timeMon, timeTue, timeWed, timeThu, timeFri, timeSat]);

  useEffect(() => {
    if(updateScheduleData?.status === 'success'){
      toast.success("Schedule Updated successfully!");
      updateSchedule('');
      history.push('/classes');
    }
    if(updateScheduleData?.statusCode === 404)
    {
     
      toast.error("Some problem in scheduling");
    }
  }, [updateScheduleData]);

  useEffect(() => {
    if(addScheduleData?.status === 'success'){
      toast.success("Schedule Added successfully!");
      addSchedule('');
      history.push('/classes');
    }
  }, [addScheduleData]);



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
    const data = teacherSlotsData?.data?.filter(data => arr.includes(data.day));

    const dts= data?.map((da)=>{
      return {
        day:da.day,
        timeSlot:da.timeSlot.map(ts=>{
          const day_index=scheduleDetailsData?.data?.scheduleInfo.findIndex(fd=>fd.dayOfWeek === da.day)
         if(day_index > -1)
         {
          const timeArray=scheduleDetailsData?.data?.scheduleInfo[day_index].timeSlots
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
   
    const data = teacherSlotsData?.data?.filter(data => arr.includes(data.day));

    const dts= data?.map((da)=>{
      return {
        day:da.day,
        timeSlot:da.timeSlot.map(ts=>{
          const day_index=scheduleDetailsData?.data?.scheduleInfo.findIndex(fd=>fd.dayOfWeek === da.day)
         if(day_index > -1)
         {
          const timeArray=scheduleDetailsData?.data?.scheduleInfo[day_index].timeSlots
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





 






  return (
    <div className="batch-details-main">
      <React.Fragment>
        { !loader ?  
        <Formik
          
          initialValues={{
            startDate: scheduleDetailsData?.data?.scheduleInfo.length !== 0 ? scheduleDetailsData?.data?.batchInfo[0]?.startDate : moment().add(1,'days'), 
            endDate: scheduleDetailsData?.data?.scheduleInfo.length !== 0 ? scheduleDetailsData?.data?.batchInfo[0]?.endDate : moment().add(2,'days'), 
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
        }) => {
         
        // console.log( new Date(new Date(values.startDate).getUTCMonth()+1,new Date(new Date(values.startDate).getUTCDate()),new Date(new Date(values.startDate).getUTCFullYear())))
          return (
            <Form  onSubmit={handleSubmit}>
            <div>
              <Card>
                <CardBody>
                  <h4 className="rp-manage-school-header-title">Batch Details</h4>
                  <div className="data-list-header d-flex justify-content-between flex-wrap">
                    <div className="rp-manageSchool-head-main-batchDet align-items-center justify-content-between d-flex flex-wrap mt-sm-0 mt-2">
                      {/* <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head-Classes mr-1 d-md-block d-none">
                        <DropdownToggle color="" className="sort-dropdown">
                          <span className="align-middle mx-50 adminfilterdisSpan">
                            {scheduleDetailsData?.data?.batchInfo[0]?.teacherInfo?.fullName}
                          </span>
                          <ChevronDown size={15} />
                        </DropdownToggle>
                        <DropdownMenu
                          className="customadmindropdownClasses"
                          tag="div"
                          right
                          value={scheduleDetailsData?.data?.batchInfo[0]?.teacherInfo?.fullName}
                        
                        >
                          <DropdownItem tag="a">{scheduleDetailsData?.data?.batchInfo[0]?.teacherInfo?.fullName}</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown> */}

<div>
                        <h3>Teacher Name</h3>
                        <p style={{fontSize:20}}>{scheduleDetailsData?.data?.batchInfo[0]?.teacherInfo?.fullName}</p>
                      </div>



                      <div>
                        <h3>Grade</h3>
                        <p>{scheduleDetailsData?.data?.batchInfo[0]?.gradeInfo?.name}</p>
                      </div>

                      <div>
                        <h3>Subject</h3>
                        <p>{scheduleDetailsData?.data?.batchInfo[0]?.subjectInfo?.name}</p>
                      </div>

                      <div>
                        <h3>Board</h3>
                        <p>{scheduleDetailsData?.data?.batchInfo[0]?.boardInfo?.name}</p>
                      </div>

                      <div>
                        <h3>Students</h3>
                        <p>{scheduleDetailsData?.data?.batchInfo[0]?.numOfStudents}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
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
                          { scheduleDetailsData?.data?.scheduleInfo.length !== 0 ? 'Update Schedule' : 'Schedule Class'}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              {timeslotError && <p className="rp-manage-school_error-message mt-25">Timeslot is Required.</p>}
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
              {timeslotError && <p className="rp-manage-school_error-message mt-25">Timeslot is Required.</p>}
              <div className="data-list-sidebar-footer px-2 d-flex justify-content-end align-items-end mt-1">
                <Button onClick={() => scheduleClass(values)} type="submit" className="tautmore-manage-school_submit">
                { scheduleDetailsData?.data?.scheduleInfo.length !== 0 ? 'Update Schedule' : 'Schedule Class'}
                </Button>
              </div>
            </div>
            </Form>
            );
          }}
        </Formik> : <Spinner />}
      </React.Fragment>
    </div>
  );
};


const mapStateToProps = (state) => ({
  teacherSlotsData: state.onlineClass.teacherSlots,
  updateScheduleData: state.onlineClass.updateSchedule,
  addScheduleData: state.onlineClass.addSchedule,
  scheduleDetailsData: state.onlineClass.scheduleDeatils,
  isLoading: state.onlineClass.isAddLoading,
});

const mapDispatchToProps = (dispatch) => ({
  teacherSlots: (id) => dispatch(teacherSlots(id)),
  updateSchedule: (data) => dispatch(updateSchedule(data)),
  addSchedule: (data) => dispatch(addSchedule(data)),
  scheduleDetails: (id) => dispatch(scheduleDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BatchDetails);