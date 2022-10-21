import React from "react";
import { createContext, useState } from "react";

const LoadingContext = createContext({});

export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext;


