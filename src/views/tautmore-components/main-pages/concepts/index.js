import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  UncontrolledDropdown,
} from "reactstrap";
import {
  getChaptersBySubjectAction,
  getClassByBoardAction,
  getConceptByChapterAction,
  getSubjectsByClassAction,
  selectForContentAction,
} from "../../../../redux/actions/boards-sidebar";
import classnames from "classnames";
import "../question-list/data-list/operator/Operator.scss";
import "../question-list/data-list/DataList.scss";
import { ChevronDown } from "react-feather";
import { clientUrl } from "../../services/api-fetch/Axios";
import "./concept.css";
import { Link, useHistory } from "react-router-dom";

const Concepts = () => {
  const history = useHistory();

  const board = useSelector((state) => state?.selectBoard);
  const grades = useSelector((state) => state?.getClassByBoard);
  const subjects = useSelector((state) => state?.getSubjectsByClass);
  const chapters = useSelector((state) => state?.getChaptersBySubject);
  const concepts = useSelector((state) => state?.getConceptsByChapter);

  const dispatch = useDispatch();
  const [activeClass, setActiveClass] = useState({});
  const [subjectVal, setSubjectVal] = useState({});
  const [chapterVal, setChapterVal] = useState({});
  const [conceptVal, setConceptVal] = useState({});
  const [subConcepts, setSubConcepts] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [redirect, setRedirect] = useState("/manage-boards");

  const fetchConcepts = async (id) => {
    setLoading(true);
    await axios
      .get(
        `${clientUrl}/api/admin/subconcepts-listing?class=${
          activeClass?._id
        }&subject=${subjectVal?._id || ""}&page_no=${pageNum}&chapter=${
          chapterVal?._id || ""
        }&concept=${conceptVal?._id || ""}`
      )
      .then(({ data }) => setSubConcepts(data?.data[0]?.response))
      .catch((err) =>
        setTimeout(() => setError({ error: true, message: err.message }), 3500)
      );
    setLoading(false);
  };

  const fetchContent = async (subject, subConcept) => {
    setRedirect("");
    const { data } = await axios.get(
      `${clientUrl}/api/admin/content-and-video-details?subject=${subject}&subConcept=${subConcept}`
    );
    if (data?.data?.contents?.length > 0 || data?.data?.videos?.length > 0) {
      history.push("/manage-subconcepts-preview");
    } else {
      history.push("/manage-subconcepts");
    }
  };

  useEffect(() => {
    if (!activeClass?.name) {
      setActiveClass(grades[0]);
    }
    console.log("loop-3");
  }, [grades]);

  useEffect(() => {
    if (!subjectVal?.name) {
      setSubjectVal(subjects[0]);
    }
    fetchConcepts();
    console.log("loop-2");
  }, [conceptVal, pageNum, subjects, chapterVal, subjectVal, activeClass]);

  useEffect(() => {
    dispatch(getClassByBoardAction(board?._id));
    dispatch(getSubjectsByClassAction(activeClass?._id));
    dispatch(getChaptersBySubjectAction(subjectVal?._id));
    dispatch(getConceptByChapterAction(chapterVal?._id));
    setSubConcepts([]);
    console.log("loop-1");
  }, [board, activeClass, subjectVal, chapterVal, conceptVal]);

  return (
    <div>
      <Nav tabs className="questionsTab">
        <div className="payments-nav-bottom-border"></div>
        {grades?.map((item, i) => (
          <NavItem key={i}>
            <NavLink
              className={classnames(
                `${activeClass?._id === item?._id ? "active" : ""}`
              )}
              onClick={() => {
                setActiveClass(item);
              }}
            >
              Class {item?.name}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <div className="field-wrap">
        <UncontrolledDropdown
          className="data-list-rows-dropdown rp-manageSchool-head-Opquest mr-1 d-md-block d-none"
          disabled={subjects?.length === 0}
        >
          <h4>Subjects</h4>
          <DropdownToggle color="" className="sort-dropdown">
            {/* <span className="align-middle mx-50 adminfilterOpquestSpan"> */}
            {subjectVal?.name || "Subjects"}
            {/* </span> */}
            <ChevronDown size={16} />
          </DropdownToggle>
          <DropdownMenu className="customadmindropdown" tag="div" right>
            {subjects?.map((item) => (
              <DropdownItem
                key={item?._id}
                onClick={() => {
                  setSubjectVal(item);
                  setChapterVal({});
                  setConceptVal({});
                }}
              >
                {item?.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown
          className="data-list-rows-dropdown rp-manageSchool-head-Opquest mr-1 d-md-block d-none"
          disabled={chapters?.length === 0}
        >
          <h4>Chapters</h4>
          <DropdownToggle color="" className="sort-dropdown">
            {/* <span className="align-middle mx-50 adminfilterOpquestSpan"> */}
            {chapterVal?.name || "Chapters"}
            {/* </span> */}
            <ChevronDown size={16} />
          </DropdownToggle>
          <DropdownMenu className="customadmindropdown" tag="div" right>
            {chapters?.map((item) => (
              <DropdownItem
                key={item?._id}
                onClick={() => {
                  setChapterVal(item);
                  setConceptVal({});
                }}
              >
                {item?.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown
          className="data-list-rows-dropdown rp-manageSchool-head-Opquest mr-1 d-md-block d-none"
          disabled={concepts?.length === 0}
        >
          <h4>Concepts</h4>
          <DropdownToggle color="" className="sort-dropdown">
            {/* <span className="align-middle mx-50 adminfilterOpquestSpan"> */}
            {conceptVal?.name || "Concepts"}
            {/* </span> */}
            <ChevronDown size={16} />
          </DropdownToggle>
          <DropdownMenu className="customadmindropdown" tag="div" right>
            {concepts?.map((item) => (
              <DropdownItem key={item?._id} onClick={() => setConceptVal(item)}>
                {item?.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
        <div className="discountfilter-section custom-filtersection">
          <h4>Search</h4>
          <form onSubmit={() => {}}>
            <Input
              type="text"
              placeholder="Search by name"
              name="search-text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      </div>

      <TabContent>
        <div className="tab-content">
          <div className="labels">
            <p className="name">Subconcept Name</p>
            <p>Class</p>
            <p>Subject</p>
            <p>View & Edit</p>
          </div>
          {loading ? (
            <div className="tab_item">
              <div className="name">
                {/* {error?.error
                  ? "Error: ".concat(error?.message)
                  : "Loading ..."} */}
                Loading ...
              </div>
            </div>
          ) : (
            subConcepts
              ?.filter((val) => {
                if (search === "") {
                  return val;
                } else if (
                  val?.name?.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              ?.map((item, i) => {
                const data = {
                  subConcept: item._id,
                  subject: subjectVal._id,
                };
                return (
                  <div className="tab_item" key={i}>
                    <div className="name">
                      <p>{item?.name}</p>
                    </div>
                    <p>{activeClass?.name}</p>
                    <p>{subjectVal?.name}</p>
                    <div
                      className="link-text"
                      onClick={() => {
                        dispatch(selectForContentAction(data));
                        fetchContent(subjectVal?._id, item?._id);
                      }}
                    >
                      View & Edit
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </TabContent>
      {subConcepts?.length > 0 && (
        <div className="pagination-wrap">
          <button
            className="pag-btn"
            disabled={pageNum <= 1}
            onClick={() => setPageNum(pageNum - 1)}
          >
            {"<< Prev"}
          </button>
          <button className="pag-btn" onClick={() => setPageNum(pageNum + 1)}>
            {"Next >>"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Concepts;
