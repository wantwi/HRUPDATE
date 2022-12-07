import React from 'react';
import LoaderComponent from 'src/reusable/components/LoaderComponent/LoaderComponent';

import { TheContent, TheSidebar, TheFooter, TheHeader} from './index';
import PersistLogin from 'src/PersistLogin'
const TheLayout = () => {

  return (
    <PersistLogin>
       <LoaderComponent>
<div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
    </LoaderComponent>
    </PersistLogin>
    
  )
}

export default TheLayout
