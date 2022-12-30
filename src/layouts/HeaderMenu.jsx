import React from "react";
import {Layout, Avatar, Badge, Space, theme, Menu, Dropdown} from "antd";
import {BellOutlined, LogoutOutlined} from "@ant-design/icons";
import avatar from "../assets/avatar.png";
import {useLocation} from "react-router-dom";


const {Header} = Layout;


const HeaderMenu = () => {

    const {
        token: {iconColor, backgroundColor},
    } = theme.useToken();


    const items = [
        {
            key: '1',
            label: "Profile",
            icon: <img className="logo-avatar" style={{height: 30}} src={avatar} alt="logo"/>
        },
        {
            key: '2',
            label: "Logout",
            icon: <LogoutOutlined style={{fontSize: '15px', color: iconColor}}/>
        }
    ];

    return (
        <Header
            className="site-layout-background"
            style={{
                padding: 0,
                backgroundColor: backgroundColor

            }}
        >
            <div className="space-align-container" style={{float: "right", marginRight: 50}}>
                <Space size="middle" align="end">
                    <Badge count={5}>
                        <BellOutlined style={{fontSize: '25px', color: iconColor}}/>
                    </Badge>

                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <img className="logo-avatar" style={{height: 30}} src={avatar} alt="logo"/>
                    </Dropdown>


                </Space>
            </div>

        </Header>


    );
}

export default HeaderMenu;