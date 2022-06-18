import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import "./DiscountsMain.scss";
import DiscountDataList from "./DiscountDataList";
import { getDiscountList } from "../../services/apis/tautmore_discounts_apis/tautmore_discounts_api";
import queryString from "query-string";
import DiscountFilter from './DiscountFilters'

const ListView = (props) => {
    const [discountList, setDiscountList] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [resultText, setResultText] = useState("Searching for content..");
    const [searchtext, setSearchtext] = useState("");
    const [status, setStatus] = useState("");

    const paginateData = queryString.parse(props.location.search)

    const callToDiscountList = async () =>{
        const params = {
            pageNumber: paginateData?.page ? paginateData?.page : 1,
            limit:10,
            code:searchtext,
            status:status
        }

       try{
           setDiscountList([]);
           setResultText("Searching for content..")
        const res = await getDiscountList(params);
        if(res.status === 200){
            const discountData = res?.data?.data?.discountList;
            setDiscountList(res?.data?.data?.discountList);
            setTotalPage(res?.data?.data?.totalPaginationCount);
            if (!discountData.length) {
                setResultText("No Discounnts found");
              } else {
                setResultText("");
              }
        }
       }catch(error){
        setResultText("No Discounnts found");
       }
    }

const renderDiscountFilter = () =>(
    <DiscountFilter
    handleSearchtext={setSearchtext}
      searchtext={searchtext}
      handleStatus={setStatus}
      status={status}
      loadData={callToDiscountList}
    />
)

    useEffect(()=>{
        callToDiscountList();
    },[paginateData?.page, searchtext, status])

  return (
    <div>
      <Row className="ml-0 mr-0 mb-1">
        <Col sm="8">
          <h2 className="discount-title">Discounts</h2>
          {/* <p className="discount-para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam,
          </p> */}
        </Col>
        <Col
          sm="4"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="d-flex flex-column align-items-center ">
            <h2 className="discount-title">14</h2>
            <h4>Discounts used</h4>
          </div>
        </Col>
      </Row>
      {renderDiscountFilter()}
      <DiscountDataList
      discountList={discountList}
      totalPage={totalPage}
      resultText={resultText}
      callToDiscountList={callToDiscountList}
      parsedFilter={queryString.parse(props.location.search)}></DiscountDataList>
    </div>
  );
};

export default ListView;
