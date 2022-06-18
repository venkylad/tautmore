//ACTIONS

import {
  getAllCountries,
  getAllSubjects,
  getAllStates,
  getAllUniversities,
  getAllQualifications,
  getAllTimeSlots,
  getAllGrades,
  registerTeacher,  
  getAllCocurricular,    
  getAllTeachers,
  getTeacherById,
  approveTeacher,
  declineTeacher,
  deleteTeacherById,              
  updateTeacherbyId,
  getTeacherLeaves,
  cancelTeacherLeave,
  approveLeave,
  getSubjectsByClass,
  getMyClasses,
  verifyEmailTeacher,
  sendOtpTeacher
  
} from "../../../views/tautmore-components/services/apis/manage-teacher/manage-teacher-api";

export const verifyEmailTeacherAction = (data) => {                  
  return (dispatch) => {
    verifyEmailTeacher(data).then((response) => {
      dispatch({ type: "VERIFY_EMAIL_TEACHER", payload: response.data });
    });
  };
};

export const sendOtpTeacherAction = (data) => {                  
  return (dispatch) => {
    sendOtpTeacher(data).then((response) => {
      dispatch({ type: "SEND_OTP_TEACHER", payload: response.data });
    });
  };
};


export const getTeacherLeavesAction = (data) => {                  
  return (dispatch) => {
    getTeacherLeaves(data).then((response) => {
      dispatch({ type: "GET_TEACHER_LEAVES", payload: response.data });
    });
  };
};

export const cancelTeacherLeaveAction = (data) => {  
  return (dispatch) => {
    cancelTeacherLeave(data).then((response) => {
      dispatch({ type: "CANCEL_TEACHER_LEAVE", payload: response.data });  
    });
  };
};

export const approveTeacherLeaveAction = (data) => {
  return (dispatch) => {
    approveLeave(data).then((response) => {
      dispatch({ type: "APPROVE_TEACHER_LEAVE", payload: response.data });
    });
  };
};

export const getAllCountriesAction = () => {
  return (dispatch) => {
    getAllCountries().then((response) => {
      dispatch({ type: "SET_COUNTRIES", payload: response.data });
    });
  };
};

export const getAllSubjectsAction = () => {
  return (dispatch) => {
    getAllSubjects().then((response) => {
      dispatch({ type: "SET_SUBJECTS", payload: response.data });
    });
  };
};

export const getAllStatesAction = (code) => {
  return (dispatch) => {
    getAllStates(code).then((response) => {
      dispatch({ type: "SET_STATES", payload: response.data });
    });
  };
};

export const getAllUniversitiesAction = () => {
  return (dispatch) => {
    getAllUniversities().then((response) => {
      dispatch({ type: "SET_UNIVERSITIES", payload: response.data });
    });
  };
};

export const getAllQualificationsAction = () => {
  return (dispatch) => {
    getAllQualifications().then((response) => {
      dispatch({ type: "SET_QUALIFICAITON", payload: response.data });
    });
  };
};

export const getAllTimeSlotsAction = () => {
  return (dispatch) => {
    getAllTimeSlots().then((response) => {
      dispatch({ type: "SET_TIMESLOTS", payload: response.data });
    });
  };
};

export const getAllGradesAction = () => {
  return (dispatch) => {
    getAllGrades().then((response) => {
      dispatch({ type: "SET_GRADES", payload: response.data });
    });
  };
};

export const getAllCocurricularAction = () => {
  return (dispatch) => {
    getAllCocurricular().then((response) => {
      dispatch({ type: "SET_COCURRICULAR", payload: response.data });
    });
  };
};

export const registerTeacherAction = (data) => {
  return (dispatch) => {
    registerTeacher(data).then((response) => {
      dispatch({ type: "REGISTER_TEACHER", payload: response.data });
    });
  };
};

export const getAllTeacherAction = (data) => {
  console.log(data, 'data from action');
  return (dispatch) => {
    getAllTeachers(data).then((response) => {
      dispatch({ type: "GET_ALL_TEACHERS", payload: response.data });
    });
  };
};

export const getTeacherByIdAction = (id) => {
  return (dispatch) => {
    getTeacherById(id).then((response) => {
      dispatch({ type: "GET_TEACHER_BY_ID", payload: response.data });
    });
  };
};

export const deleteTeacherByIdAction = (id) => {
  return (dispatch) => {
    deleteTeacherById(id).then((response) => {
      dispatch({ type: "DELETE_TEACHER_BY_ID", payload: response.data });
    });
  };
};

export const approveTeacherAction = (id) => {
  return (dispatch) => {
    approveTeacher(id).then((response) => {
      dispatch({ type: "APPROVE_ON_BOARD", payload: response.data });
    });
  };
};

export const declineTeacherAction = (id) => {
  return (dispatch) => {
    declineTeacher(id).then((response) => {
      dispatch({ type: "DECLINE_ON_BOARD", payload: response.data });
    });
  };
};

export const updateTeacherAction = (id) => {
  return (dispatch) => {
    updateTeacherbyId(id).then((response) => {
      dispatch({ type: "UPDATE_TEACHER", payload: response.data });
    });
  };
};

export const getSubjectsByClassAction = (data) => {
  return (dispatch) => {
    getSubjectsByClass(data).then((response) => {
      dispatch({ type: "GET_SUBJECTS_BY_CLASS", payload: response.data });
    });
  };
};

export const getTeacherClassesAction = (data) => {
  return (dispatch) => {
    getMyClasses(data).then((response) => {
      dispatch({ type: "GET_TEACHER_CLASSES", payload: response.data });
    });
  };
};