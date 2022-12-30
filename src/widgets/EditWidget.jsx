import {Button, theme} from "antd";
import {EditOutlined} from "@ant-design/icons";
import React from "react";

const EditWidget = ({onClick, loading = false}) => {

    const {token: {iconColor}} = theme.useToken();
        return (
            <Button loading={loading} type="link" onClick={onClick}
                    icon={<EditOutlined style={{fontSize: '15px', color: iconColor}}/>}/>
        )
}

export default EditWidget;
