import { combineReducers } from "redux";
import customizer from "./customizer/";
import auth from "./auth/";
import navbar from "./navbar/Index";
import questions from "./questions/questions";
import adminReducer from "./admin/admin";
import adminTeacherReducer from "./manage-teacher/teacher";
// CBS class board chapters
import CBS from "./manage-cbs/manage-cbs";
import onlineClassReducer from "./online-class/Index";
import {
  getChaptersBySubjectReducer,
  getClassByBoardReducer,
  getConceptsByChapterReducer,
  getSubjectsByClassReducer,
  selectBoardReducer,
  selectForContentReducer,
} from "./boards-sidebar";

const rootReducer = combineReducers({
  customizer: customizer,
  auth: auth,
  navbar: navbar,
  questions: questions,
  admin: adminReducer,
  adminTeacher: adminTeacherReducer,
  CBS: CBS,
  onlineClass: onlineClassReducer,
  selectBoard: selectBoardReducer,
  getClassByBoard: getClassByBoardReducer,
  getSubjectsByClass: getSubjectsByClassReducer,
  getChaptersBySubject: getChaptersBySubjectReducer,
  getConceptsByChapter: getConceptsByChapterReducer,
  selectForContent: selectForContentReducer,
});

export default rootReducer;
