import {Input, theme} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import React from "react";



const SearchWidget = ({onSearch, loading = false}) => {

    const {token: {iconColor}} = theme.useToken();
        return (
            <Input style={{width: '100%', marginBottom: 10}} placeholder="Search" onChange={onSearch}
                   onPressEnter={onSearch} allowClear
                   prefix={<SearchOutlined style={{fontSize: '15px', color: iconColor}}/>}/>
        )
}

export default SearchWidget;
