import http from "../../api-fetch/Axios";

//class api's helpers

export const addClass = (data) => http.post("api/class/addClass", { ...data });

export const getClassById = (data) =>
  http.post("api/class/getClassByid", { ...data });

export const editClass = (data) =>
  http.post("api/class/editClass", { ...data });

export const getAllClass = () => http.get("api/class/all-grades");

export const getAllDivision = () => http.get("api/teachers/getAllDivisions");

export const getAllSchool = () =>
  http.get("api/school/getAllSchools?page_no=1");

export const deleteClass = (data) =>
  http.post("api/class/deleteClass", { ...data });

// board api's helpers

export const addBoard = (data) => http.post("api/board/addBoard", { ...data });

export const editBoard = (data) =>
  http.post("api/board/editBoard", { ...data });

export const getAllBoard = () => http.get("api/board/getAllBoards");

export const getBoardByID = (data) =>
  http.post("api/board/getBoardByid", { ...data });

export const deleteBoard = (data) =>
  http.post("api/board/deleteBoard", { ...data });

// subject api's helpers

export const addSubject = (data) =>
  http.post("api/syllabus/addSubject", { ...data });

export const getSubjectByClass = (data) =>
  http.post("api/syllabus/subjects-by-class", { ...data });

export const editSubject = (data) =>
  http.post("api/syllabus/editSubject", { ...data });

export const getSubjectById = (data) =>
  http.post("api/syllabus/subject-by-id", { ...data });

export const getAllSubjects = () => http.get("api/syllabus/all-subjects");

export const deleteSubject = (data) =>
  http.post("api/syllabus/delete-subject", { ...data });
