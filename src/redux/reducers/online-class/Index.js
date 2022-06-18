const initialState = {
    scheduleDeatils: [],
    teacherSlots: [],
    deleteBatch: [],
    addSchedule: [],
    updateSchedule: [],
    createBatch: [],
    allTeachers: [],
    timezoneList: [],
    isAddLoading: false,
}

const onlineClassReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SCHEDULE_DETAILS":
            return {
                ...state,
                scheduleDeatils: action?.data,
            };
        case "TEACHER_SLOTS":
            return {
                ...state,
                teacherSlots: action?.data,
            };
        case "DELETE_BATCH":
            return {
                ...state,
                deleteBatch: action?.response?.data,
            };
        case "ADD_SCHEDULE":
            return {
                ...state,
                addSchedule: action?.response?.data,
            };
        case "UPDATE_SCHEDULE":
            return {
                ...state,
                updateSchedule: action?.response?.data
                
            };
        case "ERROR_SCHEDULE":
            return {
                ...state,
                updateSchedule: action?.error
                
            };
        case "CREATE_BATCH":
            return {
                ...state,
                createBatch: action?.response?.data,
            };
        case "ALL_TEACHERS":
            return {
                ...state,
                allTeachers: action?.data,
            };
        case "TIMEZONE_LIST":
            return {
                ...state,
                timezoneList: action?.data,
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
export default onlineClassReducer;