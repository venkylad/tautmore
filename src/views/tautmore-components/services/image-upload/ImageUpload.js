import axios from "../api-fetch/Axios";

// export const ImageUpload = async (e) => {
//   let uploadedUrl = "";
//   var f = e.target.files[0];
//   try {
//     const ImageUploadRequest = await axios.post("/api/image/getImageUrl", {
//       file_name: e.target.files[0].name,
//     });
//     console.log(ImageUploadRequest);
//     if (ImageUploadRequest.status === 200) {
//       var formData = new FormData();
//       for (let key in ImageUploadRequest.data.imageUrl.fields) {
//         formData.append(key, ImageUploadRequest.data.imageUrl.fields[key]);
//       }
//       console.log(formData);
//       formData.append("file", e.target.files[0]);
//       // progress bar code
//       const config = {
//         onUploadProgress: function (progressEvent) {
//           var percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           if (percentCompleted < 100) {
//             this.setState({ uploadPercentage: percentCompleted });
//           }
//         }.bind(this),
//       };
//       await axios
//         .post(ImageUploadRequest.data.result.url, formData, config)
//         .then((res) => {
//           this.setState({ uploadPercentage: 100 }, () => {
//             setTimeout(() => {
//               this.setState({ uploadPercentage: 0 });
//             }, 1000);
//           });
//         })
//         .catch((err) => console.log(err));
//       uploadedUrl =
//         ImageUploadRequest.data.result.url +
//         "/" +
//         ImageUploadRequest.data.result.fields.key;
//       return uploadedUrl;
//       //   debugger;
//       // this.setState({
//       //   astrologerImage: uploadedUrl,
//       // });
//     }
//   } catch (e) {}
// };

export async function ImageUpload(file) {
  console.log("file", file.target.files);
  file.persist();
  if (typeof file === "string") {
    return file;
  } else {
    async function onSuccess(uploadData) {
      //   console.log(uploadData);
      var data = new FormData();
      for (let key in uploadData.fields) {
        data.append(key, uploadData.fields[key]);
      }
      data.append("file", file.target.files[0]);
      try {
        const uploadedUrl = await axios.post(uploadData.url, data);
        if (uploadedUrl) {
          const attachmentUrl = uploadData.url + "/" + uploadData.fields.key;
          console.log(attachmentUrl);
          return attachmentUrl;
        }
      } catch (e) {}
    }
    try {
      const uploadUrl = await axios.post("/api/image/getImageUrl", {
        file_name: file.target.files[0].name,
      });
      console.log("uploadurl", uploadUrl);
      return onSuccess(uploadUrl.data.imageUrl);
    } catch (e) {
      console.log(e);
    }
  }
}
