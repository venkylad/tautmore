//SERVICES

import http from "../../api-fetch/Axios";

export const getTeacherLeaves = (id,params) => http.get(`api/teachers/my-leaves-list/${id}?pageNumber=${params.pageNumber}&limit=${params.limit}`);


const requestOptionsDeny = ({status:"denied"})
export const cancelTeacherLeave = (id) => http.put(`teachers/change-leave-status/${id}`,requestOptionsDeny);

const requestOptionsApprove = ({status:"approved"})
export const approveLeave = (id) => http.put(`api/teachers/change-leave-status/${id}`, requestOptionsApprove);

// export const rejectLeave = (id) => http.delete(`teachers/cancel-leave/${id}`);

export const getAllSubjects = () =>
  http.get("api/syllabus/unique-subjects-dropdown");                    

export const getAllStates = (code) =>
  http.get(`api/admin/state-list?country_code=${code}`);

export const getAllCountries = () => http.get("api/admin/countries-list");

export const getAllUniversities = () => http.get("api/admin/universities-list");

export const getAllQualifications = () =>
  http.get("api/admin/qualification-list");

export const getAllTimeSlots = () => http.get("api/teachers/timeslot");

export const getAllGrades = () => http.get("api/class/all-grades");

export const getAllCocurricular = () =>
  http.get("api/students/co-curricular-activities?");

export const registerTeacher = (data) => http.post("api/teachers/create-by-admin", { ...data });

export const getAllTeachers = (data) => 
  http.get(`api/teachers/all-teachers?pageNumber=${data?.pageNo}&limit=${data?.limit}&grade=${data?.grade}&subject=${data?.subject}&name=${data?.name}`);

export const getTeacherById = (id) => http.get(`api/teachers/my-profile/${id}`);

export const deleteTeacherById = (id) => http.delete(`api/teachers/${id}`);

export const approveTeacher = (id) =>
  http.put(`api/teachers/change-Onboarded-status/${id}?onBoarded=approved`);

export const declineTeacher = (id) =>
  http.put(`api/teachers/change-Onboarded-status/${id}?onBoarded=deny`);

  export const updateTeacherbyId = (id, body) =>
  http.put(`api/teachers/update-record/${id}`,body);


  export const getMyClasses = (body) => http.post(`api/online-class/teachers/upcoming-classes${body.id}?date=${body.date}`)


export const getSubjectsByClass = (data) =>  http.post("api/syllabus/subjects-by-class",{ ...data });

// check email
// check phone number
// otp send and response
// otp check and response

export const verifyEmailTeacher = (email) => http.get(
      `api/teachers/check-user-exist?emailID=${email}`)

export const sendOtpTeacher = (params) =>http.post(
            `api/teachers/send-otp`,
            params);
    






