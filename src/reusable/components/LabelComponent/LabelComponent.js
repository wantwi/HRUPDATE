import React from 'react';
import { useSelector } from 'react-redux';

import { GetLabelByName } from 'src/reusable/configs/config';

const LabelComponent = (props) => {
    const lan = useSelector(state => state.language);

    return (
        <span {...props}>{GetLabelByName(props.code, lan)}</span>
    )
}

export default LabelComponent;