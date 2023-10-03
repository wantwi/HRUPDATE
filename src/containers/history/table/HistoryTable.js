import React, { useEffect, useState } from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, CommandColumn } from '@syncfusion/ej2-react-grids';


function statusTemplate(props) {
    return (<div id="status" className="statustemp">
  <span className="statustxt">Status</span>
    </div>);
}

const renderData = (data) =>{
    return data.map(x =>({...x}))
}

const HistoryTable = ({data,rowSelected}) => {

    const commandOptions = [
        { type: 'button', buttonOption: { iconCss: ' e-icons e-eye', cssClass: 'e-flat _info' } },
      ];

    
    return (
       
        <GridComponent dataSource={renderData(data)} rowSelected={rowSelected} allowPaging={false} height={300} pageSettings={{ pageCount: 5 }}>
            <ColumnsDirective>
                <ColumnDirective field='createdBy' headerText='Who' width='200'  />
                <ColumnDirective field='actionPerfomed' headerText='Action' width='120' />
                <ColumnDirective field='createdAt' type='dateTime' format={"dd/MMM/yyyy hh:mm a"} headerText='When' width='250' />
                <ColumnDirective  headerText='View' width='150' commands={commandOptions}></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, CommandColumn]}/>
        </GridComponent>
    );
}

export default HistoryTable