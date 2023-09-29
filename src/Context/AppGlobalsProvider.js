import React from "react";

import { createContext, useState } from "react";

const AppGlobalsContext = createContext({});
const init = {
  numOfCompany: 0,
  userMenus: [],
  userPermissions: [],
};

export const AppGlobalsProvider = ({ children }) => {
  const [appGlobals, setAppGlobals] = useState(init);

  return (
    <AppGlobalsContext.Provider value={{ appGlobals, setAppGlobals }}>
      {children}
    </AppGlobalsContext.Provider>
  );
};

export default AppGlobalsContext;
