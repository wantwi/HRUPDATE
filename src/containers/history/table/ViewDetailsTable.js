import React, { useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { SplitCamleCase, SplitCamleCaseGL } from "src/reusable/utils/helper";
import { GetLabelByName } from "src/reusable/configs/config";
import { useSelector } from "react-redux";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { CSLab } from "src/reusable/components";

const compare = (a, b) => {
  if (b !== "") {
    return a.toLowerCase() === b.toLowerCase();
  }
};

const ViewDetailsTable = ({ data, isGL }) => {
  const [label, setLabel] = useState("");
  const [values, setValues] = useState([]);
  const [show, setShow] = useState(false)

  const lan = useSelector((state) => state.language);
  const queryCellInfo = (args) => {
    if (args.column.field === "new") {
      console.log({
        queryCellInfo: args.data.new,
        queryCellInfo2: args.data.new,
      });
      if (args.data.new !== "") {
        if (!compare(args.data.old, args.data.new) && args.data.new !== null) {
          args.cell.innerHTML = `${args.data.new} <span class="badge  ms-auto text-white font-weight-light" style="background:#1a73e8">new</span>`;
          args.cell.style.paddingLeft = "16px";
        } else {
          args.cell.style.color = "rgb(139 124 124 / 87%)";
          args.cell.style.paddingLeft = "16px";
        }
      }
    }
  };

  const renderData = (list) =>
    list.map((x) => {
      if (isGL) {
        return {
          ...x,
          old: GetLabelByName(x?.old, lan, x?.old),
          new: GetLabelByName(x?.new, lan, x?.new),
          lable: SplitCamleCaseGL(x.lable),
        };
      } else {
        const result = {
          ...x,
          old: GetLabelByName(x?.old, lan, x?.old),
          new: GetLabelByName(x?.new, lan, x?.new),
          lable: SplitCamleCase(x.lable),
        };

        return result;
      }
    });

  const rowSelected = (args) => {
    const { lable, old, new: newval } = args?.data;
   
    if (lable === "Notches") {
      setLabel(lable);
      let oldArr = old.split(" ");
      let newArr = newval.split(" ");
      let largeArr = oldArr.length > newArr.length ? oldArr : newArr
      
      let arr = [];

      largeArr.forEach((x,i) => {
        let obj = { index: i+1, old: oldArr[i] ? oldArr[i] : '' , new: newArr[i] ? newArr[i] : ''  };

          arr.push(obj);
      });

      setValues(arr);

      setShow(true)
    }
    if (lable === "Locations") {

      
      setLabel(lable);
      let oldArr = old.split(",");
      let newArr = newval.split(",");
      let largeArr = oldArr.length > newArr.length ? oldArr : newArr
      
      let arr = [];

      largeArr.forEach((x,i) => {
        let obj = { index: i+1, old: oldArr[i] ? oldArr[i] : '' , new: newArr[i] ? newArr[i] : ''  };

          arr.push(obj);
      });

    
      setValues(arr);

      setShow(true)
    }
  };

  return (
    <>
      <GridComponent
        dataSource={renderData(data)}
        allowPaging={false}
        queryCellInfo={queryCellInfo}
        height={450}
        pageSettings={{ pageCount: 5 }}
        rowSelected={rowSelected}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="lable"
            headerText="Label"
            width={isGL ? 400 : 200}
          />
          <ColumnDirective
            field="old"
            headerText="Old"
            width={isGL ? 200 : 400}
          />
          <ColumnDirective
            field="new"
            headerText="New"
            width={isGL ? 200 : 400}
          />
        </ColumnsDirective>
        <Inject services={[Page]} />
      </GridComponent>

      <CModal closeOnBackdrop={false} show={show} onClose={() => setShow(false)} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>{label}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <GridComponent
            dataSource={values}
            allowPaging={false}
            queryCellInfo={queryCellInfo}
            height={450}
            pageSettings={{ pageCount: 5 }}
          
          >
            <ColumnsDirective>
              <ColumnDirective
                field="index"
                headerText="Index"
                width={70}
              />
              <ColumnDirective
                field="old"
                headerText="Old"
                width={200}
              />
              <ColumnDirective
                field="new"
                headerText="New"
                width={200}
              />
            </ColumnsDirective>
            <Inject services={[Page]} />
          </GridComponent>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShow(false)}>
            <CSLab name="Close" code={"HCM-9E3ZC2E1S0N-LASN"} />
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ViewDetailsTable;
