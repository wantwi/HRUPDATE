import React from 'react';
import { CSLab } from '..';

const CSLineLabel = ({ style, name }) => {
    return (<h6 style={style} className="line"><CSLab code={name} /></h6>)
}

export default CSLineLabel;