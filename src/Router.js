import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { Redirect } from "react-router-dom";

// Route-based code splitting
const Home = lazy(() => import("./views/pages/Home"));

const Page2 = lazy(() => import("./views/pages/Page2"));

const Dashboard = lazy(() =>
  import("./views/tautmore-components/main-pages/dashboard/dashboard")
);

const login = lazy(() =>
  import("./views/tautmore-components/authentication/login/Login")
);

const AdminRolesListView = lazy(() =>
  import(
    "./views/tautmore-components/main-pages/admin-roles/data-list/ListView"
  )
);

//New Routes

const ManageSubjectListView = lazy(() =>
  import("./views/tautmore-components/main-pages/manage/ManageSubjectView.js")
);

const ManageBoardView = lazy(() =>
  import("./views/tautmore-components/main-pages/manage/ManageBoardView")
);

const ManageClassView = lazy(() =>
  import("./views/tautmore-components/main-pages/manage/ManageClassView")
);

const QuestionsListView = lazy(() =>
  import(
    "./views/tautmore-components/main-pages/question-list/data-list/ListView"
  )
);

const AdminDetailsPage = lazy(() =>
  import(
    "./views/tautmore-components/sections/manage-admin/Manage-Admin-Details"
  )
);

const ExamAndTestsAddQuest = lazy(() =>
  import("./views/tautmore-components/sections/exam-and-tests-detail/ListView")
);

const ExamAndTestsDetail = lazy(() =>
  import(
    "./views/tautmore-components/sections/exam-and-tests-detail/Exam-And-Test-Details"
  )
);

const QuestionDetailsPage = lazy(() =>
  import(
    "./views/tautmore-components/sections/question-details/Question-Details"
  )
);

const AddQuestion = lazy(() =>
  import("./views/tautmore-components/forms/question-form/QuestionsAddEditForm")
);

const Manageimage = lazy(() =>
  import("./views/tautmore-components/sections/manage-images/Manageimage")
);

const Teacher = lazy(() =>
  import("./views/tautmore-components/main-pages/teacher")
);
const TeacherDetails = lazy(() =>
  import("./views/tautmore-components/main-pages/teacher/teacherDetails")
);
const TeacherApproval = lazy(() =>
  import("./views/tautmore-components/main-pages/teacher/approval")
);

const AdminUsers = lazy(() =>
  import("./views/tautmore-components/main-pages/subuser/adminUsersList")
);
const UserType = lazy(() =>
  import("./views/tautmore-components/main-pages/subuser/superAdmin")
);

const Student = lazy(() =>
  import("./views/tautmore-components/main-pages/student/studentListing")
);

const StudentDetails = lazy(() =>
  import("./views/tautmore-components/main-pages/student/basicInfoAddEdit")
);
const PaymentMain = lazy(() =>
  import("./views/tautmore-components/main-pages/payments/ListView")
);

const ExamPayments = lazy(() =>
  import(
    "./views/tautmore-components/main-pages/payments/ExamPayments/ListView"
  )
);

const AddExam = lazy(() =>
  import("./views/tautmore-components/main-pages/payments/ExamPayments/AddExam")
);

const EditExam = lazy(() =>
  import(
    "./views/tautmore-components/main-pages/payments/ExamPayments/EditExam"
  )
);

const AddCourse = lazy(() =>
  import("./views/tautmore-components/main-pages/payments/AddCourse")
);

const DiscountMain = lazy(() =>
  import("./views/tautmore-components/main-pages/discounts/ListView")
);

const DiscountDetails = lazy(() =>
  import(
    "./views/tautmore-components/main-pages/discounts/discountDetails/DiscountDetails"
  )
);

const OperatorMain = lazy(() =>
  import(
    "./views/tautmore-components/main-pages/question-list/data-list/operator/OperatorMain"
  )
);

const ApprovedMain = lazy(() =>
  import(
    "./views/tautmore-components/main-pages/question-list/data-list/approved-uploaded-questions/ApprovedMain"
  )
);

const UploadedMain = lazy(() =>
  import(
    "./views/tautmore-components/main-pages/question-list/data-list/approved-uploaded-questions/UploadedMain"
  )
);

const QuestionLanding = lazy(() =>
  import(
    "./views/tautmore-components/sections/question-details/QuestionLanding"
  )
);

const ExamTests = lazy(() =>
  import("./views/tautmore-components/main-pages/exam-list/data-list/ListView")
);

