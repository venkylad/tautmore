export const getFileName = (fileName) => {
  const dateString = new Date().getTime();
  const [url] = fileName.split(".");
  const name = dateString + "-" + url;
  return name;
};
