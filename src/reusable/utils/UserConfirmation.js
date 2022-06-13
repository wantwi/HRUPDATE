import React from "react";
import ReactDOM from "react-dom";
import { Dialog } from "evergreen-ui"



const UserConfirmation = (message, callback) => {
   const container = document.createElement("div");
   container.setAttribute("custom-confirmation-navigation", "");
   document.body.appendChild(container);

   const textObj = JSON.parse(message);

const closeModal = (callbackState) => {
      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
      callback(callbackState);
   };

   const myMessage = <strong>It looks like you might have some unsaved  
   changes! Are you sure you want to continue?</strong>
 
   ReactDOM.render(
    
    <Dialog
    
       cancelLabel={textObj.cancelText}
       confirmLabel={textObj.confirmText}   
       isShown={true}
       onCancel={() => closeModal(false)}
       onConfirm={() => closeModal(true)}
       title="Warning"
    >
       {myMessage}
    </Dialog>,
   container
  );
};
export default UserConfirmation;