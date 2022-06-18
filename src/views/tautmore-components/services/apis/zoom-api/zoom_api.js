import http from "../../api-fetch/Axios";

export const addZoomUsers = async (data) => http.post(`/api/admin/zoom/create-user`, data);

export const getUsersList = async (data) => http.post(`/api/admin/zoom/list-all-zoom-users`, data);

export const getUnassignedTeacher = async (params) => http.get(`/api/admin/zoom/un-assigned-teachers`, { params } );

export const mapZoomToTeacher = async (data) => http.post(`/api/admin/zoom/map-zoom-user-to-teacher`, data);

export const unAssignTeacher = async (data) => http.post(`/api/admin/zoom/unassign-zoom-user-from-teacher`, data);