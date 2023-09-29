import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useLocation } from "react-router-dom";
import { userLogout } from "src/auth/config";
// import { userLogout } from "src/config/config";
import useAuth from "src/hooks/useAuth";
import Dock from "./Dock";

const IdleTimerComponet = (props) => {


  const { auth } = useAuth();
  const timeout = 1000 * 60 * 10;
  const promptTimeout = 1000 * 30;

  const [open, setOpen] = useState(false);
  const [remaining, setRemaining] = useState(0);

  const location = useLocation()


  const onPrompt = () => {
    // onPrompt will be called after the timeout value is reached
    // In this case 30 minutes. Here you can open your prompt.
    // All events are disabled while the prompt is active.
    // If the user wishes to stay active, call the `reset()` method.
    // You can get the remaining prompt time with the `getRemainingTime()` method,
    setOpen(true);
    setRemaining(promptTimeout);
  };

  const onIdle = () => {
    // onIdle will be called after the promptTimeout is reached.
    // In this case 30 seconds. Here you can close your prompt and
    // perform what ever idle action you want such as log out your user.
    // Events will be rebound as long as `stopOnMount` is not set.

    setOpen(false);

    localStorage.setItem("previous", location?.pathname)

    userLogout();
    setRemaining(0);
  };

  const onActive = () => {
    // onActive will only be called if `reset()` is called while `isPrompted()`
    // is true. Here you will also want to close your modal and perform
    // any active actions.
    setOpen(false);
    setRemaining(0);
  };

  const { getRemainingTime, isPrompted, activate } = useIdleTimer({
    timeout,
    promptTimeout,
    onPrompt,
    onIdle,
    onActive,
  });

  const handleStillHere = () => {
    setOpen(false);
    activate();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPrompted()) {
        setRemaining(Math.ceil(getRemainingTime() / 1000));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [getRemainingTime, isPrompted]);

  return (
    <Dock position="top" fluid={true} duration={1000} isVisible={open}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >

        {/* <img src={SessionGif}/> */}

        <h1>Hi, {auth?.given_name}</h1>
        <p style={{ fontSize: 25, alignItems: "center" }}>
          Logging you out in{" "}
          <span style={{ color: "red", fontWeight: "bold", fontSize: 30 }}>
            {remaining}
          </span>{" "}
          seconds
        </p>

        <div>
          <CButton
            className="border-right-curve mr-1"
            color="success"
            onClick={() => { localStorage.clear(); userLogout() }}
          >
            Log me Out
          </CButton>
          <CButton
            className="border-right-curve"
            color="danger"
            onClick={handleStillHere}
          >
            I'm Still Here
          </CButton>
        </div>
      </div>
    </Dock>
  );
};

export default IdleTimerComponet;
