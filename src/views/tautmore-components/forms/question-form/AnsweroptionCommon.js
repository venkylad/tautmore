import React from "react";
import { string } from "prop-types";
import { Row, Col, Input } from "reactstrap";
import { Menu, Minus, Image, X } from "react-feather";
import { checkIfImageLink, checkDragDropSnunscramble } from "./questionHelper";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-classic-with-mathtype";
import MyCustomUploadAdapterPlugin from "./uploadCustomPlugin";
import { getFileName } from "./mockData/fileNameHelper";
import { uploadImageService } from "../../services/apis/image_api/upload-image";
import { clientUrl } from "../../services/api-fetch/Axios";
import { Editor } from "@tinymce/tinymce-react";

const AnsweroptionCommon = ({
  data,
  index,
  handleOptions,
  options,
  handleDragItem,
  dragItem,
  questiontype,
  selectedSub,
  questiondetail,
}) => {
  const removeImg = (e) => {
    e.preventDefault();
    const filteredData = options?.map((item) => {
      if (checkDragDropSnunscramble(questiontype)) {
        if (item?.id !== data?.id) {
          return item;
        }
        return { ...item, statementImage: "", checked: false };
      } else {
        if (item?.id !== data?.id) {
          return item;
        }
        return { ...item, image: "", checked: false };
      }
    });
    handleOptions(filteredData);
  };

  const removeStatementImg = (e) => {
    e.preventDefault();
    const filteredData = options?.map((item) => {
      if (checkDragDropSnunscramble(questiontype)) {
        if (item?.id !== data?.id) {
          return item;
        }
        return { ...item, image: "", checked: false };
      }
    });
    handleOptions(filteredData);
  };

  let imgFile = "";

  let statementImgFile = "";

  const addImage = (event) => {
    event.preventDefault();
    imgFile.click();
  };

  const addStatementImg = (event) => {
    event.preventDefault();
    statementImgFile.click();
  };

  const inputChange = (event) => {
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
            const filterData = options?.map((item) => {
              if (checkDragDropSnunscramble(questiontype)) {
                if (item?.id !== data?.id) {
                  return item;
                }
                return { ...item, statementImage: imgRes?.data.response };
              } else {
                if (item?.id !== data?.id) {
                  return item;
                }
                return { ...item, image: imgRes?.data?.response };
              }
            });
            handleOptions(filterData);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const statementChange = (event) => {
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
            const filterData = options?.map((item) => {
              if (checkDragDropSnunscramble(questiontype)) {
                if (item?.id !== data?.id) {
                  return item;
                }
                return { ...item, image: imgRes?.data?.response };
              }
            });
            handleOptions(filterData);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = (index) => {
    //  console.log("handleDragStart", index);
    handleDragItem(index);
  };

  const handleDragEnter = (e, index) => {
    // console.log("indexEnter",index);
    const newList = [...options];
    const item = newList[dragItem];
    // console.log("newList",newList,newList[dragItem]);
    newList.splice(dragItem, 1);
    // console.log("newList splice 1",newList);
    newList.splice(index, 0, item);
    // console.log("newList splice 0",newList , index , item);
    handleDragItem(index);
    // console.log("newList end",newList);
    handleOptions(newList);
  };
  const onDropItem = (e, index) => {
    // console.log("indexDrop",index,e);
    const newList = [...options];
    const item = newList[dragItem];
    console.log("newList", newList, item);
    newList.splice(dragItem, 1);
    console.log("newList splice 1", newList);
    //   newList.splice(index, 0, item);
    //  // console.log("newList splice 0",newList , index , item);
    //   handleDragItem(index);
    //  // console.log("newList end",newList);
    //   handleOptions(newList);
  };

  const removeOption = (id) => {
    const filteredOption = options.filter((option) => option.id !== id);
    handleOptions(filteredOption);
  };

  const handleSelect = (e, data) => {
    const checkOption = options.filter((item) => !item.checked);
    if (e.target.checked && checkOption.length === 1) return;
    const filteredData = options?.map((item) => {
      if (item?.id !== data.id) {
        // if (questiontype !== "multi") {
        //   return { ...item, checked: false };
        // }
        return item;
      }
      return { ...item, checked: !data?.checked };
    });
    handleOptions(filteredData);
  };

  const handleChange = (editor, data) => {
    // console.log("editor", editor.getData());
    const filteredData = options?.map((item) => {
      if (item?.id !== data?.id) {
        return item;
        console.log("item", item)
      }
      // console.log("editor.getData()", editor.getData());
      if (editor.getData().includes(`img`)) {
        const imgRex = /<img.*?src="(.*?)"/;
        var src = imgRex.exec(editor.getData());
        // return { ...item, image: src?.length > 0 ? src[1] : src };
        return {
          ...item,
          imageElement: editor.getData(),
          image: src?.length > 0 ? src[1] : src,
        };
      } else {
        return {
          ...item,
          imageElement: editor.getData(),
          text: editor.getData(),
          image: "",
        };
      }
    });
    handleOptions(filteredData);
  };
  const handleEditorChange = (editor, data, arg) => {
    // console.log("editor", editor.replace(arg.dom.select("img")[0], ""));
    // console.log(
    //   "editor",
    //   editor.replace(/<img[^>"']*((("[^"]*")|('[^']*'))[^"'>]*)*>/g, "")
    // );
    const filteredData = options?.map((item) => {
      if (item?.id !== data?.id) {
        return item;
      }
      if (editor?.includes(`img`)) {
        // const imgRex =  /<img.*?src="(.*?)"/;
        const imgRex = /<img.*?src="(.*?)"/;
        var src = imgRex.exec(editor);
        // return { ...item, image: src?.length > 0 ? src[1] : src };
        return {
          ...item,
          image: src?.length > 0 ? src[1] : src,
          imageElement: editor,
          text: editor.replace(
            /<img[^>"']*((("[^"]*")|('[^']*'))[^"'>]*)*>/g,
            ""
          ),
        };
      } else {
        return { ...item, imageElement: editor, text: editor, image: "" };
      }
    });
    handleOptions(filteredData);
  };

  const dragStatementChange = (e, data) => {
    const filteredData = options?.map((item) => {
      if (item?.id !== data?.id) {
        return item;
      }
      return { ...item, text: e.target.value };
    });
    handleOptions(filteredData);
  };

  const dragHandleChange = (event, data) => {
    const filteredData = options?.map((item) => {
      if (item?.id !== data?.id) {
        return item;
      }
      return { ...item, statementText: event.target.value };
    });
    handleOptions(filteredData);
  };

  return (
    <div>
      <div
        className={`option active ${!checkDragDropSnunscramble(questiontype) &&
          checkIfImageLink(data.image) &&
          "add-image"
          }`}
        onDragEnter={(e) => handleDragEnter(e, index)}
        onDrag={() => handleDragStart(index)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDropItem(e, index)}
        draggable
      >
        <Row
          className={`${checkDragDropSnunscramble(questiontype) ? "drag-row-main" : ""
            }`}
        >
          <Col
            sm={`${checkDragDropSnunscramble(questiontype) ? "7" : "5"}`}
            className="option-top"
          >
            <Row>
              <Col sm={1} xs={12}>
                <Menu size={13} />
              </Col>
              <Col sm={1} xs={12}>
                <div className="minus" onClick={() => removeOption(data?.id)}>
                  <Minus size={12} />
                </div>
              </Col>
              <Col
                sm={`${checkDragDropSnunscramble(questiontype) ? "10" : "8"}`}
                xs={12}
                className="option-name"
              >
                <span className="opt-indx">
                  {String.fromCharCode(65 + index)}
                </span>
                {!checkDragDropSnunscramble(questiontype) ? (
                  <>
                    {/* <div className="text-area-part text-part">
                      <Input
                        type="textarea"
                        value={data?.text}
                        onChange={(e) => handleChange(e, data)}
                        placeholder="Enter option"
                      />
                    </div> */}
                    {checkIfImageLink(data?.image) && (
                      <div className="text-area-part image-part">
                        {/* <img src={data?.image} alt={`option_media_${index}`} /> */}
                        {/* <button onClick={removeImg}>
                    <X size={15} color="red" />
                  </button> */}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Input
                      type="textarea"
                      className="drag-and-drop-input"
                      value={data?.text}
                      onChange={(e) => dragStatementChange(e, data)}
                      placeholder="Enter statement"
                    />
                    {checkIfImageLink(data.image) && (
                      <div className="text-area-part">
                        <img src={data?.image} alt={`option_media_${index}`} />
                      </div>
                    )}
                  </>
                )}

                {checkDragDropSnunscramble(questiontype) &&
                  (checkIfImageLink(data.image) ? (
                    <button className="image-btn" onClick={removeStatementImg}>
                      <X size={15} color="red" />
                    </button>
                  ) : (
                    <button className="image-btn" onClick={addStatementImg}>
                      <Image size={15} />+ Statement image
                    </button>
                  ))}
              </Col>
            </Row>
          </Col>
          <Col
            sm={`${checkDragDropSnunscramble(questiontype) ? "5" : "7"}`}
            className={`option-bottom ${checkDragDropSnunscramble(questiontype) ? "drag-bottom" : ""
              }`}
          >
            <Row>
              <Col
                sm={!checkDragDropSnunscramble(questiontype) ? 6 : 12}
                xs={12}
                className={`add-img ${checkDragDropSnunscramble(questiontype) &&
                    checkIfImageLink(data.statementAns)
                    ? "drag-active"
                    : ""
                  }`}
              >
                <input
                  type="file"
                  ref={(input) => {
                    imgFile = input;
                  }}
                  onChange={(event) => inputChange(event)}
                  style={{ display: "none" }}
                  name="filestore"
                  accept=".png,.jpg,.jpeg,.gif"
                />

                <input
                  type="file"
                  ref={(input) => {
                    statementImgFile = input;
                  }}
                  onChange={(event) => statementChange(event)}
                  style={{ display: "none" }}
                  name="statementfilestore"
                  accept=".png,.jpg,.jpeg,.gif"
                />

                {checkDragDropSnunscramble(questiontype) && (
                  <>
                    <Input
                      type="textarea"
                      className="drag-and-drop-input"
                      value={data?.statementText}
                      onChange={(e) => dragHandleChange(e, data)}
                      placeholder="Enter option"
                    />
                    {checkIfImageLink(data.statementImage) && (
                      <div className="text-area-part">
                        <img
                          src={data?.statementImage}
                          alt={`option_media_${index}`}
                        />
                      </div>
                    )}
                  </>
                )}
                {!checkDragDropSnunscramble(
                  questiontype
                ) ? null : checkIfImageLink(data.statementImage) ? ( // ) //   </button> //     <Image size={15} />+ Add image //   <button onClick={addImage}> // ) : ( //   </button> //     <X size={15} color="red" /> //   <button onClick={removeImg}> // checkIfImageLink(data.image) ? (
                  <button onClick={removeImg}>
                    <X size={15} color="red" />
                  </button>
                ) : (
                  <button onClick={addImage}>
                    <Image size={15} />+ Option image
                  </button>
                )}
              </Col>
              {!checkDragDropSnunscramble(questiontype) && (
                <Col sm="6" xs={12} className="right-answer">
                  <span
                    className={`radio-label-name ${data?.checked ? "active" : ""
                      }`}
                  >
                    Right answer
                  </span>
                  <label className="radio-label" htmlFor={data?.id}>
                    <input
                      type="checkbox"
                      name="radio"
                      id={data?.id}
                      checked={data?.checked}
                      onChange={(e) => handleSelect(e, data)}
                    />
                    <span className="checkmark"></span>
                  </label>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
        {!checkDragDropSnunscramble(questiontype) && (
          <Row>
            <Col style={{ margin: "10px" }}>
              {/* {console.log('questiondetail?.subjectName',questiondetail?.subjectName,selectedSub)} */}

              <Editor
                apiKey="u9fzm8p2l3qt4b1k1vwv6gktzge0ynqu3c7nuxdyo2hroawd"
                // initialValue={data?.text !== "" ? data?.text : ""}
                value={data?.imageElement}
                // onChange={(e) => dragHandleChange(e, data)}
                // value={data?.text + (data?.image && `<img src="` + data?.image + `" alt=""/>`)}

                init={{
                  height: 300,
                  menubar: true,
                  config: {},
                  noneditable_editable_class: "is-editable",
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
                          //  console.log(response,file);
                          // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
                          var url = response?.response;
                          // console.log(url,"file.name",file.name )
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
                onEditorChange={(editor, arg) =>
                  handleEditorChange(editor, data, arg)
                }
              />

              {/* {console.log(data?.text + (data?.image && `<figure class="image"><img src="` + data?.image + `"></figure>`))} */}
            </Col>
          </Row>
        )}
      </div>

      <span className="option-error">{data.error}</span>
    </div>
  );
};

AnsweroptionCommon.propTypes = {
  questiontype: string.isRequired,
};

export default AnsweroptionCommon;
