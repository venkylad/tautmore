import React, { useState } from "react";
import "./Manageimage.scss";
import { Image, Copy, Trash2 } from "react-feather";
import { Row, Col } from "reactstrap";
import { getFileName } from "../../forms/question-form/mockData/fileNameHelper";

const Manageimage = () => {
  const [alldata, setAlldata] = useState([]);

  let inputFile = "";

  const uploadClick = (e) => {
    e.preventDefault();
    inputFile.click();
  };

  const uploadImage = (e) => {
    e.persist();

    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];
      let reader = new FileReader();

      reader.onloadend = function () {
        const data = {
          file_name: getFileName(file?.name),
          base64_file: reader.result,
        };
        fetch(
          "https://y1z2gzytv3.execute-api.us-east-2.amazonaws.com/development/api/image/upload",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);

            setAlldata((oldItems) => {
              return [...oldItems, data.response];
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = (id) => {
    const todos = alldata.filter((todo, todoIndex) => {
      return todoIndex !== id;
    });

    setAlldata(todos);
  };

  console.log(alldata, "alldata");

  return (
    <div className="manage-image-main">
      <h4>Manage images</h4>
      <div className="manage-image">
        <h5>Upload your images</h5>
        <p>PNG, JPG and JPEG files are allowed</p>
        <div className="manage-image-sub">
          <input
            type="file"
            style={{ display: "none" }}
            ref={(input) => {
              inputFile = input;
            }}
            onChange={uploadImage}
            accept=".png,.jpg,.jpeg,.gif"
            name="filestore"
            multiple
          />
          <button onClick={uploadClick}>
            <Image className="menu-toggle-icon" size={20} /> Upload image
          </button>

          {alldata.map((data, id) => {
            return (
              <div className="upload-image" key={data}>
                <Row>
                  <Col sm={3} md={2}>
                    <img src={data} alt="taut_media" />
                  </Col>
                  <Col sm={7} md={8} className="upload-image-middle">
                    {data}
                  </Col>
                  <Col sm={2} md={2}>
                    <Copy
                      size={20}
                      onClick={() => navigator.clipboard.writeText(data)}
                      className="copy-icon"
                    />
                    <Trash2 size={20} onClick={() => deleteImage(id)} />
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Manageimage;
