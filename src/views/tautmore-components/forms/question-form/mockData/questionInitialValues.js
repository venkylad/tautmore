import { questionMappingData } from "../../../helpers/helper";
import {
  descructureDifficultyLevel,
  descructureDifficultyType,
  findKeyByValue,
} from "../questionHelper";

const emptyInitialValue = {
  class_board: "",
  subject: "",
  chapter: "",
  concept: "",
  sub_concept: "",
  grade_subconcept: "",
  marks: null,
  tautmoreId:'',
  time_to_solve: null,
  difficulty_order: "",
  difficulty_type: "",
  difficulty_level: "",
  question_type: "",
  exam_type: "",
  question_alignment: "",
};
export const initValues = (details) => {
  let obj;
  if (!details) {
    obj = emptyInitialValue;
  } else {
    const data = questionMappingData(details);
    obj = {
      class_board: {
        id: data?.["class"]?._id,
        value: `${data?.["class"]?.name}_${data?.["board"]?.name}`,
        label: `${data?.["class"]?.name}_${data?.["board"]?.name}`,
      },
      subject: {
        id: details?.syllabusMapping?.[0]?.subject,
        value: details?.subjectName,
        label: details?.subjectName,
      },
      chapter: {
        id: data?.["chapter"]?._id,
        value: data?.["chapter"]?.name,
        label: data?.["chapter"]?.name,
      },
      concept: {
        id: data?.["concept"]?._id,
        value: data?.["concept"]?.name,
        label: data?.["concept"]?.name,
      },
      sub_concept: {
        id: details?.subConcept?._id,
        value: details?.subConcept?.name,
        label: details?.subConcept?.name,
      },
      grade_subconcept: data?.classMapData,
      marks: details?.score,
     tautmoreId: details?.tautmoreId,
      time_to_solve: details?.timeToSolve,
      difficulty_order: {
        id: descructureDifficultyLevel(details?.difficulty)?.levelBase,
        value: descructureDifficultyLevel(details?.difficulty)?.levelBase,
        label: descructureDifficultyLevel(details?.difficulty)?.levelBase,
      },
      difficulty_type: {
        id: descructureDifficultyType(details?.difficulty),
        value: descructureDifficultyType(details?.difficulty),
        label: descructureDifficultyType(details?.difficulty),
      },
      difficulty_level: {
        id: descructureDifficultyLevel(details?.difficulty)?.level,
        value: descructureDifficultyLevel(details?.difficulty)?.level,
        label: descructureDifficultyLevel(details?.difficulty)?.level,
      },
      question_type: {
        id: findKeyByValue(details?.solutionType),
        value: findKeyByValue(details?.solutionType),
        label: findKeyByValue(details?.solutionType),
      },
      exam_type: {
        id: details?.moduleType,
        value: details?.moduleType,
        label: details?.moduleType,
      },
      question_alignment: {
        id: details?.questionOrientaion,
        value: details?.questionOrientaion,
        label: details?.questionOrientaion,
      },
    };
  }

  return obj;
};
