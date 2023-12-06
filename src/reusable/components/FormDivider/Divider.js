import { CCol } from '@coreui/react'
import React, { useEffect, useState } from 'react'

const Divider = () => {
  const [divierHeight, setDivierHeight] = useState(window.innerHeight* 0.4)
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const [width,height] = windowSize

      if(window.innerHeight<=660){
        setDivierHeight(window.innerHeight* 0.3)
      }
      
    else{
      setDivierHeight(window.innerHeight* 0.5)
    }
    
   
  }, [windowSize])



  return (
    // <CCol md="1" style={{margin: 0, padding:0, height:divierHeight, border:"0px solid ", width:5, display:"flex", justifyContent:"center"}}>
    //       <div  style={{ borderLeft:"1px solid #e1e2e3", height:"100%", width: 0.5 }}></div>
    //     </CCol>
    <CCol md="1">
    <div className="vl" style={{ height: "45vh" }}></div>
  </CCol>
  )
}

export default Divider