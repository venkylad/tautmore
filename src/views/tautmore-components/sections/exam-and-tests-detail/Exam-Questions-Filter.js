import React, { useEffect, useState } from "react";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Row, Col
} from "reactstrap";
import { ChevronDown } from "react-feather";
import { history } from "../../../../history";
import "./ExamAndTestDetails.scss";
import Select from "react-select";
import {
  getChapterData,
  getAddedByData,
} from "../../services/apis/tautmore_exams_apis/tautmore_exams_apis";

const ExamQuestionFilter = ({
  handleSearchtext,
  marksAdded,
  handleSearchTaut,
  examId,
  subNameId,
  chapter,
  handleChapter,
  difficulty,
  handledifficulty,
  addedBy,
  handleAddedBy,
}) => {
  const [chapterList, setChapterList] = useState([]);
  const [addedByList, setAddedByList] = useState([]);

  console.log(subNameId);
  const handleSearchtextFilter = (value) => {
    console.log(value);
    if (value.length >= 3) {
      handleSearchtext(value);
      let urlPrefix = `/add-questions-to-exam/${examId}`;
      history.push(`${urlPrefix}?page=1`, subNameId);
    } else {
      handleSearchtext(value);
    }
  };

  const handleSearchIdFilter = (value) =>{
    if(value.length >= 3){
      handleSearchTaut(value);
      let urlPrefix = `/add-questions-to-exam/${examId}`;
      history.push(`${urlPrefix}?page=1`, subNameId);
    } else {
      handleSearchTaut(value);
    }
  }

  const getChapterList = async (subNameId) => {
    console.log(subNameId);
    try {
      const res = await getChapterData({ subject_id: subNameId.id });
      if (res.status === 200) {
        let temp = res.data && res.data.chapters;
        console.log(temp);
        let updatedArray = [
          {
            value: "Chapters",
            label: "Chapters",
            id: "",
          },
        ];
        temp.map((item) => {
          let obj = {
            value: item.name,
            label: item.name,
            id: item._id,
          };
          updatedArray.push(obj);
        });

        setChapterList(updatedArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAddedByList = async () => {
    const res = await getAddedByData();
    console.log(res);
    setAddedByList(res?.data?.data);
  };

  const changeChapter = (data) => {
    console.log(data);
    handleChapter(data.id);
    let urlPrefix = `/add-questions-to-exam/${examId}`;
    history.push(`${urlPrefix}?page=1`, subNameId);
  };

  const handledifficultyFilter = (val) => {
    handledifficulty(val);
    let urlPrefix = `/add-questions-to-exam/${examId}`;
    history.push(`${urlPrefix}?page=1`, subNameId);
  };

  const handleAddedByFilter = (val) => {
    handleAddedBy(val);
    let urlPrefix = `/add-questions-to-exam/${examId}`;
    history.push(`${urlPrefix}?page=1`, subNameId)
  }

  useEffect(() => {
    if (subNameId) {
      getChapterList(subNameId);
      getAddedByList();
    }
  }, []);

  return (
    <div>
      <Row>
        <Col sm="6">
        <div style={{display:'inline-flex'}}>
      <div className="filter-section custom-filtersection" style={{marginRight:'30px'}}>
        <Input
          type="text"
          placeholder="Search by Title"
          onChange={(e) => handleSearchtextFilter(e.target.value)}
        />
      </div>

      <div className="filter-section custom-filtersection">
        <Input
          type="text"
          placeholder="Search by Tautmore id"
          onChange={(e) => handleSearchIdFilter(e.target.value)}
        />
      </div>
      </div>
        </Col>
        <Col sm="6">
        <div className="examMarksData">
          <div>
          <h1>Exam Total marks</h1>
          <h3>{localStorage.getItem('totalmarks')}</h3>
          </div>
          
          <div>
          <h1>Marks Added</h1>
          <h3>{marksAdded}</h3>
          </div>
         
          </div>
        </Col>
      </Row>
      
      <div className="data-list-header pull-right d-flex justify-content-between flex-wrap datalistExam">
        <div className="actions-right rp-manageSchool-head-main d-flex flex-wrap mt-sm-0 mt-2">
          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              <span className="align-middle mx-50 adminfilterSpan">
                {subNameId.name}
              </span>
            </DropdownToggle>
          </UncontrolledDropdown>

          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <Select
              className="subconcept-select"
              classNamePrefix="select"
              value={chapter.name}
              onChange={changeChapter}
              options={chapterList}
              placeholder="Chapter"
            ></Select>
          </UncontrolledDropdown>

          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              {difficulty ? difficulty : "Difficulty"}
              <ChevronDown size={16} />
            </DropdownToggle>
            <DropdownMenu className="customadmindropdown" tag="div" right>
              <DropdownItem tag="a" onClick={() => handledifficultyFilter("")}>
                Difficulty
              </DropdownItem>
              <DropdownItem onClick={() => handledifficultyFilter("high")}>
                High
              </DropdownItem>
              <DropdownItem onClick={() => handledifficultyFilter("medium")}>
                Medium
              </DropdownItem>
              <DropdownItem onClick={() => handledifficultyFilter("low")}>
                Low
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              {addedBy ? addedBy?.name : "Added By"}
              <ChevronDown size={16} />
            </DropdownToggle>
            <DropdownMenu className="customadmindropdown" tag="div" right>
              <DropdownItem
                tag="a"
                onClick={() =>
                  handleAddedByFilter({ _id: "", name: "Added By" })
                }
              >
                Added By
              </DropdownItem>
              {addedByList?.length &&
                addedByList?.map((admin) => (
                  <DropdownItem tag="a" key={admin._id} onClick={() => handleAddedByFilter(admin)}>
                    {admin?.name}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </div>
  );
};

export default ExamQuestionFilter;
