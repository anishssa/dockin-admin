import React from "react";

import {Table, Skeleton} from "antd";

const TableSkeletonComponent = ({columns}) => {

    const users = Array.from({length: 10}, () => ({}));
    return (
        <Table
            dataSource={[]}
            columns={columns}
            locale={{
                emptyText: users.map(u => <Skeleton.Input key={Math.random()} height={50}
                                                          style={{marginTop: '10px', width: '100%'}} active={true}/>)
            }}
        />
    );
}

export default TableSkeletonComponent;