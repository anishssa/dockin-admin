import {Button, theme} from "antd";
import {EyeOutlined} from "@ant-design/icons";
import React from "react";



const ViewWidget = ({onClick, loading = false}) => {

    const {token: {iconColor}} = theme.useToken();
        return (
            <Button loading={loading} type="link" onClick={onClick}
                    icon={<EyeOutlined style={{fontSize: '15px', color: iconColor}}/>}/>
        )
}

export default ViewWidget;
