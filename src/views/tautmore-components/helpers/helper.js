export const questionMappingData = (details) => {
  const classId = details?.classIds;
  const mapData = details?.syllabusMapping;

  const classBoardMapData = mapData?.filter(
    (item) => item?.["class"]?._id === classId?.[0]
  );

  let classMapData = mapData?.filter(
    (item) => item?.["class"]?._id !== classId?.[0]
  );

  classMapData = classMapData?.map((data) => ({
    id: data?.["class"]?._id,
    value: `${data?.["class"]?.name}_${data?.["board"]?.name}`,
    label: `${data?.["class"]?.name}_${data?.["board"]?.name}`,
  }));

  if (classBoardMapData) {
    const [questionMap] = classBoardMapData;
    return { ...questionMap, classMapData };
  } else return {};
};
