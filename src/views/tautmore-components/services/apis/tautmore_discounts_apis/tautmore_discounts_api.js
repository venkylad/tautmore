import http from "../../api-fetch/Axios";

const token = JSON.parse(localStorage.getItem("tautmore-user"));

export const getDiscountList = async (params) =>
  http.get(`/api/discount/discounts`, {params},
  {
    headers: { Authorization: token.accessToken },
  });

export const getDiscountDetail = async (params) =>
  http.get(`/api/discount/get-discount-details`, {params},
  {
    headers: { Authorization: token.accessToken },
  })

export const addDiscount = async (data) =>
  http.post(`/api/discount/add-discount`, data)

export const deleteDiscount = async (data) =>
  http.delete(`/api/discount/remove-discount/` + data)

export const editDiscount = async (id,data) =>
  http.put(`/api/discount/update-record/` + id, data)
