import { createClient } from "../../api-fetch/Axios";
const http = createClient()
//listing questions

//const token = JSON.parse(localStorage.getItem("tautmore-user"));



export const getAllQuestionsList = (page) =>
  http.get(`/api/questions/all-questions?page_no=${page}&moduleType=brain-gym`);

export const getAllQuestionsByPaginate = (data) =>
  http.post("/api/questions/all-questions", { ...data }, {
    // Authorization: token
});

export const setQuestionStatus = (id, status) =>
  http.post("/api/questions/activate", {
    questionIds: id,
    active: status,
  });

export const getQuestionById = (question_id) =>
  http.post("/api/questions/question-by-id", { question_id });

//Uploaded Question api
export const getUploadedQuestions = (data) =>
  http.post("/api/questions/all-questions", { ...data }, {
    //Authorization: token
  });

//get Main Questions (Uploaded question's 2nd tab) api
export const getMyUploadedQuestions = (data) =>
  http.post("/api/questions/self-assigned-questions", { ...data }, {
    //  Authorization: token
  });

//get Approved Questions
export const getApprovedQuestions = (data) =>
  http.post("/api/questions/review-stage-questions", { ...data }, {
    //  Authorization: token
  });

//get declined Questions
export const getDeclinedQuestions = (data) =>
  http.post("/api/questions/declined-questions", { ...data }, {
    //  Authorization: token
  });

// decline question
export const declineQuestion = (data) =>
  http.post("/api/questions/decline-question", { ...data }, {
    //  Authorization: token
  });

//approve-question
export const approveQuestion = (data) =>
  http.post("/api/questions/approve-question", { ...data }, {
    //  Authorization: token
  });

//block-question
export const blockQuestion = (data) =>
  http.post("/api/questions/block-question", { ...data }, {
    //  Authorization: token
  });

//release-question
export const releaseQuestion = (data) =>
  http.post("/api/questions/release-question", { ...data }, {
    //  Authorization: token
  });
