import * as Yup from "yup";

const phoneRegex = "";

const checkPasswordRequired = Yup.string()
  .min(6)
  .required("Password is Required");
const checkPasswordNotRequired = Yup.string().min(6);

const checkRePasswordRequired = Yup.string()
  .min(6)
  .when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  })
  .required("Re-enter password is Required");

const checkRePasswordNotRequired = Yup.string()
  .min(6)
  .when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  });

export const formSchema_rp_staffs = (isEditAble) =>
  Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    role: Yup.object().required("Role is Required"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    phone: Yup.string()
      .required("Phone field is required")
      .matches(phoneRegex, "Phone number is not valid"),
    password: isEditAble ? checkPasswordNotRequired : checkPasswordRequired,
    repassword: isEditAble
      ? checkRePasswordNotRequired
      : checkRePasswordRequired,
  });

export const formschema_exam_tests = () =>
  Yup.object().shape({
    examname: Yup.string().required("Exam Name is Required"),
    description: Yup.string().required("Description is Required"),
    classData: Yup.string().required("Class is Required"),
    subject: Yup.string().required("Subject is Required"),
    totalmarks: Yup.string().required("Total Marks is Required"),
    totalexamtime: Yup.string().required("Exam Time is Required"),
    examtype: Yup.object().required("Exam Type is Required"),
    examdate: Yup.date()
      // .min(new Date(), "You can't choose past date")
      .required("Start Date is Required"),
    // enddate: Yup.string().required("End Date is Required"),
    // time: Yup.string().required("Time is Required"),
    enddate: Yup.date()
        .min(Yup.ref("examdate"), "end date can't be before start date")
        .required("End Date is Required"),

    // time: Yup.string().when("examtype", {
    //   is: (val) =>
    //     val &&
    //     (val.value === "quarterly" ||
    //       val.value === "half-yearly" ||
    //       val.value === "annually" ||
    //       val.value === "olympiad-half-yearly" ||
    //       val.value === "olympiad-annually"),
    //   then: Yup.string().required("Start Time is required"),
    //   otherwise: Yup.string(),
    // }),
    time:Yup.string().required("Time Zone Required"),
    instructions: Yup.string().required("Instructions is Required"),
  });

  export const formschema_olympiad_exam_tests = () =>
  Yup.object().shape({
    examname: Yup.string().required("Exam Name is Required"),
    description: Yup.string().required("Description is Required"),
    classData: Yup.string().required("Class is Required"),
    subject: Yup.string().required("Subject is Required"),
    totalmarks: Yup.string().required("Total Marks is Required"),
    totalexamtime: Yup.string().required("Exam Time is Required"),
    examtype: Yup.object().required("Exam Type is Required"),
    examdate: Yup.date()
      // .min(new Date(), "You can't choose past date")
      .required("Start Date is Required"),
    // enddate: Yup.string().required("End Date is Required"),
    // time: Yup.string().required("Time is Required"),
    enddate: Yup.date()
        .min(Yup.ref("examdate"), "end date can't be before start date")
        .required("End Date is Required"),

    // time: Yup.string().when("examtype", {
    //   is: (val) =>
    //     val &&
    //     (val.value === "quarterly" ||
    //       val.value === "half-yearly" ||
    //       val.value === "annually" ||
    //       val.value === "olympiad-half-yearly" ||
    //       val.value === "olympiad-annually"),
    //   then: Yup.string().required("Start Time is required"),
    //   otherwise: Yup.string(),
    // }),
    time:Yup.string().required("Time Zone Required"),
    instructions: Yup.string().required("Instructions is Required"),
  });

export const formschema_discount = () =>
  Yup.object().shape({
    discountname: Yup.string().required("Discount Name is Required"),
    discountcode: Yup.string().required("Discount code is Required"),
    discountsign: Yup.string().required("Currency sign is Required"),
    discountmethod: Yup.string().required("Discount Type is Required"),
    discountamount: Yup.string().required("Discount Amount is Required"),
    typeofdiscount: Yup.object().required("Type of Discount is Reuquired"),
    noofdiscount: Yup.string().when("typeofdiscount", {
      is: (val) => val && val.value === "Multi use",
      then: Yup.string().required("No. of Discounts is required"),
      otherwise: Yup.string(),
    }),
    expireson: Yup.string().required("Expire Date is Required"),
    description: Yup.string().required("Description is Required"),
  });

export const formschema_zoom = () =>
  Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    firstname: Yup.string().required("First name is Required"),
    lastname: Yup.string().required("Last name is Required"),
  })

  export const formschema_map_zoom = () =>
  Yup.object().shape({
    grade: Yup.string().required("Grade is Required"),
    subjects: Yup.string().required("Subjects is Required"),
    teacher: Yup.string().required("Teacher is Required"),
  })

export const formSchema_manage_question = Yup.object().shape({
  marks: Yup.number().max(100).typeError("Marks is Required").required(),
  tautmoreId: Yup.string().required("Tautmore id is Required"),
  time_to_solve: Yup.number()
    .typeError("Time is Required")
    .max(1000)
    .required(),
  class_board: Yup.string().required("Class & Board is Required"),
  subject: Yup.string().required("Subject is Required"),
  chapter: Yup.string().required("Chapter is Required"),
  concept: Yup.string().required("Concept is Required"),
  sub_concept: Yup.string().required("Subconcept is Required"),
  grade_subconcept: Yup.string(),
  difficulty_order: Yup.string().required("Difficulty Order is Required"),
  difficulty_type: Yup.string().required("Difficulty Type is Required"),
  difficulty_level: Yup.string().required("Difficulty level is Required"),
  question_type: Yup.string().required("Question Type is Required"),
  exam_type: Yup.string().required("Exam Type is Required"),
  question_alignment: Yup.string().required("Question Alignment is Required"),
});

export const formschema_add_course = Yup.object().shape({
  grade: Yup.string().required("Grade is Required"),
  subjects: Yup.string().required("Subjects is Required"),
  courseprice: Yup.string().required("Course price is Required"),
  typeofdiscount: Yup.string().required("Grade is Required"),
  discountvalue: Yup.string().required("Discount price is Required"),
  // finalprice: Yup.string().required("Final price is Required"),
});

export const formscheme_add_batch = Yup.object().shape({
  batchname: Yup.string().required("Batch Name is Required"),
  boardname: Yup.string().required("Board Name is Required"),
  grade: Yup.string().required("Grade is Required"),
  subject:Yup.string().required("Subject is Required"),
  teacher: Yup.string().required("Teacher Name is Required"),
  timezone: Yup.string().required("Timezone Name is Required")
})

export const formscheme_add_coCurricular_batch = Yup.object().shape({
  batchname: Yup.string().required("Batch Name is Required"),
  boardname: Yup.string().required("Board Name is Required"),
  grade: Yup.string().required("Grade is Required"),
  activity: Yup.string().required("Activity is Required"),
  teacher: Yup.string().required("Teacher Name is Required"),
  timezone: Yup.string().required("Timezone Name is Required")
});

export const formschema_role = Yup.object().shape({
  roleName: Yup.string().required("Role name is required"),
});
export const formschema_decline_question = Yup.object().shape({
  comments: Yup.string().required("Comment is required"),
});
