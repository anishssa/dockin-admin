import {Button, theme} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import React from "react";



const DeleteWidget = ({onClick, loading = false}) => {

    const {token: {iconColor}} = theme.useToken();
        return (
            <Button loading={loading} type="link" onClick={onClick}
                    icon={<DeleteOutlined style={{fontSize: '15px', color: 'red'}}/>}/>
        )
}

export default DeleteWidget;
