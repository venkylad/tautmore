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
} from "../../../../redux/actions/boards-sidebar";
import classnames from "classnames";
import "../question-list/data-list/operator/Operator.scss";
import "../question-list/data-list/DataList.scss";
import { ChevronDown } from "react-feather";
import { clientUrl } from "../../services/api-fetch/Axios";
import "./concept.css";
import { Link } from "react-router-dom";

const Concepts = () => {
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

  const fetchConcepts = async (id) => {
    const { data } = await axios.get(
      `${clientUrl}/api/admin/subconcepts-listing?class=${activeClass?._id}&subject=${subjectVal?._id}&page_no=1&chapter=${chapterVal?._id}&concept=${conceptVal?._id}`
    );
    setSubConcepts(data?.data[0]?.response);
  };

  const fetchGrades = async () => {};

  useEffect(() => {
    dispatch(getClassByBoardAction(board?._id));
    dispatch(getSubjectsByClassAction(activeClass?._id));
    dispatch(getChaptersBySubjectAction(subjectVal?._id));
    dispatch(getConceptByChapterAction(chapterVal?._id));
    setSubConcepts([]);
    console.log("loop-1");
  }, [board, activeClass, subjectVal, chapterVal, conceptVal]);

  useEffect(() => {
    fetchConcepts();
    console.log("loop-2");
  }, [conceptVal]);

  useEffect(() => {
    if (!activeClass?.name) {
      setActiveClass(grades[0]);
    }
    console.log("loop-3");
  }, [grades]);

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
              {item?.name}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <div className="field-wrap">
        <UncontrolledDropdown
          className="data-list-rows-dropdown rp-manageSchool-head-Opquest mr-1 d-md-block d-none"
          disabled={subjects?.length === 0}
        >
          <DropdownToggle color="" className="sort-dropdown">
            {/* <span className="align-middle mx-50 adminfilterOpquestSpan"> */}
            {subjectVal?.name || "Subjects"}
            {/* </span> */}
            <ChevronDown size={16} />
          </DropdownToggle>
          <DropdownMenu className="customadmindropdown" tag="div" right>
            {subjects?.map((item) => (
              <DropdownItem key={item?._id} onClick={() => setSubjectVal(item)}>
                {item?.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown
          className="data-list-rows-dropdown rp-manageSchool-head-Opquest mr-1 d-md-block d-none"
          disabled={chapters?.length === 0}
        >
          <DropdownToggle color="" className="sort-dropdown">
            {/* <span className="align-middle mx-50 adminfilterOpquestSpan"> */}
            {chapterVal?.name || "Chapters"}
            {/* </span> */}
            <ChevronDown size={16} />
          </DropdownToggle>
          <DropdownMenu className="customadmindropdown" tag="div" right>
            {chapters?.map((item) => (
              <DropdownItem key={item?._id} onClick={() => setChapterVal(item)}>
                {item?.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown
          className="data-list-rows-dropdown rp-manageSchool-head-Opquest mr-1 d-md-block d-none"
          disabled={concepts?.length === 0}
        >
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
          <form onSubmit={() => {}}>
            <Input
              type="text"
              placeholder="Search by name"
              name="search-text"
              value={""}
              onChange={(e) => {}}
            />
          </form>
        </div>
      </div>

      <TabContent>
        <div className="tab-content">
          {subConcepts?.map((item, i) => (
            <div className="tab_item" key={i}>
              <div className="name">
                <p>{item?.name}</p>
              </div>
              <p>{activeClass?.name}</p>
              <p>{subjectVal?.name}</p>
              <Link to="/manage-subconcepts">More Info </Link>
            </div>
          ))}
        </div>
      </TabContent>
    </div>
  );
};

export default Concepts;
