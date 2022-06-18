import http from "../../api-fetch/Axios";

export const userLogin = (data) => http.post("/api/admin/adminLogin", data);
