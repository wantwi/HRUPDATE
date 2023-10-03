import { useContext } from "react";

import AppGlobalsContext from "../Context/AppGlobalsProvider";

const useAppGolbals = () => {
  return useContext(AppGlobalsContext);
};

export default useAppGolbals;
