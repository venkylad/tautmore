import { v4 as uuid } from "uuid";

export const structureDragAndDrop = (statement, optiondata, solutionIdx) => {
  const question = [];

  //solutionIdx.sort();

  for (let i = 0; i < statement?.length; i++) {
    const j = solutionIdx?.length > 0 && solutionIdx[i];
    const option = {
      id: uuid(),
      index: i,
      name: "option 1",
      image: statement[i]?.image,
      text: statement[i]?.text,
      statementImage: optiondata[j]?.image,
      statementText: optiondata[j]?.text,
    };
    question.push(option);
  }

  //[2, 1, 3, 0] ["c", "b", "d", "a"]

  return question;
};
