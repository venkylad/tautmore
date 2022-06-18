import http from "../../api-fetch/Axios";

export const addRoles = (data) => http.post(`/api/admin/addRole`, data);

export const getAllRoles = async () =>  http.get(`/api/admin/getAllRoles`);

export const deleteRole = (data)=> http.post(`/api/admin/delete-role`,data);

export const editRoles = (data) => http.post(`/api/admin/edit-role`,data);

export const activateRoles = (data) => http.post(`/api/admin/activate-role`,data)

export const getRoleInfo = (data) => http.post(`/api/admin/role-info`,data);