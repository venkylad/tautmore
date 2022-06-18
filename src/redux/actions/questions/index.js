import http from "../../../views/tautmore-components/services/api-fetch/Axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export const addQuestion = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_ADD_LOADING", payload: true });
    http
      .post(
        "api/questions/add-question",
        {
          ...data,
        },
        { ...config }
      )
      .then((response) => {
        dispatch({ type: "ADD_QUESTION", response });
        dispatch({ type: "SET_ADD_LOADING", payload: false });
      })
      .catch((error) => {
        dispatch({ type: "SET_ADD_LOADING", payload: false });
        dispatch({ type: "ADD_QUESTION", error });
      });
  };
};

export const getQuestionDetails = (data) => {
  return (dispatch) => dispatch({ type: "GET_QUESTION_DETAILS", data });
};

export const editQuestion = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_ADD_LOADING", payload: true });
    http
      .post(
        "api/questions/edit-question",
        {
          ...value,
        },
        { ...config }
      )
      .then((response) => {
        dispatch({ type: "EDIT_QUESTION", response });
        dispatch({ type: "SET_ADD_LOADING", payload: true });
      })
      .catch((error) => {
        dispatch({ type: "SET_ADD_LOADING", payload: false });
        dispatch({ type: "EDIT_QUESTION", error });
      });
  };
};

export const getUniqueSubjects = () => {
  return async (dispatch) => {
    http.get("api/syllabus/unique-subjects", { ...config }).then((response) => {
      dispatch({ type: "GET_UNIQUE_SUBJECTS", data: response.data });
    });
  };
};

export const getSubconceptBySubject = (data) => {
  return (dispatch) => {
    http
      .post(
        "api/sub-concepts/sub-concepts-by-subject",
        {
          ...data,
        },
        { ...config }
      )
      .then((response) => {
        dispatch({
          type: "GET_SUBCONCEPT_BY_SUBJECT",
          payload: response.data.response,
        });
      })
      .catch((error) => {
        if (error) {
          dispatch({ type: "GET_SUBCONCEPT_BY_SUBJECT", payload: [] });
        }
      });
  };
};

export const deleteQuestionbyId = (id) => {
  return (dispatch) => {
    console.log(id, "id");
    http
      .post(
        "api/questions/delete-question",
        {
          questionIds: id,
        },
        { ...config }
      )
      .then((response) => {
        dispatch({ type: "DELETE_QUESTION", response });
      })
      .catch((error) => {
        dispatch({ type: "DELETE_QUESTION", error });
      });
  };
};

export const loadQuestionDifficulty = () => {
  return (dispatch) => {
    http
      .get("api/questions/difficulty-levels", { ...config })
      .then((response) => {
        dispatch({ type: "SET_QUESTION_DIFFICULTY", response });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const totalQuestion = (data) => {
  return (dispatch) => dispatch({ type: "TOTAL_QUESTION", data });
};

export const getAllGrades = () => {
  return (dispatch) => {
    http
      .get("api/class/all-grades", { ...config })
      .then((response) => {
        dispatch({ type: "GET_ALL_GRADES", response });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getGradessBySubconcept = (data) => {
  return (dispatch) => {
    http
      .post(
        "api/sub-concepts/grades-by-subconcept",
        {
          ...data,
        },
        { ...config }
      )
      .then((response) => {
        dispatch({ type: "GET_GRADES_BY_SUBCONCEPT", response });
      })
      .catch((error) => {
        dispatch({ type: "GET_GRADES_BY_SUBCONCEPT", error });
      });
  };
};

export const getSubjectsByClass = (data) => {
  return (dispatch) => {
    http
      .post(
        "api/syllabus/subjects-by-class",
        {
          ...data,
        },
        { ...config }
      )
      .then((response) => {
        dispatch({ type: "GET_SUBJECTS_BY_CLASS", response });
      })
      .catch((error) => {
        dispatch({ type: "GET_SUBJECTS_BY_CLASS", error });
      });
  };
};

export const getChapterBySubjct = (data) => {
  return (dispatch) => {
    http
      .post(
        "api/chapters/chapters-by-subject",
        {
          ...data,
        },
        { ...config }
      )
      .then((response) => {
        dispatch({ type: "GET_CHAPTER_BY_SUBJECT", response });
      })
      .catch((error) => {
        dispatch({ type: "GET_CHAPTER_BY_SUBJECT", error });
      });
  };
};

export const getConceptsByChapter = (data) => {
  return (dispatch) => {
    http
      .post(
        "api/concepts/concepts-by-chapter",
        {
          ...data,
        },
        { ...config }
      )
      .then((response) => {
        dispatch({ type: "GET_CONCEPT_BY_CHAPTER", response });
      })
      .catch((error) => {
        dispatch({ type: "GET_CONCEPT_BY_CHAPTER", error });
      });
  };
};

export const getSubconceptsByConcept = (data) => {
  return (dispatch) => {
    http
      .post(
        "api/sub-concepts/subconcepts-by-concept",
        {
          ...data,
        },
        { ...config }
      )
      .then((response) => {
        dispatch({ type: "GET_SUBCONCEPT_BY_CONCEPT", response });
      })
      .catch((error) => {
        dispatch({ type: "GET_SUBCONCEPT_BY_CONCEPT", error });
      });
  };
};

export const getChaptersAndConcepts = (data, prevData) => {
  return (dispatch) => {
    http
      .post(
        "api/questions/get-chapters-and-concepts",
        {
          subjectId: data?.subjectId,
          subConceptId: data?.subConceptId,
        },
        { ...config }
      )
      .then((response) => {
        const filterConcept = prevData?.filter(
          (item) => item?.data?.id !== data?.id
        );
        const payload = [
          ...filterConcept,
          {
            res: response?.data?.data,
            data: data,
          },
        ];
        dispatch({ type: "GET_CHAPTER_AND_CONCEPT", payload });
      });
  };
};
