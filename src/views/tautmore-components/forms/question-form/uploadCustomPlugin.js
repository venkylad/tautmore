import { getFileName } from "./mockData/fileNameHelper";
import { clientUrl } from "../../services/api-fetch/Axios";
console.log(clientUrl, "url");
function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  constructor(props) {
    // CKEditor 5's FileLoader instance.
    this.loader = props;
    // URL where to send files.
    this.url = `${clientUrl}/api/image/upload`;
  }

  // Starts the upload process.
  upload() {
    return new Promise((resolve, reject) => {
      this._initRequest();
      this._initListeners(resolve, reject);
      this._sendRequest();
    });
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Example implementation using XMLHttpRequest.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    xhr.open("POST", this.url, true);
    xhr.contentType = "application/json";
    xhr.responseType = "json";
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("content-type", "application/json");
    // xhr.setRequestHeader('Authorization', getToken())
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `(Couldn't upload file: ${loader.file.name}.)`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;

      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      resolve({
        default: response.response,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.

  _sendRequest() {
    let base64 = "";
    let xhr = this.xhr;

    this.loader.file.then(async (result) => {
      var reader = await new FileReader();
      reader.onloadend = function () {
        base64 = reader.result;

        let reqData = {
          file_name: getFileName(result.name),
          base64_file: base64,
        };

        reqData = JSON.stringify(reqData);

        xhr.send(reqData);
      };
      reader.readAsDataURL(result);
    });
  }
}

export default MyCustomUploadAdapterPlugin;
