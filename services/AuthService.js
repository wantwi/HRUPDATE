import { Log,UserManager } from "oidc-client";

const config={
    authority: process.env.REACT_APP_AUTHORTY,
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_root: process.env.REACT_APP_CLIENT_ROOT,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    post_logout_redirect_uri: process.env.REACT_APP_LOGOUT_REDIRECT,
    response_type: 'code',
    scope: process.env.REACT_APP_scope,
    pkce: false,
    monitorSession: false,

}
console.log(process.env);

const userManager = UserManager(config)
Log.logger = console
Log.logger = Log.INFO

const getUser = async()=>{
    return userManager.getUser()
}
const login =async()=>{
    return userManager.signinRedirect()
}

const renewToken =()=>{
    return userManager.signinSilent()
}
const logout = async()=>{
    return userManager.signoutRedirect
}
export {getUser,login,renewToken,logout}