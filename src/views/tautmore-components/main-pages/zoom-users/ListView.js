import React, {useEffect, useState} from 'react';
import {Row,Col} from 'reactstrap';
import AddNewAdminButton from "../../utility/buttons/Button";
import './ZoomUsers.scss';
import classnames from "classnames";
import Sidebar from '../../forms/zoom-form/Zoom-AddEdit-Form';
import "../../../../assets/scss/pages/data-list.scss";
import queryString from "query-string";
import { getUsersList } from '../../services/apis/zoom-api/zoom_api';
import ZoomDataList from './ZoomDataList';
import ZoomFilter from './ZoomFilter';

const ListView = (props) =>{
    const [sidebar, setSidebar] = useState(false);
    const [zoomList, setZoomList] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [resultText, setResultText] = useState("Searching for content..");
    const [searchtext, setSearchtext] = useState("");
    const [teacherAssign, setteacherAssign] = useState();

    const paginateData = queryString.parse(props.location.search)

    const getZoomUsersList = async () =>{
        const params = {
            page_no: paginateData?.page ? paginateData?.page : 1,
            searchText:searchtext,
            teacherAssigned:teacherAssign
        }
        try{
            setZoomList([]);
           setResultText("Searching for content..")
           const res = await getUsersList(params)
           if(res.status === 200){
               const zoomData = res?.data?.data[0]?.response;
               console.log(res?.data?.data?.response)
               setZoomList(res?.data?.data[0]?.response);
               setTotalPage(Math.ceil(res?.data?.data[0]?.count[0]?.count / 10));
               if (!zoomData.length) {
                   setResultText("No Users found");
                 } else {
                   setResultText("");
                 }
           }
        }catch(error){
            setResultText("No Users found");
        }
    }

    const renderFilter = () =>(
        <ZoomFilter
        handleSearchtext={setSearchtext}
        searchtext={searchtext}
        teacherAssign={teacherAssign}
        handleTeacherAssign={setteacherAssign}
        />
    )

    const handleSidebar = (value) => {
        console.log(value);
        setSidebar(value);
      };

    useEffect(()=>{
        getZoomUsersList()
    },[paginateData?.page, searchtext, teacherAssign])

    return(
        <React.Fragment>
            <div>
      <Row className="ml-0 mr-0 mb-1">
        <Col sm="8">
          <h2 className="discount-title">Zoom Hosts</h2>
        </Col>
        <Col sm="4" className="ZoomTotal-users">
        <div className="totalusersZoom">
            <AddNewAdminButton
              button_title=" Add Users"
              onClick={() => handleSidebar(true, true)}
            />
          </div>
        </Col>
      </Row>
      <div>
          {renderFilter()}
        <ZoomDataList
        zoomList={zoomList}
        totalPage={totalPage}
        resultText={resultText}
        getZoomUsersList={getZoomUsersList}
        parsedFilter={queryString.parse(props.location.search)}/>
      </div>
      {sidebar ? (
        <div className="data-list"
        >
          <Sidebar
            show={sidebar}
            isEditAble={false}
            handleSidebar={handleSidebar}
            title={"ADD"}
            getZoomUsersList={getZoomUsersList}
          />

            <div
              className={classnames("data-list-overlay", {
                show: sidebar,
              })}
              onClick={() => handleSidebar(false)}
            />
          </div>
        ) : null}
      </div>
      </React.Fragment>
    )
}

export default ListView;