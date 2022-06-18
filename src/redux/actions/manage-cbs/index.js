import {
  getSubjectById,
  getBoardByID,
  getClassById,
} from "../../../views/tautmore-components/services/apis/manage-class-board-subject/manage-api";

export const getBoardByidAction = (id) => {
  return (dispatch) => {
    getBoardByID(id).then((response) => {
      dispatch({ type: "SET_BOARD_BY_ID", payload: response.data?.result });
    });
  };
};

export const getSubjectByidAction = (id) => {
  return (dispatch) => {
    getSubjectById(id).then((response) => {
      console.log(response, "s res");
      dispatch({ type: "SET_SUBJECT_BY_ID", payload: response.data?.data });
    });
  };
};

export const getClassByidAction = (id) => {
  return (dispatch) => {
    getClassById(id).then((response) => {
      dispatch({ type: "SET_CLASS_BY_ID", payload: response.data?.class });
    });
  };
};



