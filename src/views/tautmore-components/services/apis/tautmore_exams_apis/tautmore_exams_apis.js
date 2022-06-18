import http from "../../api-fetch/Axios";
const token = JSON.parse(localStorage.getItem("tautmore-user"));

export const getAllExamsList = async (data) => http.post(`/api/exams/exam-listing`, data, {
    headers: { Authorization: token.accessToken },
  });

export const getAllClass = async () => http.get(`/api/class/all-grades`);

export const getAllSubject = async (data) => http.post(`/api/syllabus/subjects-by-class`, data);

export const getExamInfo = async (data) => http.post(`/api/exams/exam-info`, data, {
    headers: { Authorization: token.accessToken },
  });

export const updateExamStatus = async (data) => http.post(`/api/exams/update-exam-status`, data, {
    headers: { Authorization: token.accessToken },
  });

export const addExam = async (data) => http.post(`/api/exams/add-exam`, data, {
    headers: { Authorization: token.accessToken },
  });

export const editExam = async (data) => http.post(`/api/exams/edit-exam`, data, {
    headers: { Authorization: token.accessToken },
  });

export const getExamQuestions = async (data) => http.post(`/api/exams/list-exam-questions`, data, {
    headers: { Authorization: token.accessToken },
  });

export const getChapterData = async (data) => http.post(`/api/chapters/getChaptersBySubject`,data);

export const getAddedByData = async () => http.get(`/api/admin/all-data-operator`);

export const addExamQuestions = async (data) => http.post(`/api/exams/update-questions-to-exam`, data, {
    headers: { Authorization: token.accessToken },
  });

export const getQuestionsInExam = async (data) => http.post(`/api/exams/questions-in-exam`,data, {
    headers: { Authorization: token.accessToken },
  });

export const getTimeZone = async () => http.get(`/api/online-class/timezones`);

export const getExamTypes = async (params) => http.get(`/api/exams/examtype-by-grade-and-subject`, {params})

export const getExistingQuestions = async (data) =>http.post(`/api/exams/existing-questions`, data);

export const getOlympiadExamsList = async (data) => http.post(`/api/olympiad-exams/exam-listing`, data , {
  headers: { Authorization: token.accessToken },
});

export const getOlympiadExamInfo = async (params) => http.post(`/api/olympiad-exams/exam-info`, params, {
  headers: { Authorization: token.accessToken },
})

export const getQuestionInOlymExam = async (data) => http.post(`/api/olympiad-exams/questions-in-exam`, data, {
  headers: { Authorization: token.accessToken },
})

export const getOlympiadExistingQue = async (data) => http.post(`/api/olympiad-exams/existing-questions`, data, {
  headers: { Authorization: token.accessToken },
})

export const getOlympiadExamQuestions = async (data) => http.post(`/api/olympiad-exams/list-exam-questions`, data, {
  headers: { Authorization: token.accessToken },
})

export const updateOlympiadQueToExams = async (data) => http.post(`/api/olympiad-exams/update-questions-to-exam`, data, {
  headers: { Authorization: token.accessToken },
})

export const updateOlympiadExamStatus = async (data) => http.post(`/api/olympiad-exams/update-exam-status`, data, {
  headers: { Authorization: token.accessToken },
})

export const getOlympiadExamTypes = async (params) => http.get(`/api/olympiad-exams/examtype-by-grade-and-subject`, {params}, {
  headers: { Authorization: token.accessToken },
})

export const addOlympiadExams = async (data) => http.post(`/api/olympiad-exams/add-exam`, data, {
  headers: { Authorization: token.accessToken },
})

export const editOlympiadExams = async (data) => http.post(`/api/olympiad-exams/edit-exam`, data, {
  headers: { Authorization: token.accessToken },
})