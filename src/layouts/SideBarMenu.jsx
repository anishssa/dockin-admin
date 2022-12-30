import React, {useState} from "react";
import {Menu, Layout, theme} from "antd";
import {DesktopOutlined, PieChartOutlined, TeamOutlined, MoneyCollectOutlined} from "@ant-design/icons";
import logo from "../assets/logo.png";
import logoIcon from "../assets/logo-icon.png";
import {NavLink, useLocation} from "react-router-dom"


const {Sider} = Layout;


const SideBarMenu = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const [key, setKey] = useState(location.pathname)


    const {
        token: {iconColor},
    } = theme.useToken();

    const items = [
        {
            label: <NavLink to={"/dashboard"}>Dashboard</NavLink>,
            icon: <PieChartOutlined style={{color: iconColor}}/>,
            key: '/dashboard'
        },
        {
            label: <NavLink to={"/users"}>Users</NavLink>,
            icon: <TeamOutlined style={{color: iconColor}}/>,
            key: '/users'
        },
        {
            label: <NavLink to={"/plans"}>Plans</NavLink>,
            icon: <MoneyCollectOutlined style={{color: iconColor}}/>,
            key: '/plans'
        },
        {
            label: 'System',
            icon: <DesktopOutlined style={{color: iconColor}}/>,
            key: 'sub2',
            children: [
                {
                    label: <NavLink to={"/harbours"}>Harbours</NavLink>,
                    key: '/harbours'
                },
                {
                    label: <NavLink to={"/languages"}>Languages</NavLink>,
                    key: '/languages'
                },
                {
                    label: <NavLink to={"/stones"}>Stones</NavLink>,
                    key: '/stones'
                },
                {
                    label: <NavLink to={"/settings"}>Settings</NavLink>,
                    key: '/settings'

                }
            ]
        },
        {
            label: 'Subscriptions',
            icon: <TeamOutlined style={{color: iconColor}}/>,
            key: 'sub3',
            children: [
                {
                    label: <NavLink to={"/invoices"}>Invoice</NavLink>,
                    key: '/invoices'

                },
                {
                    label: <NavLink to={"/transactions"}>Transaction</NavLink>,
                    key: '/transactions'

                }
            ]

        }
    ];


    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>

            <div className="admin-logo">
                {collapsed
                    ? <img className="logo" src={logoIcon} alt="logo"/>
                    : <img className="logo" src={logo} alt="logo"/>
                }
            </div>
            <Menu theme="light" mode="inline" items={items}
                  selectedKeys={[key]}
                  onSelect={({key}) => setKey(key)}
            />
        </Sider>
    );
};

export default SideBarMenu;