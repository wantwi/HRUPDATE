

/**
 * to validate email
 * @param {string} str
 * @returns boolean
 */
export const validEmail =(str)=>{
const isValid = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$' );
    return isValid.test(str)
} 

 /**
  * to validate phone number
  * @param {int}  str
  * @returns boolean
  */

 export const validPhoneNumber=(str) =>{ 
  const isValid =   new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')
    return isValid.test(str)
}

/**
 * to validate password
 * @param {string && int} str
 * @returns boolean
 */

export const validPassword =(str)=> {
    const isValid =new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
return isValid.test(str)
}

/**
 * to validate FirstName
 * @param {string} str
 * @returns boolean
 */
export const validFirstName=(str)=>{
    const isValid = new RegExp('^[a-zA-Z\S]+$')
    return isValid.test(str)
}



/**
 * to validate LastName
 * @param {string} str
 * @returns boolean
 */
export const validLastName=(str)=>{
    const isValid = new RegExp('^[a-zA-Z\S]+$')
    return isValid.test(str)
}


/**
 * to validate just alphabets
 * @param {string} str
 * @returns boolean
 */
export const ValidateOnlyWord=(str)=>{
    const isValid= new RegExp('[a-zA-Z]')
    return isValid.test(str)
}

/**
 * to validate just alphabets with space Eg:How are 
 * @param {string} str
 * @returns boolean
 */
 export const ValidateWordWihSpace=(str)=>{
    const isValid= new RegExp('[a-zA-Z][\s][a-zA-Z]+$')
    return isValid.test(str)
}

/**
 * to validate just alphabets with space Eg:How are 
 * @param {string} str
 * @returns boolean
 */
 export const ValidateWord=(str)=>{
    const isValid= new RegExp('[a-zA-Z]+$')
    return isValid.test(str)
}