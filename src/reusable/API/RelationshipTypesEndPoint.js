import { RelationTypes } from "./EmployeeFamilyEndPoint";
import axios from "axios";
import { useState } from "react";

export const HandleRelationTypes = async () => {
  //const [relationTypes, setRelationTypes] = useState([]);

  const request = await axios.get(RelationTypes());
  //const response = await request.json();
  // console.log({ request });
  return request.data;
};
