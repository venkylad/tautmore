import http from "../../api-fetch/Axios";

export const uploadImageService = (data) =>
  http.post("/api/image/upload", data);
