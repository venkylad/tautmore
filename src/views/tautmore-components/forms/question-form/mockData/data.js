import { v4 as uuid } from "uuid";

export const questionTypesData = {
  "choose-the-correct-answer": "1",
  "statement-and-support": "2",
  "drag-and-drop": "3",
  "two-columns-option": "4",
  "degrees-of-change-from-a-study": "5",
  "open-ended-questions": "6",
  passage: "7",
  "error-findings": "8",
  multi: "9",
  "match-the-following": "10",
  "selecting-the-word-sentence": "11",
  "scrambled-and-unscrambled": "12",
};

export const difficultyOrderData = [
  {
    value: "1",
    label: "1",
    id: "one",
  },
  {
    value: "2",
    label: "2",
    id: "two",
  },
  {
    value: "3",
    label: "3",
    id: "three",
  },
  {
    value: "4",
    label: "4",
    id: "four",
  },
  {
    value: "5",
    label: "5",
    id: "five",
  },
];

export const difficultyTypeData = [
  {
    value: "low",
    label: "Low",
    id: "low",
  },
  {
    value: "medium",
    label: "Medium",
    id: "medium",
  },
  {
    value: "high",
    label: "High",
    id: "high",
  },
];

export const examTypeData = [
  {
    value: "brain-gym",
    label: "Brain-gym",
    id: "brain-gym",
  },
  {
    value: "exams",
    label: "Exams",
    id: "exams",
  },
  {
    value: "assignment",
    label: "Assignment",
    id: "assignment",
  },
];

export const orentationType = [
  {
    value: 'horizontal',
    label: 'Horizontal',
    id: 'horizontal',
  },
  {
    value: 'vertical',
    label: 'Vertical',
    id: 'vertical',
  },
];

export const questioTypesRawData = [
  {
    id: uuid(),
    label: "Choose the correct answer",
    value: "choose-the-correct-answer",
  },
  {
    id: uuid(),
    label: " Statement and support",
    value: "statement-and-support",
  },
  {
    id: uuid(),
    label: "Drag and drop",
    value: "drag-and-drop",
  },
  {
    id: uuid(),
    label: "Two columns option",
    value: "two-columns-option",
  },
  {
    id: uuid(),
    label: "Open-ended questions",
    value: "open-ended-questions",
  },
  {
    id: uuid(),
    label: "Passage",
    value: "passage",
  },
  {
    id: uuid(),
    label: "Error findings",
    value: "error-findings",
  },
  {
    id: uuid(),
    label: "Multiple",
    value: "multi",
  },
  {
    id: uuid(),
    label: "Match the following",
    value: "match-the-following",
  },
  {
    id: uuid(),
    label: "Selecting the word/sentence",
    value: "selecting-the-word-sentence",
  },
  {
    id: uuid(),
    label: " Scrambled & Unscrambled",
    value: "scrambled-and-unscrambled",
  },
];

export const defaultOption = (n = 4) => {
  const option = [];
  for (let i = 0; i < n; i++) {
    const optionData = {
      id: uuid(),
      index: i,
      name: "option 1",
      text: "",
      image: "",
      value: "",
      error: "",
      checked: false,
      solutionIdxError: "",
      statementImage: "",
      statementText: "",
    };
    option.push(optionData);
  }
  return option;
};
export default {};
