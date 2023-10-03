import * as FaIcons from "react-icons/fa";
import { useHistory, Link } from "react-router-dom";

function BreadcrumbComponet({}) {
  const history = useHistory()


  return (
    <div style={{display:"flex", flexDirection:"row", fontWeight:400, color:"#333", marginBottom: 25, display: "none"}}>
    <div style={{marginRight:4, marginLeft:4}}><Link to="/dashboard"><FaIcons.FaHome/>HOME</Link> </div>
    <div>{history.location?.pathname.replace(
       /\//gi,
        " | "
      ).toLocaleUpperCase()} </div>
   
   </div>
    
  );
}

export default BreadcrumbComponet;