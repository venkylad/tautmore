import axios from "axios";
const userData = JSON.parse(localStorage.getItem("tautmore-user"));

const accessToken = userData?.accessToken;
// const createClient = () => {
//   // while working use below set of code

//   // const client = axios.create({
//   //   baseURL:process.env.REACT_APP_STAGE==="production"?
//   //   'https://3k06rt8n4h.execute-api.ap-south-1.amazonaws.com/local'
//   //   : process.env.REACT_APP_STAGE==="test"?
//   //   "https://n5kelqy2v8.execute-api.ap-south-1.amazonaws.com/test"
//   //   :"https://6hb1xxtzwj.execute-api.ap-south-1.amazonaws.com/dev"
//   // });
//   //  local Url: https://3k06rt8n4h.execute-api.ap-south-1.amazonaws.com/local
//   // dev URl :https://6hb1xxtzwj.execute-api.ap-south-1.amazonaws.com/dev
//   //testing url: https://n5kelqy2v8.execute-api.ap-south-1.amazonaws.com/test
//   // return client;

//   // while build use below set of code

//   //development
//   const stagingUrl = `https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development`;

//   //staging

//   // const stagingUrl = `https://60iyw91gsb.execute-api.us-east-1.amazonaws.com/staging`;

//   if (process.env.REACT_APP_STAGE === "development") {
//     const client = axios.create({
//       // baseURL: `https://y1z2gzytv3.execute-api.us-east-2.amazonaws.com/development`,
//       baseURL: stagingUrl,
//       headers: {
//         Authorization: accessToken,
//       },
//     });
//     // client.interceptors.request.use(addToken, Promise.reject);
//     return client;
//   } else if (process.env.REACT_APP_STAGE === "test") {
//     const client = axios.create({
//       // baseURL: `https://y1z2gzytv3.execute-api.us-east-2.amazonaws.com/development`,
//       baseURL: stagingUrl,
//       headers: {
//         Authorization: accessToken,
//       },
//     });
//     // client.interceptors.request.use(addToken, Promise.reject);
//     return client;
//   } else {
//     const client = axios.create({
//       // baseURL: `https://y1z2gzytv3.execute-api.us-east-2.amazonaws.com/development`,
//       baseURL: stagingUrl,
//       headers: {
//         Authorization: accessToken,
//       },
//     });
//     // client.interceptors.request.use(addToken, Promise.reject);
//     return client;
//   }
let baseURL = "";
if (process.env.NODE_ENV === "development") {
  baseURL = `https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development`;
} else if (process.env.NODE_ENV === "production") {
  //staging testing
  //baseURL = `https://60iyw91gsb.execute-api.us-east-1.amazonaws.com/staging`;

  //development testing
  baseURL = `https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development`;
} else {
  baseURL = `https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development`;
}

export const createClient = () => {
  const client = axios.create({
    baseURL: baseURL,
  });
  client.interceptors.request.use(function (config) {
    const token = JSON.parse(
      localStorage.getItem("tautmore-user")
    )?.accessToken;
    config.headers.Authorization = token ? token : "";
    return config;
  });
  return client;
};

export const clientUrl = baseURL;

const http = createClient();

export default http;
