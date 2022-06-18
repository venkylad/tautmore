import React from "react";
import { Button } from "reactstrap";
import { Plus } from "react-feather";
import "./buttons.scss";

// need button title
function Buttons(props) {
  return (
    <>
        <Button.Ripple
          onClick={() => props.onClick(true)}
          className="list-button d-flex  align-items-center add-new-btn-admin"
        >
          <Plus height="18" width="18" />
          <span className="tautmore-admin-add-btn">{props.button_title}</span>
        </Button.Ripple>
      
    </>
  );
}

export default Buttons;
