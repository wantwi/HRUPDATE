import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const toaster = (toastId, message, type, time) => {
    switch (type) {
        case 'warn':
            toast.warn(message, {
                position: "top-right",
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                isLoading: false
            })
            break;
        case 'info':
            toast.info(message, {
                position: "top-right",
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                isLoading: false
            })
            break;
        case 'error':
        case 'success':
            toast.update(toastId, {
                render: message, type, position: "top-right",
                autoClose: 5000,
                //delay: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                isLoading: false
            });
            break;
        default:
            break;
    }

}

/*

const toastId = toast.loading("Creating GL Account");
            PostRequest(PostGeneralLedger(), { data: postObject })
                .then(response => {
                    response.text().then(response => {
                        if ("" === response) {
                            toaster(toastId, 'Created a GL Account successfully!', 'success', 4000);
                            handleReset(2);
                        } else {
                            try {
                                response = JSON.parse(response);
                                toaster(toastId, response?.reason ? response?.reason : "Failed to create GL Account", 'error', 4000);
                            } catch (error) {
                                console.log(error);
                            }
                        }

                    });

                })
                .catch(err => {
                    console.log({ err })
                })
                .finally(() => {
                    console.log('Done');
                });
*/

const ToasterComponent = ({loadingMessage, useLoader, isDone, doneMessage}) => {

    const toastId = useLoader ? toast.loading(loadingMessage) : null

    const runnerLoader = () => {
        
    }

    toast.update(toastId, {
        render: message, type, position: "top-right",
        autoClose: 5000,
        //delay: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        isLoading: false
    });

    return(
        <></>
    )
}

export default ToasterComponent;