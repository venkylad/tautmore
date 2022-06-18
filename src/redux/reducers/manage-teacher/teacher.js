//REDUCERS

const initialState = {
  countries: [],
  states: [],
  subjects: [],
  qualifications: [],
  universities: [],
  timeSlots: [],
  grades: [],
  cocurricular: [],
  allTeachers: [],
  selectedTeacher: [],
  approveTeacher: [],
  declineTeacher: [],
  deletedTeacher: [],
  updateTeacher: [],
  teacherLeaves: [],
  cancelledLeaves:[],
  approvedLeaves:[],
  subjectsByClass:[],
  teacherClasses:[],
  verifyEmailTeacher: [],
  sendOtpTeacher: [],
  registerTeacher: []

};

const adminTeacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
      };
      
    case "SET_STATES":
      return {
        ...state,
        states: action.payload,
      };
    case "SET_SUBJECTS":
      return {
        ...state,
        subjects: action.payload,
      };

      case "REGISTER_TEACHER":
        return {
          ...state,
          registerTeacher: action.payload,
        };
    case "SET_UNIVERSITIES":
      return {
        ...state,
        universities: action.payload,
      };
    case "SET_QUALIFICAITON":
      return {
        ...state,
        qualifications: action.payload,
      };

    case "SET_TIMESLOTS":
      return {
        ...state,
        timeSlots: action.payload,
      };

    case "SET_GRADES":
      return {
        ...state,
        grades: action.payload,
      };

    case "SET_COCURRICULAR":
      return {
        ...state,
        cocurricular: action.payload,
      };

    case "GET_ALL_TEACHERS":
      return {
        ...state,
        allTeachers: action.payload,
      };

    case "GET_TEACHER_BY_ID":
      return {
        ...state,
        selectedTeacher: action.payload,
      };
    case "DELETE_TEACHER_BY_ID":
      return {
        ...state,
        deletedTeacher: action.payload,
      };

    case "APPROVE_ON_BOARD":
      return {
        ...state,
        approveTeacher: action.payload,
      };

    case "DECLINE_ON_BOARD":
      return {
        ...state,
        declineTeacher: action.payload,
      };

    case "UPDATE_TEACHER_BY_ID":
      return {
        ...state,
        updateTeacherAction: action.payload,
      };

      case "GET_TEACHER_LEAVES":
      return {
        ...state,
        teacherLeaves: action.payload,
      };
      case "CANCEL_TEACHER_LEAVE":
        return {
          ...state,
          cancelledLeaves: action.payload,
        };

        case "APPROVE_TEACHER_LEAVE":
          return {
            ...state,
            approvedLeaves: action.payload,
          };
          case "GET_SUBJECTS_BY_CLASS":
            return {
              ...state,
              subjectsByClass: action.payload,
            };

            case "GET_TEACHER_CLASSES":
              return {
                ...state,
                teacherClasses: action.payload,
              };

              case "VERIFY_EMAIL_TEACHER":
              return {
                ...state,
                verifyEmailTeacher: action.payload,
              };

              case "SEND_OTP_TEACHER":
              return {
                ...state,
                sendOtpTeacher: action.payload,
              };

    default:
      return state;
  }
};

export default adminTeacherReducer;
