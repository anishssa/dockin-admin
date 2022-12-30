import {Tag, theme} from "antd";
import React from "react";


const IdWidget = ({id}) => {

    const {token: {iconColor}} = theme.useToken();
    return (
        id ? <Tag color={iconColor}>{id}</Tag> : null
    )
}

export default IdWidget;
