import React from 'react';

import { TheContent, TheSidebar, TheFooter, TheHeader} from './index';
import PersistLogin from 'src/PersistLogin'
const TheLayout = () => {

  return (
    <PersistLogin>
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
    </PersistLogin>
    
  )
}

export default TheLayout
