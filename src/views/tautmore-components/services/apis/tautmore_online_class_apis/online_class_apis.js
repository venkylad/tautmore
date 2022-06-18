import { createClient } from "../../api-fetch/Axios";
const http = createClient()

export const getListAllBatches = (data) =>
  http.post("/api/online-class/list-batches", { ...data }, {
});

export const getListAllStudents = (data) =>
  http.post("/api/online-class/list-all-students", { ...data }, {
});