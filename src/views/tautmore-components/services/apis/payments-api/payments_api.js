import http from "../../api-fetch/Axios";

const token = JSON.parse(localStorage.getItem("tautmore-user"));
console.log(token);

export const addCourse = async (data) =>
  http.post(`/api/coursePayment/add-course-payment`, data, {
    headers: { Authorization: token.accessToken },
  });

export const addExam = async (data) =>
  http.post(`/api/examPayment/add-edit-examPayment`, data, {
    headers: { Authorization: token.accessToken },
  });

export const getPaymentCourseList = async (params) =>
  http.get(
    `/api/coursePayment/course-list`,
    { params },
    { headers: { Authorization: token.accessToken } }
  );

export const getSubscribersList = async (params) =>
  http.get(
    `/api/studentSubscription/subscriber-list`,
    { params },
    {
      headers: { Authorization: token.accessToken },
    }
  );

export const getDeactivatedList = async (params) =>
  http.get(
    `/api/students/deactived-students-list`,
    { params },
    {
      headers: { Authorization: token.accessToken },
    }
  );

export const getRevenueList = async (params) =>
  http.get(`/api/payments/revenue_list`, { params });

export const getCourseDetails = async (params) =>
  http.get(`/api/coursePayment/getCourseDetails/` + params);

export const editCourse = async (data, id) =>
  http.put(`/api/coursePayment/update-course-payment/` + id, data);

export const getCourseSubscribersList = async (params) =>
  http.get(`/api/studentSubscription/subscriber-list`, { params });

export const examPaymentsList = async (params) =>
  http.get(
    `/api/examPayment/get-examPayment-list`,
    { params },
    {
      headers: { Authorization: token.accessToken },
    }
  );

export const examPayDetails = async (params) =>
  http.get(`/api/examPayment/get-exam-Details/` + params, {
    headers: { Authorization: token.accessToken },
  });

export const updateExamPayments = async (data, id) =>
http.put(`/api/examPayment/update-examPayment/` + id, data);

export const deleteExamPayment = async (id) =>
http.get(`/api/examPayment/delete-examPayment/` + id);

export const deleteCoursePayment = async (id) =>
http.get(`/api/coursePayment/delete-coursePayment/` + id);
