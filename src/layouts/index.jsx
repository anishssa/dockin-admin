import React from 'react';
import {Outlet} from 'react-router-dom'


import {Layout} from 'antd';
import HeaderMenu from "./HeaderMenu";
import FooterMenu from "./FooterMenu";
import SideBarMenu from "./SideBarMenu";

const {Content} = Layout;

const MainLayout = () => {


    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <SideBarMenu />

            <Layout className="site-layout">
                <HeaderMenu/>

                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >

                    <Outlet/>
                </Content>

                <FooterMenu/>
            </Layout>
        </Layout>
    );
};
export default MainLayout;