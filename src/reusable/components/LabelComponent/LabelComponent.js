import React from "react";
import { useSelector } from "react-redux";

import { GetLabelByName } from "src/reusable/configs/config";

const LabelComponent = (props) => {
  //console.log(props)
  const lan = useSelector((state) => state.language);
  // console.log(lan);

  return <span {...props}>{GetLabelByName(props.code, lan)}</span>;
};

export default LabelComponent;
