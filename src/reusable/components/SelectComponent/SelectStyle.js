import { components } from "react-select";

export const customStyles = {
    control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderColor: '#d8dbe0',
        minHeight: '30px',
        height: '30px',
        boxShadow: state.isFocused ? null : null,
       
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        height: '25px',
        padding: '0 6px',
        marginBottom: '10px'
    }),

    input: (provided, state) => ({
        ...provided,
        margin: '0px',

    }),
    indicatorSeparator: state => ({
        display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '30px',
    }),

    control: (styles, { isDisabled}) => {
        return {
          ...styles,
        //   boxShadow: state.isFocused ? null : null,
          cursor: isDisabled ? 'not-allowed' : 'default',
          // This is an example: backgroundColor: isDisabled ? 'rgba(206, 217, 224, 0.5)' : 'white'
          color: isDisabled ? "#d8dbe0" : 'white'
        }
      },
      // For the options
    //   option: (styles, { isDisabled}) => {
    //     const color = chroma(data.color);
    //     return {
    //       ...styles,
    //       backgroundColor: isDisabled ? 'red' : blue,
    //       color: '#FFF',
    //       cursor: isDisabled ? 'not-allowed' : 'default',
    //     };
    //   },
};

const MoreSelectedBadge = ({ items }) => {
    const style = {
        marginLeft: "auto",
        background: "#d4eefa",
        color: '#000000',
        borderRadius: "4px",
        fontFamily: "Open Sans",
        fontSize: "11px",
        padding: "3px",
        order: 99
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