export const SET_LOGIN = "SET_LOGIN";

export const changeRole = (role) => {
  return (dispatch) => dispatch({ type: "CHANGE_ROLE", userRole: role });
};

export const setLogin = (data) => ({
  type: SET_LOGIN,
  payload: data,
});
