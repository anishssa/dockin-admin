import React, {useEffect, useState} from "react";
import {Table, Col, Row} from "antd";
import _ from "lodash";

import {confirmAlert, success, error} from "../../utils/helper";
import LanguageService from "../../api/services/language";
import LanguageAction from "./action";
import AddWidget from "../../widgets/AddWidget";
import EditWidget from "../../widgets/EditWidget";
import ViewWidget from "../../widgets/ViewWidget";
import DeleteWidget from "../../widgets/DeleteWidget";
import StatusWidget from "../../widgets/StatusWidget";
import SearchWidget from "../../widgets/SearchWidget";
import TableSkeletonComponent from "../../components/TableSkeletonComponent";

const Language = () => {

    const [languages, setLanguages] = useState([]);
    const [language, setLanguage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(null);
    const [action, setAction] = useState(null);
    const [loadingSwitch, setLoadingSwitch] = useState([]);
    const [loadingDelete, setLoadingDelete] = useState([]);
    const [showModel, setShowModel] = useState(false);


    const columns = [
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
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
                                  onClick={() => deleteLanguage(record._id)}/>
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


    function saveAction(action, language = null) {
        setLanguage(language);
        setAction(action);
    }

    function resetAction(c) {
        setLanguage(null);
        setAction(null);
        setShowModel(c);
        if (c)
            debounce();
    }

    const onSearch = (e) => {
        setSearch(e.target.value);
    }

    const debounce = _.debounce(() => {
        fetchLanguages();
    }, 1000);


    const fetchLanguages = async () => {
        try {
            setLoading(true);
            setLanguages([]);
            var searchParams = '';
            if (search)
                searchParams = `search[name]=${search}`;
            const response = await LanguageService.list(searchParams);
            setLanguages(response.data.data);
        } catch (e) {
            error(e);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    const deleteLanguage = (id) => {
        confirmAlert(
            async () => {
                setLoadingDelete({...loadingDelete, [id]: true});
                try {
                    await LanguageService.delete(id);
                    success("Language deleted successfully");
                    const index = _.findIndex(languages, {_id: id});
                    languages.splice(index, 1);
                    setLanguages([...languages]);
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
            await LanguageService.patch(record._id, {status: v});

            const index = _.findIndex(languages, {_id: record._id});
            languages[index] = {...languages[index], status: v};
            setLanguages([...languages]);

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
            <h3>Languages</h3>

            <Row gutter={24}>
                <Col span={4}>
                    <AddWidget label="Add Language" onClick={() => saveAction('add', {status: true})}/>
                </Col>
                <Col span={6} offset={14}>
                    <SearchWidget onSearch={onSearch} loading={loading}/>
                </Col>
            </Row>

            {loading && <TableSkeletonComponent columns={columns}/>}
            {!loading && <Table dataSource={languages} columns={columns} rowKey="_id"/>}
            {action && <LanguageAction open={showModel} action={action} language={language} onClose={resetAction}/>}

        </div>
    );
};


export default Language;