const AddQuestionsToExamDetails = lazy(() =>
  import(
    "./views/tautmore-components/sections/add-questions-to-exam-details/Add-QuestionsTo-Exam-Details"
  )
);

const AddQuestionsToOlympiadDetails = lazy(() =>
  import(
    `./views/tautmore-components/sections/add-questions-to-olympiad-details/Add-QuestionsTo-Olympiad-Details`
  )
);

const PaymentDetails = lazy(() =>
  import(
    "./views/tautmore-components/main-pages/payments/paymentDetails/PaymentDetails"
  )
);

const ExamPaymentDetails = lazy(() =>
  import(
    "./views/tautmore-components/main-pages/payments/ExamPayments/ExamPaymentDetail"
  )
);

const Classes = lazy(() =>
  import("./views/tautmore-components/main-pages/classes/ListView")
);

const AddBatch = lazy(() =>
  import("./views/tautmore-components/main-pages/classes/AddBatch")
);

const BatchDetail = lazy(() =>
  import("./views/tautmore-components/main-pages/classes/BatchDetails")
);

const StudentsBatch = lazy(() =>
  import(
    "./views/tautmore-components/main-pages/classes/StudentsBatch/ListView"
  )
);

const CoCurricular = lazy(() =>
  import("./views/tautmore-components/main-pages/cocurricular/ListView")
);

const AddCoCurricularBatch = lazy(() =>
  import(
    "./views/tautmore-components/main-pages/cocurricular/AddCoCurricularBatch"
  )
);

const CoCurricularBatchDetails = lazy(() =>
  import(
    "./views/tautmore-components/main-pages/cocurricular/CoCurriculatBatchDetails"
  )
);

const CurricularStudentsBatch = lazy(() =>
  import(
    "./views/tautmore-components/main-pages/cocurricular/CurricularStudentsBatch/ListView"
  )
);

const ZoomListView = lazy(() =>
  import("./views/tautmore-components/main-pages/zoom-users/ListView")
);

const ZoomDetails = lazy(() =>
  import(
    "./views/tautmore-components/main-pages/zoom-users/zoom-details/ZoomDetails"
  )
);

const OlympiadList = lazy(() =>
  import("./views/tautmore-components/main-pages/olympiad-exams/ListView")
);

const OlympiadDetails = lazy(() =>
  import(
    "./views/tautmore-components/sections/olympiad-exams-detail/Olympiad-Exam-Details"
  )
);

const OlympiadExamAddQuestions = lazy(() =>
  import("./views/tautmore-components/sections/olympiad-exams-detail/ListView")
);

const Concepts = lazy(() =>
  import("./views/tautmore-components/main-pages/concepts")
);

const SubConcepts = lazy(() =>
  import("./views/tautmore-components/main-pages/concepts/SubConcept")
);

const SubConceptsPreview = lazy(() =>
  import("./views/tautmore-components/main-pages/concepts/SubConcept/preview")
);
// const ExamTests = lazy(() =>
//   import("./views/tautmore-components/main-pages/exam-list/data-list/ListView")
// );
// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  // permission,
  // user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  {localStorage.getItem("tautmore-user") !== null ? (
                    <Component {...props} />
                  ) : (
                    // history.push("/")
                    <Redirect to="/login" />
                  )}
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

