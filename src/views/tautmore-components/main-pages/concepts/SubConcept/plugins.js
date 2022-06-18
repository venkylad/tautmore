import { clientUrl } from "../../../services/api-fetch/Axios";

export function retrieveImageFromClipboardAsBlob(pasteEvent) {
  console.log(pasteEvent);
  if (pasteEvent.clipboardData === false) {
    return false;
  }

  var items = (
    pasteEvent.clipboardData || pasteEvent.originalEvent.clipboardData
  ).items;

  if (items === undefined) {
    return false;
  }

  for (var i = 0; i < items.length; i++) {
    // Only paste if image is only choice
    var blob = "";
    console.log("iiiii", items[i].type);
    console.log(items[i].type.indexOf("image"));
    console.log(items[i]);
    console.log(items[i].getAsFile());
    if (items[i].type.indexOf("image") >= -1) {
      blob = items[i].getAsFile();
      // return false;
    }
    // Retrieve image on clipboard as blob
    console.log("blobInfoqqqqqq ", blob);

    // load image if there is a pasted image
    if (blob !== null) {
      const reader = new FileReader();
      reader.onload = function (e) {
        // console.log('result', e.target.result);
      };
      reader.readAsBinaryString(blob);
      return blob;
    }
  }
  return false;
}
export function uploadFile(file, callback) {
  console.log("@@@@@@@@@@@@@", file);
  var xhr = new XMLHttpRequest();

  xhr.upload.onprogress = function (e) {
    var percentComplete = (e.loaded / e.total) * 100;
    console.log("Uploaded: " + percentComplete + "%");
  };

  xhr.onload = function () {
    if (xhr.status !== 200) {
      alert("Error! Upload failed " + xhr.response);
    }
    if (callback) {
      callback(JSON.parse(xhr.response));
    }
  };

  xhr.onerror = function () {
    alert("Error! Upload failed. Can not connect to server.");
  };

  xhr.open("POST", `${clientUrl}/api/image/upload`, true);
  xhr.setRequestHeader("content-type", "application/json");

  const dateString = new Date().getTime();
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  var idCardBase64 = file;
  var base64 = file;
  getBase64(file, (result) => {
    base64 = result;
    let reqData = {
      file_name: dateString + "_" + file.name.split(".")[0],
      base64_file: base64,
    };
    reqData = JSON.stringify(reqData);
    xhr.send(reqData);
  });
  console.log("idCardBase64", idCardBase64, file, base64);
}
