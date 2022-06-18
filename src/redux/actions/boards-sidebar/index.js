import axios from "axios";
import { clientUrl } from "../../../views/tautmore-components/services/api-fetch/Axios";

export const selectBoardAction = (data) => {
  return {
    type: "SELECT_BOARD",
    payload: data,
  };
};

export const getClassByBoardAction = (board_id) => async (dispatch) => {
  try {
    if (board_id) {
      const { data } = await axios.post(
        `${clientUrl}/api/class/getClassByBoard`,
        {
          board_id,
        }
      );
      dispatch({ type: "GET_CLASS_BY_BOARD", payload: data?.class });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSubjectsByClassAction = (classId) => async (dispatch) => {
  try {
    if (classId) {
      const { data } = await axios.post(
        `${clientUrl}/api/syllabus/subjects-by-class`,
        {
          classId,
        }
      );
      dispatch({ type: "GET_SUBJECT_BY_CLASS", payload: data?.data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getChaptersBySubjectAction = (subject_id) => async (dispatch) => {
  try {
    if (subject_id) {
      const { data } = await axios.post(
        `${clientUrl}/api/chapters/getChaptersBySubject`,
        {
          subject_id,
        }
      );
      dispatch({
        type: "GET_CHAPTERS_BY_SUBJECT",
        payload: data?.chapters,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getConceptByChapterAction = (chapter_id) => async (dispatch) => {
  try {
    if (chapter_id) {
      const { data } = await axios.post(
        `${clientUrl}/api/concepts/getConceptsByChapter`,
        {
          chapter_id,
        }
      );
      dispatch({ type: "GET_CONCEPTS_BY_CHAPTER", payload: data?.concepts });
    }
  } catch (error) {
    console.log(error);
  }
};
