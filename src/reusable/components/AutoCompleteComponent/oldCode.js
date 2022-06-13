import React, { useEffect, useState } from "react";
import { CInputGroupAppend, CInputGroup, CInput, CFormGroup, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { toast } from 'react-toastify';

import { GetRequest } from "src/reusable/utils/helper";

const styles = {
    position: 'absolute',
    inset: '0px auto auto 0px',
    transform: 'translate(1px, 37px)',
    width: '94%',
    marginTop: -10,
    left: '14px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    border: '1px solid #d8dbe0'
}
const useKeyPress = function (targetKey) {
    const [keyPressed, setKeyPressed] = useState(false);

    function downHandler({ key }) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }

    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);


        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    });

    return keyPressed;
};

const ListItem = ({ item, active, setSelected, setHovered, displayTextKey, uniqueIdKey, onClickTrigger, enterHit, activeIndex, items }) => {
    useEffect(() => {
        if (enterHit) {
            onClickTrigger(items[activeIndex]);
            setSelected(items[activeIndex]);
        }
    }, [enterHit, setSelected, onClickTrigger, items, activeIndex]);

    return (
        <div
            id={item?.[uniqueIdKey]}
            className={`dropdown-item ${active ? "active" : ""}`}
            onClick={() => { setSelected(item); onClickTrigger(item) }}
            onMouseEnter={() => setHovered(item)}
            onMouseLeave={() => setHovered(undefined)} >
            {item?.[displayTextKey]}
        </div>
    )
};

const CSAutoComplete = ({ filterUrl, uniqueIdKey, displayTextKey, placeholder, handleSelect }) => {

    uniqueIdKey = uniqueIdKey || 'id';
    displayTextKey = displayTextKey || 'name';
    const alternativeTextKey = 'code';

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

    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const [, setSelected] = useState(undefined);
    const downPress = useKeyPress("ArrowDown");
    const upPress = useKeyPress("ArrowUp");
    const enterPress = useKeyPress("Enter");
    const [cursor, setCursor] = useState(0);
    const [hovered, setHovered] = useState(undefined);
    const [inputCopy, setInputCopy] = useState('');

    useEffect(() => {
        if (filteredSuggestions.length && downPress) {
            setCursor(prevState =>
                prevState < filteredSuggestions.length - 1 ? prevState + 1 : prevState
            );
        }
    }, [downPress, filteredSuggestions]);

    useEffect(() => {
        if (filteredSuggestions.length && upPress) {
            setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
        }
    }, [upPress, filteredSuggestions]);

    useEffect(() => {
        if (filteredSuggestions.length && enterPress) {
            setSelected(filteredSuggestions[cursor]);
        }
    }, [cursor, enterPress, filteredSuggestions]);

    useEffect(() => {
        if (filteredSuggestions.length && hovered) {
            setCursor(filteredSuggestions.indexOf(hovered));
        }
    }, [hovered, filteredSuggestions]);


    const onChange = (e) => {
        const userInput = e.target.value;

        if (!userInput) {
            setFilteredSuggestions([]);
            setSuggestions([]);
            setShowSuggestions(false);
        }

        // if (e.keyCode === 13 && !showSuggestions && !filteredSuggestions.length) handleSearchInput()
        if (e.keyCode === 13 && !showSuggestions) handleSearchInput()

        // Filter our suggestions that don't contain the user's input
        const unLinked = suggestions.filter(
            (suggestion) => {
                return suggestion?.[displayTextKey].toLowerCase().indexOf(userInput.toLowerCase()) > -1
                    || suggestion?.[alternativeTextKey].toLowerCase().indexOf(userInput.toLowerCase()) > -1
            }
        );

        setInput(e.target.value);
        setFilteredSuggestions(unLinked);
    };

    const onClick = (props) => {
        if (props)
            handleSelect(props)

        setInput(props?.[displayTextKey]);
        setShowSuggestions(false);
        setFilteredSuggestions([]);
        setCursor(0);
    };

    const handleSearchInput = () => {
        console.log({inputCopy, input})
        if (inputCopy === input) return;

        if (input && input.length > 2) {
            const toastId = toast.loading("Searching ");

            GetRequest(filterUrl + input, {}).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        if (data && data.length > 0) {
                            toast.dismiss(toastId);
                            setSuggestions(data);
                            setFilteredSuggestions(data);
                            setShowSuggestions(true);
                            setInputCopy(input);
                        } else {
                            toaster(toastId, 'No record found!', 'info', 4000);
                        }

                    });
                }else{
                    console.log(response.statusText)
                }
            }).catch(err => {
                console.log(err);
                toaster(toastId, `Failed to load `, 'error', 3000);
            })
        } else {
            toast.dark('Search input below minimum characters', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                isLoading: false
            });
        }
    }

    const SuggestionsListComponent = () => {
        return filteredSuggestions.length ? (
            <div className={`dropdown-menu show suggestions`} style={styles}>
                {filteredSuggestions.map((suggestion, index) => {
                    return (
                        <ListItem
                            items={filteredSuggestions}
                            activeIndex={cursor}
                            item={suggestion}
                            key={suggestion?.[uniqueIdKey]}
                            active={index === cursor}
                            uniqueIdKey={uniqueIdKey}
                            onClickTrigger={onClick}
                            displayTextKey={displayTextKey}
                            enterHit={enterPress}
                            setSelected={setSelected}
                            setHovered={setHovered}
                        />
                    );
                })}
            </div>

        ) : (
            null
        );
    };

    return (
        <>
            <CFormGroup>
                <CInputGroup>
                    <CInput className='border-left-curve' type="text"
                        onChange={onChange}
                        onKeyDown={onChange}
                        value={input || ''}
                        placeholder={placeholder}
                    />
                    <CInputGroupAppend>
                        <CButton className='border-right-curve' color="primary" onClick={handleSearchInput}>
                            <CIcon name="cil-magnifying-glass" />
                        </CButton>
                    </CInputGroupAppend>
                </CInputGroup>
                {showSuggestions && input && <SuggestionsListComponent />}
            </CFormGroup>
        </>
    );
};
export default CSAutoComplete;