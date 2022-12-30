import {Button, theme, Tooltip} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React from "react";


const PlusWidget = ({onClick, disabled = false, title = "Add"}) => {

    const {token: {iconColor}} = theme.useToken();
    return (
        <Tooltip title={title}>
        <Button shape="circle" disabled={disabled} onClick={onClick} icon={<PlusOutlined style={{fontSize: '15px', color: iconColor}}/>}/>
        </Tooltip>
    )
}

export default PlusWidget;
