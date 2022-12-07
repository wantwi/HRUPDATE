// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardGroup,
//   CCol,
//   CContainer,
//   CForm,
//   CInput,
//   CInputGroup,
//   CInputGroupPrepend,
//   CInputGroupText,
//   CRow
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
 import { userLogin } from 'src/auth/config'
// import Loader from 'src/Loader/Loader'



// const Login = () => {
//   const [isLoading, setisLoading] = useState(false)


//   const loginUser = async () => {

//     setisLoading(true)
//     const res = await userLogin()
//     if(res) {
//       setisLoading(false)
//     }

//   }
//   useEffect(() => {
    
//     setisLoading(false)
//     return () => {
//       setisLoading(false)
//     }
//   }, [])


  

//   return (
//     <div className="c-app c-default-layout flex-row align-items-center">
//       {
//         isLoading ? <Loader/> : <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md="12">
//             <CCardGroup>
//               <CCard className="p-4">
//                 <CCardBody>
//                   <CForm>
//                     <h1>Login</h1>
//                     <p className="text-muted">Sign In to your Personax Customer Admin account</p>
                   
//                     <CRow>
//                       <CCol xs="6">
//                         <CButton color="primary" onClick={loginUser} className="px-4">Login</CButton>
//                       </CCol>
                    
//                     </CRow>
//                   </CForm>
//                 </CCardBody>
//               </CCard>
             
//             </CCardGroup>
//           </CCol>
//         </CRow>
//       </CContainer>
//       }
      
//     </div>
//   )
// }

// export default Login
import React, { useEffect, useState } from 'react'

import {
  CButton,
  CContainer,
  CRow
} from '@coreui/react'
//import { userLogin } from 'src/config/config'
import Loader from 'src/Loader/Loader'
import BG_IMG from "../../../assets/bg1.png"
import Logo from "../../../assets/bg.png"

const Login = () => {
  const [isLoading, setisLoading] = useState(false)


  const loginUser = async () => {

    setisLoading(true)
    const res = await userLogin()
    if(res) {
      setisLoading(false)
    }

  }
  useEffect(() => {
    setisLoading(false)
    return () => {
      setisLoading(false)
    }
  }, [])


  

  return (
    <div className="c-app c-default-layout flex-row align-items-center" style={{backgroundImage: isLoading ?"" :`url(${BG_IMG})`, backgroundSize:"cover", position:"relative"}}>
      {
          isLoading 
          ? null 
          :
          <>
          <div style={{position:"absolute", width:"100vw", height:"100vh", background:"black", opacity:"0.4"}}></div>
      <div style={{position:"absolute",top:50, left:100,}}>
        <img alt='logo' src={Logo} style={{objectFit:"cover", width:200,height:"auto"}}/>
      </div>
          </>
      }
      {
        isLoading ? <Loader/> : <CContainer style={{zIndex:100}}>
        <CRow className="justify-content-center" >
          <h1 style={{color:"#fff", fontSize:50}}>Personax Standard Customer Admin</h1>
        
       
        </CRow>
        <CRow className="justify-content-center" >
         
          <div className='mt-2'>
          <CButton size='lg' style={{padding:10,fontSize:25}} color="primary" onClick={loginUser} className="px-4">Login</CButton>
          </div>
       
        </CRow>
      </CContainer>
      }
      
    </div>
  )
}

export default Login

