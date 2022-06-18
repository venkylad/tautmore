import http from "../../api-fetch/Axios";
const token = JSON.parse(localStorage.getItem("tautmore-user"));

export const getActivities = async () => http.get(`/api/students/co-curricular-activities`);

export const getCoCurrTeacher = async (params) => http.get(`/api/cocurricular-online-class/all-teachers`,{params},
  {
    headers: { Authorization: token.accessToken },
  });

export const getStudentsData = async (data) =>http.post(`/api/cocurricular-online-class/list-all-students`, data, {
    headers: { Authorization: token.accessToken },
  });

export const createCoCurrBatch = async (data) => http.post(`/api/cocurricular-online-class/create-batch`, data, {
    headers: { Authorization: token.accessToken },
  })

export const getBatchList = async (data) => http.post(`/api/cocurricular-online-class/list-batches`, data, {
headers: { Authorization: token.accessToken },
})

export const getScheduleBatchDetails = async (params) => http.get(`/api/cocurricular-online-class/schedule-details`, {params}, {
  headers: { Authorization: token.accessToken },
  })

export const getTeacherAvailableSlots = async (params) => http.get(`/api/cocurricular-online-class/teacher-slots`, {params}, {
  headers: { Authorization: token.accessToken },
  })

export const addSchedule = async (data) => http.post(`/api/cocurricular-online-class/add-schedule`, data, {
  headers: { Authorization: token.accessToken },
  })

  export const updateSchedule = async (data) => http.post(`/api/cocurricular-online-class/update-schedule`, data, {
    headers: { Authorization: token.accessToken },
    })

export const deleteBatch = async (data) => http.post(`/api/cocurricular-online-class/delete-batch`, data, {
  headers: { Authorization: token.accessToken },
  })
  