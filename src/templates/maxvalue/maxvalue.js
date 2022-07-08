import { components } from "react-select";

export const customStyles = {
  control: (provided, state) => ({
    ...provided,

    background: "#fff",

    borderColor: "#9e9e9e",

    minHeight: "32px",

    height: "32px",

    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,

    height: "30px",

    padding: "0 6px",
  }),

  input: (provided, state) => ({
    ...provided,

    margin: "0px",
  }),

  indicatorSeparator: (state) => ({
    display: "none",
  }),

  indicatorsContainer: (provided, state) => ({
    ...provided,

    height: "30px",
  }),
};
const MoreSelectedBadge = ({ items }) => {
  const style = {
    marginLeft: "auto",

    background: "#d4eefa",

    borderRadius: "4px",

    fontFamily: "Open Sans",

    fontSize: "11px",

    padding: "3px",

    order: 99,
  };

  const title = items.join(", ");

  const length = items.length;

  const label = `+ ${length} item${length !== 1 ? "s" : ""} selected`;

  return (
    <div style={style} title={title}>
      {label}
    </div>
  );
};

export const MultiValue = ({ index, getValue, ...props }) => {
  const maxToShow = 3;
  const overflow = getValue()
    .slice(maxToShow)
    .map((x) => x.label);
  return index < maxToShow ? (
    <components.MultiValue {...props} />
  ) : index === maxToShow ? (
    <MoreSelectedBadge items={overflow} />
  ) : null;
};
