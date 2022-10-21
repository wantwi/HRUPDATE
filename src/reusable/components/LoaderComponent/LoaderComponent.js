import React, { useState } from 'react';
import LoadingOverlay from "react-loading-overlay";
import useLoader from 'src/hooks/useLoader';



const Loader = (props) => {
    const { isLoading } = useLoader()
    // const [isLoading, setLoaded] = useState(true);
    return (
        <>
            < LoadingOverlay
                active={isLoading}
                spinner
            >
                {props.children}
            </ LoadingOverlay>
        </>
    )

}

export default Loader;


