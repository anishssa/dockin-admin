import React, {useEffect, useState} from "react";
import {Table, Col, Row, Tag} from "antd";
import _ from "lodash";
import {useNavigate} from "react-router-dom";

import {confirmAlert, success, error, ucFirst} from "../../utils/helper";
import UserService from "../../api/services/user";
import EditWidget from "../../widgets/EditWidget";
import ViewWidget from "../../widgets/ViewWidget";
import DeleteWidget from "../../widgets/DeleteWidget";
import StatusWidget from "../../widgets/StatusWidget";
import SearchWidget from "../../widgets/SearchWidget";
import TableSkeletonComponent from "../../components/TableSkeletonComponent";
import {UserRoleColorEnum} from "../../utils/enums";

const User = () => {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingSwitch, setLoadingSwitch] = useState([]);
    const [loadingDelete, setLoadingDelete] = useState([]);
    const [tableParams, setTableParams] = useState({
        search: null,
        sorter: null,
        filter: null,
        pagination: {
            current: 1,
            pageSize: 10
        },
    });


    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: true,
        },
        {
            title: "Mobile",
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            sorter: true,
            render: (v) => (
                <Tag color={UserRoleColorEnum[v]}>{ucFirst(v)}</Tag>
            ),
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: "25%",
            render: (val, record) => (
                <>
                    <StatusWidget loading={loadingSwitch[record._id] ?? false}
                                  status={record.status} onChange={(v) => changeStatus(v, record)}/>
                    <EditWidget onClick={() => navigate(`/users/edit/${record._id}`)}/>
                    <ViewWidget onClick={() => navigate(`/users/view/${record._id}`)}/>
                    <DeleteWidget loading={loadingDelete[record._id] ?? false}
                                  onClick={() => deleteUser(record._id)}/>
                </>
            ),
            filters: [
                {
                    text: "Active",
                    value: true
                },
                {
                    text: "Inactive",
                    value: false
                }
            ],
            onFilter: (value, record) => record.status === value,
        }
    ];


    const onSearch = (e) => {
        setTableParams({
            ...tableParams,
            search: e.target.value,
            pagination: {
                ...tableParams.pagination,
                current: 1
            }
        });
    }


    const handleTableChange = (pagination, filters, sorter) => {

        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setUsers([]);
        }
    };


    const debounce = _.debounce(async () => {
        await fetchUsers();
    }, 1000);


    const fetchUsers = async () => {
        try {
            setLoading(true);
            setUsers([]);

            const {pagination, search, filter, sort} = tableParams;
            const {current, pageSize} = pagination;

            var searchParams = 'page=' + current + '&limit=' + pageSize;
            if (search)
                searchParams += `&search[name]=${search}`;
            const response = await UserService.list(searchParams);

            const result = response.data.data;

            if (pagination.current === 1) {
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: result.pagination ? result.pagination.totalDocs : 0
                    }
                });
            }
            setUsers(result.response);
        } catch (e) {
            error(e);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 100);
        }
    };

    const deleteUser = (id) => {
        confirmAlert(
            async () => {
                setLoadingDelete({...loadingDelete, [id]: true});
                try {
                    await UserService.delete(id);
                    success("User deleted successfully");
                    const index = _.findIndex(users, {_id: id});
                    users.splice(index, 1);
                    setUsers([...users]);
                    debounce();
                } catch (e) {
                    error(e);
                } finally {
                    setLoadingDelete({...loadingDelete, [id]: false});
                }

            }
        )
    };

    async function changeStatus(v, record) {

        setLoadingSwitch({...loadingSwitch, [record._id]: true});

        try {
            await UserService.patch(record._id, {status: v});

            const index = _.findIndex(users, {_id: record._id});
            users[index] = {...users[index], status: v};
            setUsers([...users]);

        } catch (e) {
            error(e);
        } finally {
            setLoadingSwitch({...loadingSwitch, [record._id]: false});
        }
    }

    useEffect(() => {
        debounce();
    }, [JSON.stringify(tableParams)]);


    return (

        <div>
            <h3>Users</h3>

            <Row gutter={24}>
                <Col span={6} offset={18}>
                    <SearchWidget onSearch={onSearch} loading={loading}/>
                </Col>
            </Row>

            {loading && <TableSkeletonComponent columns={columns}/>}
            {!loading &&
            <Table pagination={tableParams.pagination} rowKey="_id" dataSource={users}
                   columns={columns}
                   onChange={handleTableChange}/>}
        </div>
    );
};


export default User;