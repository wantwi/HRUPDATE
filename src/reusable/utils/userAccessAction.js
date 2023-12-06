import { useState } from "react";
import useFetch from "src/hooks/useFetch";

const setUserAction = (roles) => {
  let obj = {
    canRead: false,
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canAudit: false,
  };

  roles.forEach((x) => {
    if (x.includes("_read")) {
      obj.canRead = true;
    }
    if (x.includes("_write")) {
      obj.canCreate = true;
    }

    if (x.includes("_modify")) {
      obj.canUpdate = true;
    }

    if (x.includes("_remove")) {
      obj.canDelete = true;
    }

    if (x.includes("_audit")) {
      obj.canAudit = true;
    }
  });

  return obj;
};

export const userAccessAction = (PageAccess = [], userAccess) => {
  let arr = [];
  PageAccess.forEach((role) => {
    let obj = userAccess.find((x) => x === role);

    if (obj) {
      arr.push(obj);
    }
  });
  return setUserAction(arr);
};

export const isReadOnly =(mode="",access)=>{
  const {canCreate=false,canUpdate=false, canRead=false}= access
  if(mode.length === 0){
      if(canRead && !canCreate && !canUpdate ){
          return true
      }else{
        return false
      }
  }else{
    if(canRead && mode ==="Update" && !canCreate && !canUpdate ){
      return true
   }else{
     return false
   }
  }
 
}
