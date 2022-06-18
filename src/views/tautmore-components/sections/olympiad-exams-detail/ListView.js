import React, { useEffect, useState } from "react";
import { getOlympiadExamQuestions, updateOlympiadQueToExams } from "../../services/apis/tautmore_exams_apis/tautmore_exams_apis";
import { useParams } from "react-router-dom";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import DataListConfig from "./Olympiad-Exam-AddQuestion";
import ExamQuestionFilter from "./Olympiad-Exam-Que-Filter";
import {
    Button,
  } from "reactstrap";
  import { toast, ToastContainer } from "react-toastify";  

const ListView = (props) => {
  const [examQuestions, setExamQuestions] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const params = useParams();
  const [searchtext, setSearchtext] = useState("");
  const [resultText, setResultText] = useState("Searching for content..");
  // const [subNameId, setSubNameId] = useState({});
  const [subject, setSubject] = useState([]);
  const [chapter, setChapter] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [addedBy, setAddedBy] = useState("");
  // const [selectedQue, setSelectedQue] = useState([]);
  const [searchTaut, setSearchTaut] = useState("");
  const [marksAdded, setMarksAdded] = useState([]);
  const [localData, setLocalData] = useState({});

  const paginateData = queryString.parse(props.location.search);

  const loadData = async () => {
    try {
      const data = {
        examId: params.id,
        page_no: paginateData?.page ? paginateData.page : 1,
        searchText: searchtext,
        difficultyLevel: difficulty,
        subjects: subject,
        chapter: chapter,
        addedBy: addedBy._id,
        tautmoreId: searchTaut,
      };
      const res = await getOlympiadExamQuestions(data);
      if (res.status === 200) {
        const data = res?.data?.data?.response;
        setExamQuestions(res?.data?.data?.response);
        setTotalPage(Math.ceil(res?.data?.data?.count[0]?.count / 10));
        // setSelectedQue(res?.data?.data?.existingQuestions);
        // setSelectedQue(JSON.parse(localStorage.getItem('selectedQuedata')))
        // localStorage.setItem('selectedQuestions',res?.data?.data?.existingQuestions)
        if (!data.length) {
          setResultText("No Questions found");
        }
      }
    } catch (error) {
      setResultText("No Questions found");
      console.log(error);
    }
  };

  const UpdateList = async (data, marks, id) =>{
      console.log(data,marks,id);
      const marksData = localStorage.getItem('Olympiadtotalmarks')
      const queIds = JSON.parse(data);
      const dataId = queIds.map((id)=>id.id);
      if(marks == marksData){
        try{
          const res = await updateOlympiadQueToExams({examId:id,questions:dataId})
          if(res.status === 200){
              toast.success("Questions added to Exams");
              localStorage.removeItem('selectedOlympiadQuedata');
              localStorage.removeItem('Olympiadtotalmarks')
              props.history.push(`/olympiad-exams/${params.id}`)
          }
        }catch(error){
            toast.error(error.message)
        }
      }else{
        toast.error("added question marks is not matching to total exam marks")
      }
  }

  const loadLocalData = () => {
    const questionMarks = JSON.parse(
      localStorage.getItem("selectedOlympiadQuedata")
    );
    let count = 0;
    questionMarks.map((data) => {
      count = count + data.marks;
    });
    setMarksAdded(count);
  };

  const examDetailsComp = () =>{
    // localStorage.removeItem('selectedOlympiadQuedata');
    // localStorage.removeItem('Olympiadtotalmarks')
    props.history.push(`/olympiad-exams/${params.id}`)
  }

  useEffect(()=>{
    let localInfo = JSON.parse(localStorage.getItem("tautmore-user"));
    setLocalData(localInfo);
  },[])

  useEffect(() => {
    loadData();
    loadLocalData();
    // setSubNameId(props.location.state)
  }, [paginateData.page, searchtext, chapter, subject, difficulty, addedBy, searchTaut]);

  const renderFilter = () => (
    <ExamQuestionFilter
      searchtext={searchtext}
      marksAdded={marksAdded}
      handleSearchtext={setSearchtext}
      searchTaut={searchTaut}
      handleSearchTaut={setSearchTaut}
      examId={params.id}
      subNameId={props.location.state}
      chapter={chapter}
      handleChapter={setChapter}
      subject={subject}
      handleSubject={setSubject}
      difficulty={difficulty}
      handledifficulty={setDifficulty}
      addedBy={addedBy}
      handleAddedBy={setAddedBy}
    />
  );

  return (
    <div>
      <DataListConfig
        examQuestions={examQuestions}
        loadLocalData={loadLocalData}
        renderFilters={renderFilter}
        totalPage={totalPage}
        examId={params.id}
        resultText={resultText}
        subNameId={props.location.state}
        // selectedQue={selectedQue}
        // setSelectedQue={setSelectedQue}
        parsedFilter={queryString.parse(props.location.search)}
      ></DataListConfig>

      <div className="examAndQueUpdateCan">
        {localData?.access?.["map-questions-to-exam"] == true ? 
        (
          <Button
          className="examDelEdit 1111"
          onClick={() => {
            UpdateList(
              localStorage.getItem("selectedOlympiadQuedata"),
              marksAdded,
              params.id
            );
          }}
        >
          {/* <Edit height="18" width="18" /> */}
          <span className="tautmore-admin-add-btn">Update List</span>
        </Button>
        ) : ('')}
        

        <Button className=" 1111 examDelEdit" onClick={examDetailsComp}>
          {/* <Delete height="18" width="18" /> */}
          <span className="tautmore-admin-add-btn">Cancel</span>
        </Button>
      </div>
      <ToastContainer draggable={false} />
    </div>
  );
};

export default ListView;
