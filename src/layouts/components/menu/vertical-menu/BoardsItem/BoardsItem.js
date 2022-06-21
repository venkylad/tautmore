import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectBoardAction } from "../../../../../redux/actions/boards-sidebar";
import { clientUrl } from "../../../../../views/tautmore-components/services/api-fetch/Axios";

const BoardsItem = ({ open }) => {
  const [boards, setBoards] = useState([]);
  const dispatch = useDispatch();

  const fetchBoards = async () => {
    const res = await fetch(`${clientUrl}/api/board/getAllBoards`);
    const data = await res.json();
    setBoards(data?.boards);
    dispatch(selectBoardAction(data?.boards[0]));
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="menu-text">
      <Icon.Home size={20} />
      <span className="tautmore-custom-sidebar-header">Boards</span>
      {open && (
        <div
          style={{
            width: "100%",
            padding: "20px 0px",
          }}
        >
          {boards?.map((board) => (
            <div
              key={board?.id}
              onClick={() => dispatch(selectBoardAction(board))}
            >
              <Link to="/manage-boards">
                <p>{board?.name}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardsItem;
