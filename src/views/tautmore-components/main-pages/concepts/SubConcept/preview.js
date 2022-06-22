import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clientUrl } from "../../../services/api-fetch/Axios";
import parse from "html-react-parser";
import "./styles.css";
import { Link } from "react-router-dom";
import { selectForContentAction } from "../../../../../redux/actions/boards-sidebar";

const Preview = () => {
  const [subTopics, setSubTopics] = useState([]);
  const [videos, setVideos] = useState([]);

  const dispatch = useDispatch();

  const { subject, subConcept } = useSelector(
    (state) => state.selectForContent
  );
  const fetchSubtopics = async () => {
    const { data } = await Axios.get(
      `${clientUrl}/api/admin/content-and-video-details?subject=${subject}&subConcept=${subConcept}`
    );
    setSubTopics(data?.data?.contents);
    setVideos(data?.data?.videos);
  };

  useEffect(() => {
    fetchSubtopics();
  }, []);
  return (
    <>
      <div className="btn-wrp">
        <Link to="/manage-subconcepts">
          <button
            className="edit-btn"
            onClick={() => {
              dispatch(
                selectForContentAction({
                  subConcept,
                  subject,
                })
              );
            }}
          >
            Edit Content
          </button>
        </Link>
      </div>
      <div className="preview-content">
        <h2>Preview</h2>
        {subTopics?.map((subTopic) => (
          <div key={subTopic?._id}>{parse(subTopic?.content)}</div>
        ))}
      </div>
      <div className="preview-video">
        <h2>Video</h2>
        {videos?.map((video) => (
          <div className="video-block">
            <div>
              <h5>Title:</h5>
              <p> {video?.title}</p>
            </div>
            <div>
              <h5>URL: </h5>
              <p>{video?.link}</p>
            </div>
            <div>
              <h5>Type:</h5>
              <p> {video?.type || "video"}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Preview;
