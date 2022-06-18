import http from "../../api-fetch/Axios";

// listing Admin page
export const getAllAdminsData = (data) =>
  http.post(`/api/admin/getAllAdmins`, data);

// all admin list
export const getAdminList = () => http.get(`/api/admin/admin-list`);

// add admin
export const addAdmin = (data) => http.post(`/api/admin/addAdmins`, data);

// edit admin
export const editAdmin = (data) => http.post(`/api/admin/editAdmin`, data);

// delete admin
export const deleteStaff = (id) => http.post("/api/admin/deleteAdmin", { id });

// search admin
export const searchTautmoreStaffs = (searchParam) =>
  http.get(`/api/admin/searchForAdmin?name=${searchParam}`);

// get admin by id
export const getAdminbyId = (id) =>
  http.post("api/admin/getAdminDetail", { id });

export const setAdminStatus = (id, status) =>
  http.post("/api/admin/activate", {
    adminId: id,
    active: status,
  });
