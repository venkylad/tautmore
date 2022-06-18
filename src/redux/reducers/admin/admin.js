const initialState = {
    totaladminuser: [],
    addadmin: [],
    editadmin: [],
    deleteadmin: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOTAL_ADMIN_USER":
        return {
            ...state,
            totaladminuser: action.data,
        };

        case "ADD_ADMIN":
        return {
            ...state,
            addadmin: action?.response?.data ? action.response.data : "error",
        };
        case "CLEAR_ADD_ADMIN":
        return {
            ...state,
            addadmin: "",
        };

        case "EDIT_ADMIN":
        return {
            ...state,
            editadmin: action?.response?.data ? action.response.data : "error",
        };
        case "CLEAR_EDIT_ADMIN":
        return {
            ...state,
            editadmin: "",
        };

        case "DELETE_ADMIN":
        return {
            ...state,
            deleteadmin: action?.response?.data ? action.response.data : "error",
        };
        case "CLEAR_DELETE_ADMIN":
        return {
            ...state,
            deleteadmin: "",
        };
        default:
        return state;
    }
};

export default adminReducer;
