import { CFormGroup, CInputCheckbox, CLabel } from '@coreui/react';
import React from 'react';
import { CSLab } from '..';
import '../../../scss/_checkbox.scss';

const CheckBoxComponent = (props) => {

    return (
        <>
            {/* <label className="label-checkbox"><input className="input-checkbox" {...props} /> {props.label}</label> */}
            <CFormGroup variant="custom-checkbox" inline>
                <CInputCheckbox
                    custom
                    id={props.label}
                    label={props.label}
                    {...props}
                />
                <CLabel variant="custom-checkbox" htmlFor={props.label}><CSLab code={props.label} /></CLabel>
            </CFormGroup>
        </>
    )
}

export default CheckBoxComponent;