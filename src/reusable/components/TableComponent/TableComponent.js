import React from 'react';
import { useSelector } from 'react-redux';
import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Page, Sort, Edit, CommandColumn } from '@syncfusion/ej2-react-grids';

import '../../../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
import "../../../../node_modules/@syncfusion/ej2-react-grids/styles/material.css";

import { GetLabelByName } from 'src/reusable/configs/config';

const commandOptions = [
    { type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }
];

const editOptions = { allowEditing: false, allowAdding: false, allowDeleting: false, allowEditOnDblClick: false };

const TableComponent = ({ dataSource, OnCommandClick, setGrid, fields,  onChange, actionBegin}) => {
    const lan = useSelector(state => state.language);

    return (
        <>
            <GridComponent dataSource={dataSource} allowPaging={true} pageSettings={{ pageSize: 6 }} editSettings={editOptions} ref={g => setGrid(g)} commandClick={OnCommandClick} onChange={onChange} actionBegin={actionBegin}>
                <ColumnsDirective>
                    {
                        fields.map((val, index) => <ColumnDirective key={index} field={val.valueKey} headerText={val.valueName} width='100' visible={val.isVisible} />)
                    }
                    <ColumnDirective commands={commandOptions} headerText={GetLabelByName('TL51', lan)} width='100' textAlign="Center" />
                </ColumnsDirective>
                <Inject services={[Page, Sort, Filter, Group, Edit, CommandColumn]} />
            </GridComponent>
        </>
    )
}

export default TableComponent;