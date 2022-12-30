import React from "react";

import {Skeleton, Row, Col, Space} from "antd";

import _ from "lodash";


const ActionSkeletonComponent = ({row = 3}) => {

    const rows = _.range(row).map((i) => (
        <Row gutter={16} key={i} style={{marginTop: 20}}>
            <Col className="gutter-row" span={6} offset={2}>
                <Skeleton.Input style={{width: "100%"}} active/>
            </Col>
            <Col className="gutter-row" span={6}>
                <Skeleton.Input style={{width: "100%"}} active/>
            </Col>
            <Col className="gutter-row" span={6}>
                <Skeleton.Input style={{width: "100%"}} active/>
            </Col>
        </Row>
    ));


    return (
        <>
            {rows}
            <Row gutter={16} style={{marginTop: 20}}>
                <Col className="gutter-row" span={6} offset={18}>
                    <Space direction={"vertical"}>
                        <Skeleton.Button shape={"circle"} active={true} size={"large"}/>
                        <Skeleton.Button shape={"circle"} active={true} size={"large"}/>
                        <Skeleton.Button shape={"circle"} active={true} size={"large"}/>
                    </Space>
                </Col>
            </Row>
        </>

    );
}

export default ActionSkeletonComponent;