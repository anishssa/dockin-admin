import {Button, theme} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React from "react";


const AddWidget = ({onClick, label = "Add", loading = false}) => {

    const {token: {iconColor}} = theme.useToken();
        return (
            <Button type="dashed" onClick={onClick}>
                <PlusOutlined style={{fontSize: '15px', color: iconColor}}/> {label}
            </Button>
        )
}

export default AddWidget;
