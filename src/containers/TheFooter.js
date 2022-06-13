import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={true} style={{height: '10px !important'}}>
      <div>
        <a href="https://persol.net" target="_blank" rel="noopener noreferrer">PersonaX</a>
        <span className="ml-1">&copy; {new Date().getFullYear()} </span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://persol.net" target="_blank" rel="noopener noreferrer">Persol Systems Ltd.</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
