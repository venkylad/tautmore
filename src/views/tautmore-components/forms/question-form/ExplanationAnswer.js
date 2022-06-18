import React from "react";
import { Row, Col, Label } from "reactstrap";
import { Image, X } from "react-feather";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-classic-with-mathtype";
import MyCustomUploadAdapterPlugin from "./uploadCustomPlugin";
import { getFileName } from "./mockData/fileNameHelper";
import { uploadImageService } from "../../services/apis/image_api/upload-image";
import { Editor } from "@tinymce/tinymce-react";
import { clientUrl } from "../../services/api-fetch/Axios";

const ExplanationAnswer = ({
  expimg,
  setExpimg,
  setExplanationAnsText,
  explanationAnsText,
  selectedSub,
  questiondetail,
}) => {
  let expFile = "";

  const uploadImage = (event) => {
    event.preventDefault();
    expFile.click();
  };

  const expChange = (event) => {
    console.log(event, "event");
    for (let i = 0; i < event.target.files.length; i++) {
      let file = event.target.files[i];
      let reader = new FileReader();

      reader.onloadend = function () {
        const reqData = {
          file_name: getFileName(file?.name),
          base64_file: reader.result,
        };
        uploadImageService(reqData)
          .then((imgRes) => {
            console.log(imgRes, "res");
            setExpimg(imgRes?.data?.response);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImg = () => {
    setExpimg("");
  };

  return (
    <Row className="row-main">
      <Col xs={12}>
        <div className="explanation-answer">
          <Label>Explanation of the answer (optional)</Label>

          <Editor
            apiKey="u9fzm8p2l3qt4b1k1vwv6gktzge0ynqu3c7nuxdyo2hroawd"
            // initialValue={quebodyval !== "" ? quebodyval.toString() : ""}
            value={explanationAnsText}
            init={{
              height: 300,
              menubar: true,
              config: {},

              images_upload_base_path: `${clientUrl}/api/image/upload`,
              images_upload_credentials: true,
              image_title: false,
              statusbar: false,
              paste_data_images: true,
              paste_as_text: true,
              external_plugins: {
                tiny_mce_wiris: `https://www.wiris.net/demo/plugins/tiny_mce/plugin.js`,
              },

              plugins: [
                // 'advlist autolink lists link image charmap print preview anchor',
                // 'searchreplace visualblocks code fullscreen',
                // 'insertdatetime media table paste code help wordcount'
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste image code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "tiny_mce_wiris_formulaEditor  tiny_mce_wiris_formulaEditorChemistry |" +
                "bold italic textsize textcolor backcolor image | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | ",
              // `undo redo| link code image | formatselect | bold italic backcolor | \
              //   alignleft aligncenter alignright alignjustify | \
              //   bullist numlist outdent indent | removeformat | help`,
              automatic_uploads: true,
              file_picker_types: "image",
              file_picker_callback: function (cb, value, meta) {
                var input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                var url = `${clientUrl}/api/image/upload`;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                input.onchange = function () {
                  var file = this.files[0];
                  var reader = new FileReader();
                  xhr.onload = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                      // File uploaded successfully
                      var response = JSON.parse(xhr.response);
                      console.log(response, file);
                      // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
                      var url = response?.response;
                      // console.log(url)
                      // Create a thumbnail of the uploaded image, with 150px width
                      cb(url, { title: file.name });
                    }
                  };

                  reader.onload = function () {
                    xhr.setRequestHeader("content-type", "application/json");
                    const dateString = new Date().getTime();
                    var base64 = reader.result;
                    let reqData = {
                      file_name: dateString + "_" + file.name.split(".")[0],
                      base64_file: base64,
                    };
                    reqData = JSON.stringify(reqData);
                    xhr.send(reqData);
                  };
                  reader.readAsDataURL(file);
                };

                input.click();
              },
              images_dataimg_filter: function (img) {
                return img.hasAttribute("internal-blob");
              },
              images_upload_handler: (blobInfo, success, failure) => {
                var reader = new FileReader();
                var url = `${clientUrl}/api/image/upload`;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("content-type", "application/json");
                const dateString = new Date().getTime();
                var base64 =
                  "data:" +
                  blobInfo.blob().type +
                  ";base64," +
                  blobInfo.base64();
                let reqData = {
                  file_name: dateString,
                  base64_file: base64,
                };
                reqData = JSON.stringify(reqData);
                xhr.send(reqData);
                xhr.onload = function () {
                  if (xhr.readyState === 4 && xhr.status === 200) {
                    var response = JSON.parse(xhr.response);
                    var url = response?.response;
                    success(url);
                  }
                };

                reader.readAsDataURL(blobInfo.blob());
              },
            }}
            // onEditorChange={(e) => {
            //   const data = e;
            //   setQuebodyval(data);
            // }}
            // data={explanationAnsText}
            onEditorChange={(e) => {
              const data = e;
              setExplanationAnsText(data);
            }}
          />
        </div>
      </Col>

      {/* <Col xs={12}>
        <div className="explanation-answer">
          <Label>Explanation of the image answer (optional)</Label>
          <div className="text-center exp-ans-img">
            <input
              type="file"
              ref={(input) => {
                expFile = input;
              }}
              onChange={(event) => expChange(event)}
              style={{ display: "none" }}
              name="fileoption"
              accept=".png,.jpg,.jpeg,.gif"
            />
            <Row>
              {expimg && (
                <Col md={7}>
                  <img src={expimg} alt="Explanation_img" />
                </Col>
              )}
              <Col className={`${expimg} ? 'col-md-5' : 'col-md-12'`}>
                {expimg ? (
                  <button type="button" onClick={removeImg}>
                    <X size={15} color="red" />
                  </button>
                ) : (
                  <button type="button" onClick={uploadImage}>
                    <Image size={15} />+ Add image
                  </button>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </Col> */}
    </Row>
  );
};

export default ExplanationAnswer;
