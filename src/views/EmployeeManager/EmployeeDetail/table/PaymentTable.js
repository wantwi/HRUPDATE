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

const PaymentTable = ({ setPaymentsInfo, paymentsInfo = [], lan }) => {
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
    setPaymentsInfo(current);
  };

  useEffect(() => {
    tabRef.current.refresh();
  }, [lan]);

  console.log({ paymentsInfo })

  // console.log({
  //   paymentsInfo: paymentsInfo.map((x) => ({
  //     ...x,
  //     isDefaultVal: x?.isDefault ? "Yes" : "No",
  //   })),
  // });

  return (
    <>
      <GridComponent
        // allowPaging={true}
        dataSource={paymentsInfo.map((x) => ({
          ...x,
          isDefaultVal: x?.isDefault ? "Yes" : "No",
        }))}
        // dataSource={[
        //   {
        //     paymentMode: "Bank",
        //     serviceProvider: "GCB",
        //     branch: "Axc",
        //     accountNumber: "000",
        //     paymentBasis: "%",
        //     isDefaultVal: "Yes",
        //   },
        // ]}
        editSettings={editSettings}
        height={window.innerHeight * 0.3}
        // rowSelected={rowSelected}
        //  actionComplete={actionComplete}
        // pageSettings={{ pageSize: 10 }}
        ref={tabRef}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="paymentMode"
            // edit={opt}
            headerText={GetLabelByName("Payment Option", lan, "Payment Option")}
            width="100"
          />
          <ColumnDirective
            field="serviceProvider"
            headerText={GetLabelByName("HCM-8HQGFGIAVIC_LANG", lan)}
            width="100"
          />
          <ColumnDirective
            field="branch"
            headerText={GetLabelByName("HCM-5JJIZBZLYWP_LANG", lan)}
            width="100"
          />
          <ColumnDirective
            field="accountNumber"
            headerText={GetLabelByName("HCM-1UEP04SV4P9_LASN", lan)}
            width="100"
          />
          <ColumnDirective
            field="paymentBasis"
            headerText={GetLabelByName("HCM-C1JUXJYA3B7-LASN", lan)}
            width="100"
          />
          <ColumnDirective
            field="amount"
            headerText={GetLabelByName("HCM-DZDEE2SFA1_PSLL", lan, "Value")}
            format="n2"
            width="80"
            textAlign="right"
            template={Amounttemp}
          />
          <ColumnDirective
            field="isDefaultVal"
            headerText={GetLabelByName("HCM-BL95JD6K2W9-LOLN", lan)}
            width="90"
          />
          <ColumnDirective
            template={temp}
            headerText={GetLabelByName("HCM-F4IUJ9QVOM6", lan)}
            width="60"
            textAlign="Center"
          />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Toolbar, CommandColumn]} />
      </GridComponent>
    </>
  );
};

export default PaymentTable;
