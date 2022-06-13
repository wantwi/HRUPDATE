import React from 'react';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import { useSelector } from 'react-redux';
import { GetLabelByName } from 'src/reusable/configs/config';

import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-react-dropdowns/styles/material.css";

const MultiSelectComponent = ({ multiData }) => {
    const lan = useSelector(state => state.language);
    const keys = Object.keys(multiData);

    const multiSelect = (keys && keys.length > 0) ?
        keys.map((key, index) => <DropDownTreeComponent key={index} fields={multiData[key]} placeholder={GetLabelByName(multiData[key]?.compProps?.name, lan)} showCheckBox={true}
            id={multiData[key]?.compProps?.id} showSelectAll={true} selectAllText={GetLabelByName(multiData[key]?.compProps?.checkAllLabel, lan)} unSelectAllText={GetLabelByName(multiData[key]?.compProps?.unCheckAllLabel, lan)} />)
        : null

    return (
        <div> {multiSelect} </div>
    )
}

export default MultiSelectComponent;