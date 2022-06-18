import { v4 as uuid } from "uuid";
import { questionTypesData } from "./mockData/data";

export const structurQuestionData = (data, si) => {
  const structuredData = data?.map((item, i) => {
    const optionData = {
      id: uuid(),
      index: i,
      name: "option 1",
      value: item,
      text: item?.text,
      image: item?.image,
      imageElement: item?.imageElement,
      checked: si.includes(i) ? true : false,
    };
    return optionData;
  });

  return structuredData;
};

export const destructureQuestionData = (data) => {
  return data?.map((item, i) => ({
    index: item.index,
    image: item?.image,
    text: item?.text,
    imageElement: item?.imageElement,
  }));
};

export const destructureStatementData = (data, questiontype) => {
  if (questiontype === "drag-and-drop") {
    return data?.map((item, i) => item?.value);
  }
};

export const findSolutionIndex = (data) => {
  let solutionIndexes = data?.map((item, i) => {
    if (item.checked) {
      return i;
    }
    return null;
  });

  return solutionIndexes.filter((item) => typeof item === "number");
};

export const checkIfImageLink = (text) => {
  return text?.indexOf("https://") > -1;
};

export const findKeyByValue = (value) => {
  const keys = Object.keys(questionTypesData);
  const [key] = keys.filter((item) => questionTypesData[item] === value);
  return key;
};

export const structurePassageData = (data) => {
  const pData =
    data?.length &&
    data?.map((item) => {
      const passageData = {
        id: uuid(),
        index: data.length,
        description: item?.description,
        options: structurQuestionData(item?.options, item?.solutionIndex),
        solutionIndex: [],
      };
      return passageData;
    });

  return pData;
};

export const descructureDifficultyLevel = (value) => {
  const strArray = value.split("_");
  const level = strArray[1];
  const levelBase = level?.split(".")?.[0];
  return { level, levelBase };
};

export const descructureDifficultyType = (value) => {
  const strArray = value.split("_");
  const string = strArray[0];
  return string;
};

export const destructureDragAndDrop = (dragData) => {
  const statements = dragData?.map((statement, i) => {
    return {
      index: i,
      image: statement.image,
      text: statement.text,
    };
  });

  const array = [];

  for (let i = 0; i < dragData.length; i++) {
    array.push(i);
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  const solution = shuffle(array);

  const options = [];

  for (let i = 0; i < solution.length; i++) {
    options[solution[i]] = {
      index: i,
      image: dragData[i].statementImage,
      text: dragData[i].statementText,
    };
  }
  // console.log("options newwww", options);

  return { statements, solution, options };
};

export const structureDragAndDrop = (statement, optiondata, solutionIdx) => {
  const question = [];

  //solutionIdx.sort();

  for (let i = 0; i < statement?.length; i++) {
    const j = solutionIdx?.length > 0 && solutionIdx?.[i];
    const option = {
      id: uuid(),
      index: i,
      name: "",
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

export const checkDragDropSnunscramble = (text) => {
  let res = false;
  if (
    text === "scrambled-and-unscrambled" ||
    text === "drag-and-drop" ||
    text === "match-the-following"
  ) {
    res = true;
  } else {
    res = false;
  }
  return res;
};
