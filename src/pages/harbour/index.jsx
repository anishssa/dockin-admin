import React, {useEffect, useState} from "react";
import {Table, Col, Row} from "antd";
import _ from "lodash";

import {confirmAlert, success, error} from "../../utils/helper";
import HarbourService from "../../api/services/harbour";
import HarbourAction from "./action";
import AddWidget from "../../widgets/AddWidget";
import EditWidget from "../../widgets/EditWidget";
import ViewWidget from "../../widgets/ViewWidget";
import DeleteWidget from "../../widgets/DeleteWidget";
import StatusWidget from "../../widgets/StatusWidget";
import SearchWidget from "../../widgets/SearchWidget";
import TableSkeletonComponent from "../../components/TableSkeletonComponent";

const Harbour = () => {

    const [harbours, setHarbours] = useState([]);
    const [harbour, setHarbour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(null);
    const [action, setAction] = useState(null);
    const [loadingSwitch, setLoadingSwitch] = useState([]);
    const [loadingDelete, setLoadingDelete] = useState([]);
    const [showModel, setShowModel] = useState(false);


    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "lat",
            render: (val, record) => {
                return `[${record.lat} , ${record.lng}]`;
            }
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
                    <EditWidget onClick={() => saveAction('edit', record)}/>
                    <ViewWidget onClick={() => saveAction('view', record)}/>
                    <DeleteWidget loading={loadingDelete[record._id] ?? false}
                                  onClick={() => deleteHarbour(record._id)}/>
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


    function saveAction(action, harbour = null) {
        setHarbour(harbour);
        setAction(action);
    }

    function resetAction(c) {
        setHarbour(null);
        setAction(null);
        setShowModel(c);
        if (c)
            debounce();
    }

    const onSearch = (e) => {
        setSearch(e.target.value);
    }

    const debounce = _.debounce(() => {
        fetchHarbours();
    }, 1000);


    const fetchHarbours = async () => {
        try {
            setLoading(true);
            setHarbours([]);
            var searchParams = '';
            if (search)
                searchParams = `search[name]=${search}`;
            const response = await HarbourService.list(searchParams);
            setHarbours(response.data.data);
        } catch (e) {
            error(e);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    const deleteHarbour = (id) => {
        confirmAlert(
            async () => {
                setLoadingDelete({...loadingDelete, [id]: true});
                try {
                    await HarbourService.delete(id);
                    success("Harbour deleted successfully");
                    const index = _.findIndex(harbours, {_id: id});
                    harbours.splice(index, 1);
                    setHarbours([...harbours]);
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
            await HarbourService.patch(record._id, {status: v});

            const index = _.findIndex(harbours, {_id: record._id});
            harbours[index] = {...harbours[index], status: v};
            setHarbours([...harbours]);

        } catch (e) {
            error(e);
        } finally {
            setLoadingSwitch({...loadingSwitch, [record._id]: false});
        }
    }


    useEffect(() => {
        debounce();
    }, [search]);

    useEffect(() => {
        if (action)
            setShowModel(true);
        else
            setShowModel(false);
    }, [action]);


    return (

        <div>
            <h3>Harbours</h3>

            <Row gutter={24}>
                <Col span={4}>
                    <AddWidget label="Add Harbour" onClick={() => saveAction('add', {status: true})}/>
                </Col>
                <Col span={6} offset={14}>
                    <SearchWidget onSearch={onSearch} loading={loading}/>
                </Col>
            </Row>

            {loading && <TableSkeletonComponent columns={columns}/>}
            {!loading && <Table dataSource={harbours} columns={columns} rowKey="_id" />}
            {action && <HarbourAction open={showModel} action={action} harbour={harbour} onClose={resetAction}/>}

        </div>
    );
};


export default Harbour;