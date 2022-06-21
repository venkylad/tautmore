import React, { useEffect, useState } from "react";
import "./styles.css";
import Bin from "./trash.svg";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import parse from "html-react-parser";
import { Editor } from "@tinymce/tinymce-react";
import { retrieveImageFromClipboardAsBlob, uploadFile } from "./plugins";
import { clientUrl } from "../../../services/api-fetch/Axios";
import axios from "axios";
import { useSelector } from "react-redux";

const Concept = () => {
  const [subTopics, setSubTopics] = useState([]);
  const [videos, setVideos] = useState([]);
  const [currSubTopic, setCurrentSubTopic] = useState({});
  const [currVideo, setCurrVideo] = useState({});
  const [open, setOpen] = useState(false);

  const [content, setContent] = useState("");

  // const { subject, subConcept } = useSelector(
  //   (state) => state.selectForContent
  // );

  const subject = "61cae44784278500096fdcaf";
  const subConcept = "61cc0ca06cdfe11016fbf191";

  console.log(currVideo);
  console.log(currSubTopic);

  const fetchSubtopics = async () => {
    const { data } = await axios.get(
      `${clientUrl}/api/admin/content-and-video-details?subject=${subject}&subConcept=${subConcept}`
    );
    console.log(data?.data, "DATA");
    setSubTopics(data?.data?.contents);
    setVideos(data?.data?.videos);
    console.log(data?.data?.videos, "VIDEOS");
  };

  const conceptData = {
    content: "",
    index: 1,
  };

  const videoData = {
    type: "",
    title: "",
    link: "",
    index: 1,
  };

  const addSubTopic = async () => {
    await axios
      .post(`${clientUrl}/api/content/add-content`, {
        content: "Placeholder for content",
        index: 1,
        subject,
        subConcept,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setSubTopics([
      ...subTopics,
      {
        ...conceptData,
        content: "Placeholder for content",
      },
    ]);
  };

  const addVideo = async () => {
    await axios
      .post(`${clientUrl}/api/video/add-video`, {
        title: "Video Placeholder",
        link: "http://dummylink3",
        index: 1,
        subject,
        subConcept,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setVideos([
      ...videos,
      {
        ...videoData,
        title: "Video Placeholder",
        link: "http://dummylink3",
        index: 1,
        subject,
        subConcept,
      },
    ]);
  };

  const removeConcept = async (_id) => {
    await axios
      .post(`${clientUrl}/api/content/delete-content`, {
        contentId: _id,
        subject: subject,
        subConcept: subConcept,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setSubTopics(subTopics?.filter((item) => item?._id !== _id));
  };

  const removeVideo = async (_id) => {
    await axios
      .post(`${clientUrl}/api/video/delete-video`, {
        videoId: _id,
        subject: subject,
        subConcept: subConcept,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setVideos(videos?.filter((item) => item?._id !== _id));
  };

  const editConcept = async () => {
    const updatedConcepts = subTopics?.map((item) => {
      return item._id === currSubTopic._id ? currSubTopic : item;
    });
    console.log(updatedConcepts, "EDIT");
    setSubTopics(updatedConcepts);
    await axios
      .post(`${clientUrl}/api/content/edit-content`, {
        contentId: currSubTopic?._id,
        content: currSubTopic?.content,
        index: currSubTopic?.index,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const editVideo = async () => {
    const updatedVideos = videos?.map((item) => {
      return item._id === currVideo._id ? currVideo : item;
    });
    console.log(updatedVideos);
    setVideos(updatedVideos);

    await axios
      .post(`${clientUrl}/api/video/edit-video`, {
        videoId: currVideo?._id,
        title: currVideo?.title,
        link: currVideo?.link,
        index: 1,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSubtopics();
  }, []);

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
          <div key={subTopic?._id} className="content-editor">
            <div className="editor-cke">
              <div className="inner">
                <Editor
                  apiKey="qqxd283lio3pb7pn7nmhvx644be3wdta7s32ej6z1s0ij597"
                  // initialValue={quebodyval !== "" ? quebodyval.toString() : ""}
                  value={
                    (currSubTopic?._id === subTopic?._id && content) ||
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
                    console.log("left");
                    setCurrentSubTopic({
                      ...currSubTopic,
                      content: content,
                    });
                    editConcept();
                  }}
                  onFocus={(event, editor) => {
                    console.log("entered");
                    setCurrentSubTopic(subTopic);
                    setContent(subTopic?.content);
                  }}
                />

                <button
                  onClick={() => removeConcept(subTopic?._id)}
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
        <div key={video?._id} className="video-wrap">
          <div className="video-wrap-col-1">
            <div className="radio-wrap">
              <input
                type="radio"
                checked={video?.type === "video"}
                value="video"
                // onFocus={() => setCurrVideo(video)}
                // onBlur={() => editVideo()}
                // onChange={(e) =>
                //   setCurrVideo({ ...currVideo, type: e.target.value })
                // }
              />{" "}
              <p>Video</p>
            </div>
            <div className="radio-wrap">
              <input
                type="radio"
                checked={video?.type === "gif"}
                value="gif"
                // onFocus={() => setCurrVideo(video)}
                // onBlur={() => editVideo()}
                // onChange={(e) =>
                //   setCurrVideo({ ...currVideo, type: e.target.value })
                // }
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
                  currVideo?._id === video?._id
                    ? currVideo?.title
                    : video?.title
                }
                onChange={(e) =>
                  setCurrVideo({ ...currVideo, title: e.target.value })
                }
                onFocus={() => setCurrVideo(video)}
                onBlur={() => editVideo()}
              />
            </div>
            <div className="text-wrap">
              <label>Video URL</label>
              <input
                type="text"
                placeholder="URL"
                value={
                  currVideo?._id === video?._id ? currVideo?.link : video?.link
                }
                onChange={(e) =>
                  setCurrVideo({ ...currVideo, link: e.target.value })
                }
                onFocus={() => setCurrVideo(video)}
                onBlur={() => editVideo()}
              />
            </div>
            <button
              className="remove-video-btn"
              onClick={() => removeVideo(video?._id)}
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
            <div key={subTopic?._id}>{parse(subTopic?.content)}</div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Concept;
