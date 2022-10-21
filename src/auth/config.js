// import { Log, User, UserManager } from "oidc-client";

// export const config = {
//     //the URL of our identity server
//     authority:  process.env.REACT_APP_AUTHORITY, 
//     // this ID maps to the client ID in the identity client configuration
//     //client_id: "lms-test", 
//     // URL to redirect to after login
//     //redirect_uri: "https://localhost:3000/signin-callback", 
//     client_secret:'22dab450-6d84-4508-dca8-79ba3950c00b',
   
//     // the scopes or resources we would like access to
//     //scope: "openid profile modularapi offline_access", 
//     // URL to redirect to after logout
//     post_logout_redirect_uri: "https://localhost:3001/login", 
//     response_type:'code',
//     response_mode: "query" ,

//     // authority: process.env.REACT_APP_AUTHORITY,
//      client_id: process.env.REACT_APP_CLIENT_ID,
//     // client_root: process.env.REACT_APP_CLIENT_ROOT,
//      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
//     // post_logout_redirect_uri: process.env.REACT_APP_LOGOUT_REDIRECT,
//     // response_type: 'code',
//     // response_mode: "query" ,

//     scope: process.env.REACT_APP_scope,
//     // pkce: false,
//     // monitorSession: false,
  
//   };

//  export const userManager = new UserManager(config);
// // Log.logger = console;
// // Log.level = Log.INFO;

// export const getUser = async () => {
//   return userManager.getUser();
// };
// export const login = async () => {
//   return userManager.signinRedirect();
// };

// export const renewToken = async () => {
//   return userManager.signinSilent();
// };

// export const logout = async () => {
//   return userManager.signoutRedirect();
// };
  
import { UserManager } from "oidc-client";

const {
  REACT_APP_LOGOUT_REDIRECT,
  REACT_APP_AUTHORITY,

  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_ROOT,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_RESPONSE_TYPE,
  REACT_APP_scope,
  REACT_APP_REDIRECT_URI,
  
} = process.env;

export const config = {
  authority: REACT_APP_AUTHORITY,
  
  client_id: REACT_APP_CLIENT_ID,
  redirect_uri: REACT_APP_REDIRECT_URI,
  client_root: REACT_APP_CLIENT_ROOT,
  client_secret: REACT_APP_CLIENT_SECRET,
  scope:REACT_APP_scope,
  post_logout_redirect_uri: REACT_APP_LOGOUT_REDIRECT,
  response_type:REACT_APP_RESPONSE_TYPE,
  response_mode: "query",
  
};
  
// console.log({config});
localStorage.setItem("config", JSON.stringify(config))
export const userManager = new UserManager(config);
//Log.logger = console;
// Log.level = Log.INFO;

export const getUser = async () => {
  return userManager.getUser();
};
export const userLogin = async () => {
  return userManager.signinRedirect();
};

export const renewToken = async () => {
  return userManager.signinSilent();
};

export const userLogout = async () => {
  localStorage.removeItem("persist");
  //localStorage.setItem("persist", false);
  return userManager.signoutRedirect();
};

export const signinCallback = async () => {
  return userManager.signinRedirectCallback();
};
