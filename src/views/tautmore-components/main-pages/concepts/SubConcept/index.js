import React, { useState } from "react";
import "./styles.css";
import Bin from "./trash.svg";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import parse from "html-react-parser";
import { Editor } from "@tinymce/tinymce-react";
import { retrieveImageFromClipboardAsBlob, uploadFile } from "./plugins";
import { clientUrl } from "../../../services/api-fetch/Axios";

const Concept = () => {
  const [subTopics, setSubTopics] = useState([]);
  const [videos, setVideos] = useState([]);
  const [currSubTopic, setCurrentSubTopic] = useState({});
  const [currVideo, setCurrVideo] = useState({});
  const [open, setOpen] = useState(false);

  const [content, setContent] = useState("");

  const conceptData = {
    content: "",
  };

  const videoData = {
    type: "",
    title: "",
    url: "",
  };

  const addSubTopic = () => {
    setSubTopics([
      ...subTopics,
      { ...conceptData, id: Math.floor(Math.random() * 1000 + 1) },
    ]);
  };

  const addVideo = () => {
    setVideos([
      ...videos,
      { ...videoData, id: Math.floor(Math.random() * 1000 + 1) },
    ]);
  };

  const removeConcept = (id) => {
    setSubTopics(subTopics?.filter((item) => item?.id !== id));
  };

  const removeVideo = (id) => {
    setVideos(videos?.filter((item) => item?.id !== id));
  };

  const editConcept = () => {
    const updatedConcepts = subTopics?.map((item) => {
      return item.id === currSubTopic.id ? currSubTopic : item;
    });
    console.log(updatedConcepts, "EDIT");
    setSubTopics(updatedConcepts);
  };

  const editVideo = () => {
    const updatedVideos = videos?.map((item) => {
      return item.id === currVideo.id ? currVideo : item;
    });
    console.log(updatedVideos);
    setVideos(updatedVideos);
  };

  return (
    <div className="wrap">
      <h2>Add Subtopic details</h2>
      <h4>Add Content</h4>
      {subTopics?.length > 0 && (
        <button
          onClick={() => setOpen(true)}
          className="add-btn-blue"
          style={{ marginLeft: "auto" }}
        >
          Preview
        </button>
      )}

      <div className="content-wrap">
        {subTopics?.map((subTopic) => (
          <div key={subTopic?.id} className="content-editor">
            <div className="editor-cke">
              <div className="inner">
                <Editor
                  apiKey="qqxd283lio3pb7pn7nmhvx644be3wdta7s32ej6z1s0ij597"
                  // initialValue={quebodyval !== "" ? quebodyval.toString() : ""}
                  value={
                    (currSubTopic?.id === subTopic?.id && content) ||
                    subTopic?.content
                  }
                  init={{
                    external_plugins: {
                      tiny_mce_wiris: `https://www.wiris.net/demo/plugins/tiny_mce/plugin.js`,
                    },
                    height: 300,
                    // menubar: true,
                    config: {},
                    a11y_advanced_options: true,
                    file_picker_types: "file image media",
                    images_upload_base_path: `${clientUrl}/api/image/upload`,
                    images_upload_credentials: true,
                    image_title: false,
                    statusbar: false,
                    // paste_data_images: true,
                    // paste_as_text: true,
                    spellchecker_language: "sv_SE",
                    // menubar: 'edit',
                    selector: "textarea",
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen spellchecker",
                      "insertdatetime media table image code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "tiny_mce_wiris_formulaEditor  tiny_mce_wiris_formulaEditorChemistry |" +
                      "bold italic textsize textcolor backcolor image | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | ",
                    setup: function (editor) {
                      editor.on("paste", function (e) {
                        var imageBlob = retrieveImageFromClipboardAsBlob(e);
                        console.log(imageBlob);
                        if (!imageBlob) {
                          return;
                        }
                        // e.preventDefault();
                        uploadFile(imageBlob, function (response) {
                          // console.log("imageBlob",imageBlob,response);
                          // setQuebodyval(
                          //   '<img src="' + response.response + '" />'
                          // );
                          // setQuestionDetails(
                          //   '<img src="' + response.response + '" />'
                          // );
                          // console.log("imageBlob",imageBlob,response);
                          //   console.log('Tinymce editor not found!');
                        });
                      });
                    },
                    automatic_uploads: true,
                    powerpaste_allow_local_images: true,
                    // file_picker_types: "image",
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
                          xhr.setRequestHeader(
                            "content-type",
                            "application/json"
                          );
                          const dateString = new Date().getTime();
                          var base64 = reader.result;
                          let reqData = {
                            file_name:
                              dateString + "_" + file.name.split(".")[0],
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
                      console.log("blobInfo", blobInfo);
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
                  onEditorChange={(data) => {
                    setContent(data);
                    setCurrentSubTopic({
                      ...currSubTopic,
                      content: data,
                    });
                  }}
                  onBlur={(event, editor) => {
                    editConcept();
                    console.log("left");
                    setCurrentSubTopic({
                      ...currSubTopic,
                      content: content.toString(),
                    });
                    setContent("");
                  }}
                  onFocus={(event, editor) => {
                    console.log("entered");
                    setCurrentSubTopic(subTopic);
                    setContent(subTopic?.content);
                  }}
                />

                <button
                  onClick={() => removeConcept(subTopic?.id)}
                  className="remove-btn"
                >
                  <img src={Bin} alt="" />
                </button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={addSubTopic} className="add-btn-blue">
          <p>+</p> Add New
        </button>
      </div>

      {videos?.map((video) => (
        <div key={video?.id} className="video-wrap">
          <div className="video-wrap-col-1">
            <div className="radio-wrap">
              <input
                type="radio"
                checked={video?.type === "video"}
                value="video"
                onFocus={() => setCurrVideo(video)}
                onBlur={() => editVideo()}
                onChange={(e) =>
                  setCurrVideo({ ...currVideo, type: e.target.value })
                }
              />{" "}
              <p>Video</p>
            </div>
            <div className="radio-wrap">
              <input
                type="radio"
                checked={video?.type === "gif"}
                value="gif"
                onFocus={() => setCurrVideo(video)}
                onBlur={() => editVideo()}
                onChange={(e) =>
                  setCurrVideo({ ...currVideo, type: e.target.value })
                }
              />{" "}
              <p>GIF</p>
            </div>
          </div>
          <div className="video-wrap-col-2">
            <div className="text-wrap">
              <label>Video Title</label>
              <input
                type="text"
                placeholder="Title"
                value={
                  currVideo?.id === video?.id ? currVideo?.title : video?.title
                }
                onFocus={() => setCurrVideo(video)}
                onBlur={() => editVideo()}
                onChange={(e) =>
                  setCurrVideo({ ...currVideo, title: e.target.value })
                }
              />
            </div>
            <div className="text-wrap">
              <label>Video URL</label>
              <input
                type="text"
                placeholder="URL"
                value={
                  currVideo?.id === video?.id ? currVideo?.url : video?.url
                }
                onChange={(e) =>
                  setCurrVideo({ ...currVideo, url: e.target.value })
                }
                onFocus={() => setCurrVideo(video)}
                onBlur={() => editVideo()}
              />
            </div>
            <button
              className="remove-video-btn"
              onClick={() => removeVideo(video?.id)}
            >
              <img src={Bin} alt="" />
            </button>
          </div>
        </div>
      ))}
      <button onClick={addVideo} className="add-btn-blue">
        <p>+</p> Add Video
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="modal-wrap">
          {subTopics?.map((subTopic) => (
            <div key={subTopic?.id}>{parse(subTopic?.content)}</div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Concept;
