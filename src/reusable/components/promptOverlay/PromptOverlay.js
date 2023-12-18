import { CButton } from "@coreui/react";
import React from "react";
import { useSelector } from "react-redux";
import usePrompt from "src/hooks/usePrompt";
import { GetLabelByName } from "src/reusable/configs/config";

import Dock from "./Dock";

const PromptOverlay = () => {
  const { isOpen,  isAcceptted,isNotAcceptted } = usePrompt();
  const lan = useSelector((state) => state?.language);


 
  return (
    <Dock position="bottom" fluid={true} duration={500} isVisible={isOpen}>
      <div
        style={{
          display: "flex",

          flexDirection: "column",

          height: "auto",
          background: "#fff",
          width: "300px",
          position: "absolute",
          right: 20,
          top: 100,
          padding: "10px",
          borderRadius: 10,
          fontFamily:"Segoe UI !important",
          
        }}
      >
        <label style={{ fontFamily:"Segoe UI !important", fontWeight:"300 !important", fontSize:18}}> {GetLabelByName("HCM-EF7Q3O0153G-LASN", lan,"Do you want to add new record")} ?</label> 
        <div>
        <CButton
            className="border-right-curve mr-1"
            color="success"
            onClick={isAcceptted}
          >
            
            {GetLabelByName("HCM-EKHBTLSMTIM_LANG", lan,"Yes")}
          </CButton>
          <CButton
            className="border-right-curve"
            color="danger"
            onClick={isNotAcceptted}
          >
             {GetLabelByName("HCM-7V4Q7ZVDF6W-LOLN", lan,"No")}
            
          </CButton>
         
        </div>
      </div>
    </Dock>
  );
};

export default PromptOverlay;
