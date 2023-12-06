import React, { useEffect, useRef } from "react";

import { Toolbar } from "@syncfusion/ej2-navigations";
import { GetLabelByName } from "src/reusable/configs/config";
import { moneyInTxt, setAsInt } from "src/reusable/utils/helper";
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
  allowEditing: false,
  allowAdding: true,
  allowDeleting: true,
};

const BenefitTable = ({ setGridData, data = [], lan }) => {
  const tabRef = useRef(null);

  const temp = (args) => {
    return (
      <span onClick={() => removeItem(args?.index)} className="btn btn-sm">
        <i className="e-icons e-delete"></i>
      </span>
    );
  };
  const Amounttemp = (args) => {
    return <>{moneyInTxt(setAsInt(args?.amount) || 0, "en", 2)}</>;
  };

  const removeItem = (index) => {
    const current = tabRef.current?.currentViewData;
    const filterList = current.splice(Number(index), 1);
    setGridData(current);
  };

  useEffect(() => {
    tabRef.current.refresh();
  }, [lan]);


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
            width="40"

          />
          <ColumnDirective
            field="name"
            headerText={"Name"}

          />
          <ColumnDirective
            field="basis"
            headerText={"Basis"}
            width="170"

          />
          <ColumnDirective
            field="valueAmt"
            headerText={"Value"}
            width="100"
          // formatter={'N2'}

          />
          <ColumnDirective
            field="maximumAmount"
            headerText={"Max. Amount"}
            width="150"


          />

          <ColumnDirective
            field="unit"
            headerText={"Unit"}
            width="100"
          />
          <ColumnDirective
            field="cycle"
            headerText={"Cycle"}
            width="100"

          />
          <ColumnDirective
            field="probationEligible"
            headerText={"Probation Eligible"}
            width="150"

          />


          <ColumnDirective
            field="statusText"
            headerText={"Status"}
            width="100"
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

export default BenefitTable;