const PublicRoute = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  {localStorage.getItem("tautmore-user") !== null ? (
                    <Redirect to="/" />
                  ) : (
                    <Component {...props} />
                    // history.push("/")
                  )}
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <PublicRoute path="/login" component={login} fullLayout />
          {/* <AppRoute exact path="/" component={Home} /> */}
          <AppRoute path="/page2" component={Page2} />
          <AppRoute exact path="/admin-roles" component={AdminRolesListView} />
          <AppRoute
            exact
            path="/questions-listing"
            component={QuestionsListView}
          />
          <AppRoute
            exact
            path="/manage-admin/:id"
            component={AdminDetailsPage}
          />

          {/* NEW ROUTES */}

          <AppRoute path="/manage-subject" component={ManageSubjectListView} />
          <AppRoute path="/manage-board" component={ManageBoardView} />
          <AppRoute path="/manage-boards" component={Concepts} />
          <AppRoute path="/manage-subconcepts" component={SubConcepts} />
          <AppRoute
            path="/manage-subconcepts-preview"
            component={SubConceptsPreview}
          />
          <AppRoute path="/manage-class" component={ManageClassView} />

          {/* NEW ROUTES */}

          <AppRoute
            exact
            path="/question-details/:id"
            component={QuestionDetailsPage}
          />
          <AppRoute exact path="/manage-question/:id" component={AddQuestion} />
          <AppRoute exact path="/manage-images" component={Manageimage} />
          <AppRoute exact path="/teacher" component={Teacher} />
          <AppRoute
            exact
            path="/teacher/:teacherId"
            component={TeacherDetails}
          />
          <AppRoute
            exact
            path="/teacher/approval/:applicationId"
            component={TeacherApproval}
          />
          <AppRoute exact path="/student" component={Student} />
          <AppRoute
            exact
            path="/student/:studentId"
            component={StudentDetails}
          />
          <AppRoute exact path="/" component={Dashboard} />
          {/* <AppRoute exact path="/subuser" component={SubUser} /> */}
          <AppRoute exact path="/adminUsers" component={AdminUsers} />
          <AppRoute exact path="/subuser" component={AdminUsers} />
          {/* <AppRoute exact path="/adminUsers" component={AdminUsers} /> */}
          <AppRoute exact path="/adminUsers/:id" component={UserType} />
          <AppRoute
            exact
            path="/questions-listing"
            component={QuestionsListView}
          />
          <AppRoute exact path="/regular-exams" component={ExamTests} />
          <AppRoute
            exact
            path="/add-questions-to-exam/:id"
            component={ExamAndTestsAddQuest}
          />
          <AppRoute
            exact
            path="/manage-admin/:id"
            component={AdminDetailsPage}
          />
          <AppRoute
            exact
            path="/question-details/:id"
            component={QuestionDetailsPage}
          />
          <AppRoute
            exact
            path="/regular-exams/:id"
            component={ExamAndTestsDetail}
          />
          <AppRoute exact path="/manage-question/:id" component={AddQuestion} />
          <AppRoute exact path="/manage-images" component={Manageimage} />

          <AppRoute exact path="/course-payments" component={PaymentMain} />
          <AppRoute
            exact
            path="/payments-details/:id"
            component={PaymentDetails}
          />
          <AppRoute
            exact
            path="/exam-payment-details/:id"
            component={ExamPaymentDetails}
          />
          <AppRoute exact path="/add-exam" component={AddExam} />
          <AppRoute
            exact
            path="/add-questions-to-exam-details/:id"
            component={AddQuestionsToExamDetails}
          />
          <AppRoute exact path="/edit-exam/:id" component={EditExam} />
          <AppRoute exact path="/exam-payments" component={ExamPayments} />
          <AppRoute exact path="/add-course" component={AddCourse} />
          <AppRoute exact path="/discounts" component={DiscountMain} />
          <AppRoute
            exact
            path="/discount-details/:id"
            component={DiscountDetails}
          />
          <AppRoute exact path="/operator-questions" component={OperatorMain} />
          <AppRoute exact path="/approved-questions" component={ApprovedMain} />
          <AppRoute exact path="/uploaded-questions" component={UploadedMain} />
          <AppRoute
            exact
            path="/questions-landing/:id"
            component={QuestionLanding}
          />

          <AppRoute exact path="/classes" component={Classes} />
          <AppRoute exact path="/add-batch" component={AddBatch} />
          <AppRoute exact path="/batch-details/:id" component={BatchDetail} />
          <AppRoute exact path="/students-batch" component={StudentsBatch} />

          <AppRoute exact path="/co-curricular" component={CoCurricular} />
          <AppRoute
            exact
            path="/add-cocurricular-batch"
            component={AddCoCurricularBatch}
          />
          <AppRoute
            exact
            path="/co-curricular-batch-details/:id"
            component={CoCurricularBatchDetails}
          />
          <AppRoute
            exact
            path="/co-curricular-students-batch"
            component={CurricularStudentsBatch}
          />

          <AppRoute exact path="/zoom-users" component={ZoomListView} />
          <AppRoute exact path="/map-zoom-users/:id" component={ZoomDetails} />

          <AppRoute exact path="/olympiad-exams" component={OlympiadList} />
          <AppRoute
            exact
            path="/olympiad-exams/:id"
            component={OlympiadDetails}
          />
          <AppRoute
            exact
            path="/add-questions-to-olympiad/:id"
            component={OlympiadExamAddQuestions}
          />
          <AppRoute
            exact
            path="/add-questions-to-olympiad-details/:id"
            component={AddQuestionsToOlympiadDetails}
          />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
