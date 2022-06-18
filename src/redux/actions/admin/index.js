import http from "../../../views/tautmore-components/services/api-fetch/Axios";
const config = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export const totalAdminUser = (data) => {
    return (dispatch) => dispatch({ type: "TOTAL_ADMIN_USER", data });
};

export const addAdmin = (data) => {
    return (dispatch) => {
     http.post("api/admin/addAdmins",
          {
            ...data,
          }
        )
        .then((response) => {
          dispatch({ type: "ADD_ADMIN", response });
        })
        .catch((error) => {
          dispatch({ type: "ADD_ADMIN", error });
        });
    };
};


export const editAdmin = (data) => {
    return (dispatch) => {
      http.post("api/admin/editAdmin",
          {
            ...data,
          },
          { ...config }
        )
        .then((response) => {
          dispatch({ type: "EDIT_ADMIN", response });
        })
        .catch((error) => {
          dispatch({ type: "EDIT_ADMIN", error });
        });
    };
};

export const deleteAdmin = (data) => {
    return (dispatch) => {
     http.post("api/admin/deleteAdmin",
          {
            id: data,
          }
        )
        .then((response) => {
          dispatch({ type: "DELETE_ADMIN", response });
        })
        .catch((error) => {
          dispatch({ type: "DELETE_ADMIN", error });
        });
    };
};
  