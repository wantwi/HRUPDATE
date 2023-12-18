import React, { useRef } from "react";

import { Toolbar } from "@syncfusion/ej2-navigations";
import { GetLabelByName } from "src/reusable/configs/config";
import {
  ColumnDirective,
  ColumnsDirective,
  CommandColumn,
  GridComponent,
  Page,
  Sort,
  Inject,
} from "@syncfusion/ej2-react-grids";

const editSettings = {
  allowDeleting: true
};

const QualificationTable = ({ data = [], setGridData, lan }) => {
  const tabRef = useRef(null);



  const temp = (args) => {
    return (
      <span onClick={() => { removeItem(args?.index) }} className="btn btn-sm">
        <i className="e-icons e-delete"></i>
      </span>
    );
  }

  const removeItem = (index) => {
    const current = tabRef.current?.currentViewData;
    const filterList = current.splice(Number(index), 1);
    setGridData(current);
  };


  return (
    <>
      <GridComponent
        // allowPaging={true}
        dataSource={data}

        editSettings={editSettings}
        height={window.innerHeight * 0.3}

        ref={tabRef}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="count"
            headerText={"#"}
            width={40}

          />

          <ColumnDirective
            field="name"
            headerText={"Qualification"}

          />
          <ColumnDirective
            field="coreArea"
            headerText={"Core Area"}

          />
          <ColumnDirective
            field="expMonthText"
            headerText={"Experience(Month)"}

          />


          <ColumnDirective
            template={temp}
            headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)}
            width="100"
            textAlign="Center"
          />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Toolbar, CommandColumn]} />
      </GridComponent>
    </>
  );
};

export default QualificationTable;
