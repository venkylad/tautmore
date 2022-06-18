const initialState = {
  totalQuestion: [],
  allQuestionData: [],
  questions: [],
  questionDetails: [],
  editQuestion: [],
  subject: [],
  subconcept: [],
  deleteQuestion: [],
  questionDifficulties: {},
  allGrade: [],
  allSubjects: [],
  chapters: [],
  concepts: [],
  allSubconcepts: [],
  gradeBySubconcept: [],
  chapterAndConcept: [],
  isAddLoading: false,
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_QUESTION":
      return {
        ...state,
        questions: action?.response?.data ? action.response.data : "error",
      };
    case "GET_QUESTION_DETAILS":
      return {
        ...state,
        questionDetails: action.data,
      };
    case "EDIT_QUESTION":
      return {
        ...state,
        editQuestion: action?.response?.data ? action.response.data : "error",
      };
    case "GET_UNIQUE_SUBJECTS":
      return {
        ...state,
        subject: action.data.response,
      };
    case "SET_QUESTION_DIFFICULTY":
      return {
        ...state,
        questionDifficulties: action?.response?.data,
      };
    case "GET_SUBCONCEPT_BY_SUBJECT":
      return {
        ...state,
        subconcept: action.payload,
      };

    case "DELETE_QUESTION":
      return {
        ...state,
        deleteQuestion: action?.response?.data
          ? action.response?.data
          : "error",
      };

    case "CLEAR_DELETE_QUESTION":
      return {
        ...state,
        deleteQuestion: "",
      };
    case "TOTAL_QUESTION":
      return {
        ...state,
        totalQuestion: action?.data,
      };
    case "GET_ALL_GRADES":
      return {
        ...state,
        allGrade: action.response?.data?.data,
      };
    case "GET_SUBJECTS_BY_CLASS":
      return {
        ...state,
        allSubjects: action.response?.data?.data,
      };
    case "GET_CHAPTER_BY_SUBJECT":
      return {
        ...state,
        chapters: action.response?.data?.data,
      };
    case "GET_CONCEPT_BY_CHAPTER":
      return {
        ...state,
        concepts: action.response?.data?.data,
      };
    case "GET_SUBCONCEPT_BY_CONCEPT":
      return {
        ...state,
        allSubconcepts: action.response?.data?.data,
      };
    case "GET_GRADES_BY_SUBCONCEPT":
      return {
        ...state,
        gradeBySubconcept: action.response?.data?.response,
      };
    case "GET_CHAPTER_AND_CONCEPT":
      return {
        ...state,
        chapterAndConcept: action.payload,
      };
    //new
    case "GET_ALL_GRADES":
      return {
        ...state,
        allGrade: action.response?.data?.data,
      };
    case "GET_SUBJECTS_BY_CLASS":
      return {
        ...state,
        allSubjects: action.response?.data?.data,
      };
    case "SET_ADD_LOADING":
      return {
        ...state,
        isAddLoading: action.payload,
      };
    default:
      return state;
  }
};

export default questionReducer;
