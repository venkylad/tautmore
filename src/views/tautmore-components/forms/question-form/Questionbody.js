import React from "react";
import { Row, Col, Label } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-classic-with-mathtype";
import MyCustomUploadAdapterPlugin from "./uploadCustomPlugin";
import { Minus } from "react-feather";
import { Editor } from "@tinymce/tinymce-react";
import { clientUrl } from "../../services/api-fetch/Axios";

const Questionbody = ({
  questionDetails,
  setQuestionDetails,
  quebodyval,
  setQuebodyval,
  queBodyError,
  index,
  questiontype,
  passageCounter,
  removePassageQuestion,
  selectedSub,
  questiondetail,
}) => {
  //   const handleChangeED =(e)=>{
  // console.log("@@@@@@@",e.target.getContent());
  //   }
  // localStorage.setItem("Editpagedata", JSON.stringify(data));
  // console.log("@@@@@@@",localStorage.setItem("Editpagedata", JSON.stringify()));
  console.log('qqqqqqqqqqqqqq ', quebodyval)

  return (
    <Row className={`row-main ${queBodyError ? "" : "question-body-row"}`}>
      <Col>
        <div className="question-title-wrapper">
          <Label for="data-body">
            {questiontype === "passage" && index + 1 + "."} Question body
          </Label>
          {questiontype === "passage" && (
            <div
              className="minus 1234"
              onClick={() => removePassageQuestion(quebodyval?.id)}
            >
              <Minus size={12} />
            </div>
          )}
        </div>

        <Editor
          apiKey="u9fzm8p2l3qt4b1k1vwv6gktzge0ynqu3c7nuxdyo2hroawd"
          // initialValue={quebodyval !== "" ? quebodyval.toString() : ""}
          value={questiontype !== "passage" ? quebodyval : quebodyval?.description}
          init={{
            external_plugins: {
              tiny_mce_wiris: `https://www.wiris.net/demo/plugins/tiny_mce/plugin.js`,
            },
            height: 300,
            menubar: true,
            config: {},

            images_upload_base_path: `${clientUrl}/api/image/upload`,
            images_upload_credentials: true,
            image_title: false,
            statusbar: false,
            paste_data_images: true,
            paste_as_text: true,
            spellchecker_language: 'sv_SE',

            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen spellchecker paste",
              "insertdatetime media table paste image code help wordcount",
            ],

            toolbar:
              "undo redo | formatselect | " +
              "tiny_mce_wiris_formulaEditor  tiny_mce_wiris_formulaEditorChemistry |" +
              "bold italic textsize textcolor backcolor image | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | ",
            // "undo redo | formatselect | " +
            // "tiny_mce_wiris_formulaEditor  tiny_mce_wiris_formulaEditorChemistry |" +
            // "bold italic underline image | alignright alignjustify alignleft aligncenter  |" +
            // "fontselect fontsizeselect forecolor backcolor | " +
            // " bullist numlist outdent indent |",

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
                "data:" + blobInfo.blob().type + ";base64," + blobInfo.base64();
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
          onEditorChange={(e) => {
            const data = e;
            setQuebodyval(data);
            setQuestionDetails(data);
          }}
        />
      </Col>
    </Row>
  );
};

export default Questionbody;
