import React, { useEffect, useState } from "react";
import DataListConfig from "./Exam-And-Test-AddQuestion";
import { useParams } from "react-router-dom";
import { getExamQuestions, addExamQuestions } from "../../services/apis/tautmore_exams_apis/tautmore_exams_apis";
import queryString from "query-string";
import ExamQuestionFilter from "./Exam-Questions-Filter";
import { useLocation } from "react-router-dom";
import {
    Button,
  } from "reactstrap";
  import { toast, ToastContainer } from "react-toastify";  

const ListView = (props) => {
  const location = useLocation();
  const [examQuestions, setExamQuestions] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const params = useParams();
  const [searchtext, setSearchtext] = useState("");
  const [resultText, setResultText] = useState("Searching for content..");
  // const [subNameId, setSubNameId] = useState({});
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
        difficulty: difficulty,
        chapter: chapter,
        addedBy: addedBy._id,
        tautmoreId:searchTaut
      };
      const res = await getExamQuestions(data);
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

  const loadLocalData = () =>{
    const questionMarks = JSON.parse(localStorage.getItem('selectedQuedata'))
    let count=0;
    questionMarks.map((data) =>{
      count = count + data.marks;
    })
    setMarksAdded(count)
  }

  useEffect(()=>{
    let localInfo = JSON.parse(localStorage.getItem("tautmore-user"));
    setLocalData(localInfo);
  },[])
 

  const examDetailsComp = () =>{
    localStorage.removeItem('selectedQuedata');
    localStorage.removeItem('totalmarks')
    props.history.push(`/regular-exams/${params.id}`)
  }

  const UpdateList = async (data, marks, id) =>{
      // console.log(data,marks,id)
      const marksData = localStorage.getItem('totalmarks')
      const queIds = JSON.parse(data);
      const dataId = queIds.map((id)=>id.id);
      if(marks == marksData){
        try{
          const res = await addExamQuestions({examId:id,questions:dataId})
          if(res.status === 200){
              toast.success("Questions added to Exams");
              localStorage.removeItem('selectedQuedata');
              localStorage.removeItem('totalmarks')
              props.history.push(`/regular-exams/${params.id}`)
          }
        }catch(error){
            toast.error(error.message)
        }
      }else{
        toast.error("added question marks is not matching to total exam marks")
      }
      
      
  }

  useEffect(() => {
    loadData();
    loadLocalData();
    // setSubNameId(props.location.state)
  }, [paginateData.page, searchtext, chapter, difficulty, addedBy, searchTaut]);

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
        {localData?.access?.["map-questions-to-exam"] == true ? (
          <Button
          className="examDelEdit 1111"
          onClick={() => {
            UpdateList(localStorage.getItem('selectedQuedata'), marksAdded, params.id);
          }}
        >
          {/* <Edit height="18" width="18" /> */}
          <span className="tautmore-admin-add-btn">Update List</span>
        </Button>
        ) : ('')}
        

        <Button
          className=" 1111 examDelEdit"
          onClick={examDetailsComp}
        >
          {/* <Delete height="18" width="18" /> */}
          <span className="tautmore-admin-add-btn">Cancel</span>
        </Button>
      </div>
      <ToastContainer draggable={false} />
    </div>
  );
};

export default ListView;
