import React from 'react';
import { CSelect } from '@coreui/react';

const SingleSelectComponent = ({ multiData }) => {

    return (
        <div>
            {(Object.keys(multiData) && Object.keys(multiData).length > 0) ? Object.keys(multiData).map((key, index) => (
                <CSelect className={multiData[key]?.compProps?.className} id={multiData[key]?.compProps?.id} key={index}>
                    <option value="-1">Select {multiData[key]?.compProps?.name}</option>
                    {multiData[key]?.dataSource.map((value, i) => (<option key={i} value={value[multiData[key]?.value]}>{value[multiData[key]?.text]}</option>))}
                </CSelect>
            )) : null}
        </div>
    )
}

export default SingleSelectComponent