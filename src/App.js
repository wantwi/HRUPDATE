import React, { Component } from "react";
// eslint-disable-next-line
import { HashRouter, Route, Switch,BrowserRouter } from "react-router-dom";
import "./scss/style.scss";
import { ToastContainer } from "react-toastify";
import Loader from './reusable/components/LoaderComponent/LoaderComponent';

// import Loader from "./Loader/Loader";
import UserConfirmation from "./reusable/utils/UserConfirmation";
import ReportViewerPage from "./views/Report/ReportViewerPage";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./templates/pages/login/Login"));
const Register = React.lazy(() =>
  import("./templates/pages/register/Register")
);
const SigninCallback = React.lazy(() => import('./templates/pages/SigninCallback'));



const Page404 = React.lazy(() => import("./templates/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./templates/pages/page500/Page500"));

class App extends Component {
  render() {
    return (
      <BrowserRouter
        basename={process.env.REACT_APP_BASE_NAME}
        getUserConfirmation={(message, callback) =>
          UserConfirmation(message, callback)
        }
      >
        <ToastContainer />
        <React.Suspense fallback={<Loader />}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route exact path="/signin-callback" name="Callback Page" render={props => <SigninCallback {...props} />} />

            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
             <Route exact path="/report-view/:reportname" name="Report View" render={props => <ReportViewerPage {...props} />} />
            <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
