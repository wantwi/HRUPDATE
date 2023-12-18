import React from "react";
import { createContext, useState } from "react";

const PromptContext = createContext({});

export const PromptProvider = ({ children }) => {
    const [hasAccept, setHasAccept] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const isAcceptted = () => {
        setHasAccept(true)
    }
    const isNotAcceptted = () => {
        setHasAccept(false)
    }

    return (
        <PromptContext.Provider value={{ hasAccept, setHasAccept, isOpen, setIsOpen, isNotAcceptted, isAcceptted }}>
            {children}
        </PromptContext.Provider>
    )
}

export default PromptContext;


