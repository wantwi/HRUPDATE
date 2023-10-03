import CIcon from "@coreui/icons-react";
import { CButton, CCardFooter } from "@coreui/react";
import React from "react";
import {
  AiFillSave,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineRedo,
} from "react-icons/ai";
import { CSLab } from "src/reusable/components";

const FormFooter = ({
  access,
  mode = "Add",
  searchReset = () => {},
  handleReset = () => {},
  handleHistory = () => {},
  handleDelete = () => {},
  handleOnSubmit = () => {},
  hasHistory = true,
  allowUpdate = false
}) => {
  const {
    canAudit = false,
    canRead = false,
    canCreate = false,
    canUpdate = false,
    canDelete = false,
  } = access;

  let footterContent;

  if (canCreate && canUpdate) {
    footterContent = (
      <CCardFooter>
        {canAudit ? (
          hasHistory ? (
            mode === "Update" ? (
              <CButton
                onClick={handleHistory}
                style={{ marginRight: 5, color: "white" }}
                type="button"
                size="sm"
                color="success"
                
              >
                <CIcon name="cil-scrubber" />
                <CSLab lable="View History" code="HCM-ZIRH5SVBDUF_LANG" />
              </CButton>
            ) : null
          ) : null
        ) : null}
        {mode === "Add" ? (
          <>
            <CButton
              style={{ marginRight: 5, float: "right" }}
              type="button"
              size="sm"
              color="success"
              onClick={handleOnSubmit}
            >
              <AiFillSave size={20} />
              <CSLab code="HCM-HGUHIR0OK6T" />
            </CButton>
          </>
        ) : (
          <CButton
            style={{ marginRight: 5, float: "right", cursor: allowUpdate ?  "not-allowed" : "pointer" }}
            type="button"
            size="sm"
            color="success"
            onClick={handleOnSubmit}
            disabled={allowUpdate}
          >
            <AiFillSave size={20} />
            <CSLab code="HCM-5L07EAZ2A48" />
          </CButton>
        )}
        <CButton
          style={{ marginRight: 5, float: "right", color: "white" }}
          onClick={() => handleReset(1)}
          type="button"
          size="sm"
          color={"warning"}
        >
          <AiOutlineRedo size={20} />
          <CSLab code="HCM-MELULU9B6R_KCMI" />
        </CButton>
        {mode !== "Add" ? (
          canDelete ? (
            <CButton
              onClick={handleDelete}
              style={{ marginRight: 5, float: "right", color: "white" }}
              type="button"
              size="sm"
              color="danger"
            >
              <AiOutlineDelete size={20} />
              <CSLab lable="Delete" code="HCM-IIQS2WWFTPP_KCMI" />
            </CButton>
          ) : null
        ) : null}

        <CButton
          name="Cancel"
          style={{
            marginRight: 5,
            float: "right",
            color: "white",
            background: "#4e4e4eeb",
          }}
          onClick={() => searchReset()}
          type="button"
          size="sm"
          color="secondary"
        >
          <AiOutlineClose size={20} />
          <CSLab code="HCM-V3SL5X7PJ9C-LANG" />
        </CButton>
      </CCardFooter>
    );
  } else if (canCreate && !canUpdate) {
    footterContent = (
      <CCardFooter>
        {canAudit ? (
          hasHistory ? (
            mode === "Update" ? (
              <CButton
                onClick={handleHistory}
                style={{ marginRight: 5, color: "white" }}
                type="button"
                size="sm"
                color="success"
              >
                <CIcon name="cil-scrubber" />
                <CSLab lable="View History" code="HCM-ZIRH5SVBDUF_LANG" />
              </CButton>
            ) : null
          ) : null
        ) : null}
        {mode === "Add" ? (
          <>
            <CButton
              style={{ marginRight: 5, float: "right" }}
              type="button"
              size="sm"
              color="success"
              onClick={handleOnSubmit}
            >
              <AiFillSave size={20} />
              <CSLab code="HCM-HGUHIR0OK6T" />
            </CButton>
            <CButton
              style={{ marginRight: 5, float: "right", color: "white" }}
              onClick={() => handleReset(1)}
              type="button"
              size="sm"
              color={"warning"}
            >
              <AiOutlineRedo size={20} />
              <CSLab code="HCM-MELULU9B6R_KCMI" />
            </CButton>
          </>
        ) : null}

        {mode !== "Add" ? (
          canDelete ? (
            <CButton
              onClick={handleDelete}
              style={{ marginRight: 5, float: "right", color: "white" }}
              type="button"
              size="sm"
              color="danger"
            >
              <AiOutlineDelete size={20} />
              <CSLab lable="Delete" code="HCM-IIQS2WWFTPP_KCMI" />
            </CButton>
          ) : null
        ) : null}
        <CButton
          name="Cancel"
          style={{
            marginRight: 5,
            float: "right",
            color: "white",
            background: "#4e4e4eeb",
          }}
          onClick={() => searchReset()}
          type="button"
          size="sm"
          color="secondary"
        >
          <AiOutlineClose size={20} />
          <CSLab code="HCM-V3SL5X7PJ9C-LANG" />
        </CButton>
      </CCardFooter>
    );
  } else if (!canCreate && canUpdate) {
    footterContent = (
      <CCardFooter>
        {canAudit ? (
          hasHistory ? (
            mode === "Update" ? (
              <CButton
                onClick={handleHistory}
                style={{ marginRight: 5, color: "white" }}
                type="button"
                size="sm"
                color="success"
              >
                <CIcon name="cil-scrubber" />
                <CSLab lable="View History" code="HCM-ZIRH5SVBDUF_LANG" />
              </CButton>
            ) : null
          ) : null
        ) : null}
        {mode === "Add" ? null : (
          <>
            <CButton
              style={{ marginRight: 5, float: "right" }}
              type="button"
              size="sm"
              color="success"
              onClick={handleOnSubmit}
            >
              <AiFillSave size={20} />
              <CSLab code="HCM-5L07EAZ2A48" />
            </CButton>
            <CButton
              style={{ marginRight: 5, float: "right", color: "white" }}
              onClick={() => handleReset(1)}
              type="button"
              size="sm"
              color={"warning"}
            >
              <AiOutlineRedo size={20} />
              <CSLab code="HCM-MELULU9B6R_KCMI" />
            </CButton>
          </>
        )}

        {mode !== "Add" ? (
          canDelete ? (
            <CButton
              onClick={handleDelete}
              style={{ marginRight: 5, float: "right", color: "white" }}
              type="button"
              size="sm"
              color="danger"
            >
              <AiOutlineDelete size={20} />
              <CSLab lable="Delete" code="HCM-IIQS2WWFTPP_KCMI" />
            </CButton>
          ) : null
        ) : null}
        <CButton
          name="Cancel"
          style={{
            marginRight: 5,
            float: "right",
            color: "white",
            background: "#4e4e4eeb",
          }}
          onClick={() => searchReset()}
          type="button"
          size="sm"
          color="secondary"
        >
          <AiOutlineClose size={20} />
          <CSLab code="HCM-V3SL5X7PJ9C-LANG" />
        </CButton>
      </CCardFooter>
    );
  } else {
    footterContent = (
      <CCardFooter>
        {canAudit ? (
          hasHistory ? (
            mode === "Update" ? (
              <CButton
                onClick={handleHistory}
                style={{ marginRight: 5, color: "white" }}
                type="button"
                size="sm"
                color="success"
              >
                <CIcon name="cil-scrubber" />
                <CSLab lable="View History" code="HCM-ZIRH5SVBDUF_LANG" />
              </CButton>
            ) : null
          ) : null
        ) : null}

        {mode !== "Add" ? (
          canDelete ? (
            <CButton
              onClick={handleDelete}
              style={{ marginRight: 5, float: "right", color: "white" }}
              type="button"
              size="sm"
              color="danger"
            >
              <AiOutlineDelete size={20} />
              <CSLab lable="Delete" code="HCM-IIQS2WWFTPP_KCMI" />
            </CButton>
          ) : null
        ) : null}
        <CButton
          name="Cancel"
          style={{
            marginRight: 5,
            float: "right",
            color: "white",
            background: "#4e4e4eeb",
          }}
          onClick={() => searchReset()}
          type="button"
          size="sm"
          color="secondary"
        >
          <AiOutlineClose size={20} />
          <CSLab code="HCM-V3SL5X7PJ9C-LANG" />
        </CButton>
      </CCardFooter>
    );
  }
  return <>{footterContent}</>;
};

export default FormFooter;
