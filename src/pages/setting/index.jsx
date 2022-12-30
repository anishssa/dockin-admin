import React from "react";
import {Breadcrumb} from "antd";



const Setting = () => {
    return (
        <div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                }}
            >
                Bill is a cat.
            </div>
        </div>
    );
}

export default Setting;