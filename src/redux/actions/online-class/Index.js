import http from "../../../views/tautmore-components/services/api-fetch/Axios";

const config = {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
};

export const scheduleDetails = (id) => {
  return async (dispatch) => {
    dispatch({ type: "SET_ADD_LOADING", payload: true });
    http.get(`api/online-class/schedule-details?batch=${id}`, { ...config }).then((response) => {
      dispatch({ type: "SCHEDULE_DETAILS", data: response.data });
      dispatch({ type: "SET_ADD_LOADING", payload: false });
    });
  };
};

export const teacherSlots = (id) => {
    return async (dispatch) => {
      http.get(`api/online-class/teacher-slots?id=${id}`, { ...config }).then((response) => {
        dispatch({ type: "TEACHER_SLOTS", data: response.data });
      });
    };
};

export const deleteBatch = (data) => {
  return (dispatch) => {
    http
      .post(
        "api/online-class/delete-batch",
        {
          ...data,
        },
        { ...config }
      )
      .then((response) => {
        dispatch({ type: "DELETE_BATCH", response });
      })
      .catch((error) => {
        dispatch({ type: "DELETE_BATCH", error });
      });
  };
};

export const addSchedule = (data) => {
  return (dispatch) => {
    http
      .post(
        "api/online-class/add-schedule",
        {
          ...data,
        },
        { ...config }
      )
      .then((response) => {
        dispatch({ type: "ADD_SCHEDULE", response });
      })
      .catch((error) => {
        dispatch({ type: "ADD_SCHEDULE", error });
      });
  };
};

export const updateSchedule = (data) => {
  return (dispatch) => {
    http
      .post(
        "api/online-class/update-schedule",
        {
          ...data,
        },
        { ...config }
      )
      .then((response) => {
        dispatch({ type: "UPDATE_SCHEDULE", response });
      })
      .catch((error) => {
        console.log(error.response.data)
        dispatch({ type: "ERROR_SCHEDULE",error:error.response.data });
      });
  };
};

export const createBatch = (data) => {
  return (dispatch) => {
    http
      .post(
        "api/online-class/create-batch",
        {
          ...data,
        },
        { ...config }
      )
      .then((response) => {
        dispatch({ type: "CREATE_BATCH", response });
      })
      .catch((error) => {
        dispatch({ type: "CREATE_BATCH", error });
      });
  };
};

export const allTeachers = (data) => {
  return async (dispatch) => {
    http.get(`api/online-class/all-teachers?grade=${data.grade}&subject=${data.subject}&timezone=${data.timezone}`, { ...config }).then((response) => {
      dispatch({ type: "ALL_TEACHERS", data: response.data });
    });
  };
};

export const timezoneList = () => {
  return async (dispatch) => {
    http.get(`api/online-class/timezones`, { ...config }).then((response) => {
      dispatch({ type: "TIMEZONE_LIST", data: response.data });
    });
  };
};