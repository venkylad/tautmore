const initialState = {
  board: {},
  class: {},
  subject: {},
};

const manageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BOARD_BY_ID":
      return {
        ...state,
        board: action.payload,
      };
    case "SET_CLASS_BY_ID":
      return {
        ...state,
        class: action.payload,
      };
    case "SET_SUBJECT_BY_ID":
      return {
        ...state,
        subject: action.payload,
      };
    default:
      return state;
  }
};

export default manageReducer;
