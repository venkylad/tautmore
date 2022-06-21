const initState = {
  name: "CBSE",
  active: true,
  description: "Board description",
  logo: null,
  type: "board",
  cutOffPercentage: 60,
};

export const selectBoardReducer = (state = initState, action) => {
  switch (action.type) {
    case "SELECT_BOARD":
      return action.payload;
    default:
      return state;
  }
};

export const selectForContentReducer = (
  state = {
    subConcept: "",
    subject: "",
  },
  action
) => {
  switch (action.type) {
    case "SELECT_FOR_CONTENT":
      return action.payload;
    default:
      return state;
  }
};

export const getClassByBoardReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_CLASS_BY_BOARD":
      return action.payload;
    default:
      return state;
  }
};

export const getSubjectsByClassReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_SUBJECT_BY_CLASS":
      return action.payload;
    default:
      return state;
  }
};

export const getChaptersBySubjectReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_CHAPTERS_BY_SUBJECT":
      return action.payload;
    default:
      return state;
  }
};

export const getConceptsByChapterReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_CONCEPTS_BY_CHAPTER":
      return action.payload;
    default:
      return state;
  }
};
