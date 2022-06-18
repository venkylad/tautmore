import * as loginAction from "../../actions/auth/loginActions";

const user = JSON.parse(localStorage.getItem("tautmore-user"));

const initialState = {
  userRole: user ? user?.role : "",
  userData: user ? user : {},
};

export const login = (state = initialState, action) => {
  switch (action.type) {
    case loginAction.SET_LOGIN: {
      return {
        ...state,
        userRole: action.payload?.role,
        userData: action.payload,
      };
    }
    case "LOGIN_WITH_EMAIL": {
      return { ...state, values: action.payload };
    }
    case "LOGIN_WITH_FB": {
      return { ...state, values: action.payload };
    }
    case "LOGIN_WITH_TWITTER": {
      return { ...state, values: action.payload };
    }
    case "LOGIN_WITH_GOOGLE": {
      return { ...state, values: action.payload };
    }
    case "LOGIN_WITH_GITHUB": {
      return { ...state, values: action.payload };
    }
    case "LOGIN_WITH_JWT": {
      return { ...state, values: action.payload };
    }
    case "LOGOUT_WITH_JWT": {
      return { ...state, values: action.payload };
    }
    case "LOGOUT_WITH_FIREBASE": {
      return { ...state, values: action.payload };
    }
    case "CHANGE_ROLE": {
      return { ...state, userRole: action.userRole };
    }
    default: {
      return state;
    }
  }
};
