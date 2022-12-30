import React, {useEffect, useState} from "react";
import {Table, Col, Row, Badge, Card} from "antd";
import _ from "lodash";
import {useNavigate} from "react-router-dom";

import {confirmAlert, success, error, ucFirst, formatPrice} from "../../utils/helper";
import PlanService from "../../api/services/plan";
import AddWidget from "../../widgets/AddWidget";
import EditWidget from "../../widgets/EditWidget";
import ViewWidget from "../../widgets/ViewWidget";
import DeleteWidget from "../../widgets/DeleteWidget";
import StatusWidget from "../../widgets/StatusWidget";
import SearchWidget from "../../widgets/SearchWidget";
import TableSkeletonComponent from "../../components/TableSkeletonComponent";
import {StatusColors, PeriodColorEnum, PeriodEnum} from "../../utils/enums";

const Plan = () => {
    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(null);
    const [loadingSwitch, setLoadingSwitch] = useState([]);
    const [loadingDelete, setLoadingDelete] = useState([]);


    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (v, record) => (
                record.isFree ? (
                    <Badge.Ribbon text="Free" color={StatusColors.free}>
                        <Card title={v} size="small">
                            {record.description}
                        </Card>
                    </Badge.Ribbon>) : v
            ),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Duration",
            dataIndex: "period",
            key: "period",
            width: "10%",
            render: (v, record) => (
                <div className="ribbonTable">
                    <Badge.Ribbon text={`${record.unit} ${ucFirst(v)}`} color={PeriodColorEnum[v]}>
                    </Badge.Ribbon>
                </div>
            ),
            filters: Object.values(PeriodEnum).map((item, index) => {
                return {
                    text: ucFirst(item),
                    value: item
                }
            }),
            onFilter: (value, record) => record.period.indexOf(value) === 0,
        },
        {
            title: "Price",
            dataIndex: "amount",
            key: "price",
            width: "10%",
            render: (v, record) => (
                <div>
                    {record.isFree ? '-' : formatPrice(v)}
                </div>
            ),
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: "Active",
            dataIndex: "activeSubscription",
            key: "status",
            width: "10%",
            render: (v) => (
                <Badge overflowCount={99999999} showZero count={v} style={{backgroundColor: StatusColors.Active}}/>
            ),
            sorter: (a, b) => a.activeSubscription - b.activeSubscription,
        },
        {
            title: "Expired",
            dataIndex: "expiredSubscription",
            key: "expired",
            width: "10%",
            render: (v) => (
                <Badge overflowCount={99999999} showZero count={v} style={{backgroundColor: StatusColors.Expired}}/>
            ),
            sorter: (a, b) => a.expiredSubscription - b.expiredSubscription,
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: "20%",
            render: (val, record) => (
                <>
                    <StatusWidget loading={loadingSwitch[record._id] ?? false}
                                  status={record.status} onChange={(v) => changeStatus(v, record)}/>
                    <EditWidget onClick={() => navigate(`/plans/edit/${record._id}`)}/>
                    <ViewWidget onClick={() => navigate(`/plans/view/${record._id}`)}/>
                    <DeleteWidget loading={loadingDelete[record._id] ?? false}
                                  onClick={() => deletePlan(record._id)}/>
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


    const expandable = {
        expandedRowRender: (record) => (
            <Card title="Usage Discount" style={{width: "50%"}}>
                <Row className="discount-table">
                    {record.discounts && record.discounts.length > 0 && (
                        <table>
                            <thead>
                            <tr>
                                <th style={{width: "16%"}}>Usage</th>
                                <th style={{width: "30%"}}>Type</th>
                                <th colSpan={3}>Validity/Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {record.discounts.map((item, index) => (
                                <tr key={index}>
                                    <td style={{width: "16%"}}>{item.usage}</td>
                                    <td style={{width: "30%"}}>{ucFirst(item.type)}</td>
                                    <td style={{width: "16%"}}>{item.discountValue}</td>
                                    <td style={{width: "16%"}}>{ucFirst(item.discountType)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </Row>
            </Card>
        ),
        rowExpandable: (record) => record.discounts && record.discounts.length > 0,
    };


    const onSearch = (e) => {
        setSearch(e.target.value);
    }

    const debounce = _.debounce(() => {
        fetchPlans();
    }, 1000);


    const fetchPlans = async () => {
        try {
            setLoading(true);
            setPlans([]);
            var searchParams = 'sortByDesc=createdAt';
            if (search)
                searchParams += `&searchByOr[name]=${search}&searchByOr[period]=${search}`;
            const response = await PlanService.list(searchParams);

            setPlans(response.data.data);
        } catch (e) {
            error(e);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    const deletePlan = (id) => {
        confirmAlert(
            async () => {
                setLoadingDelete({...loadingDelete, [id]: true});
                try {
                    await PlanService.delete(id);
                    success("Plan deleted successfully");
                    const index = _.findIndex(plans, {_id: id});
                    plans.splice(index, 1);
                    setPlans([...plans]);
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
            await PlanService.patch(record._id, {status: v});

            const index = _.findIndex(plans, {_id: record._id});
            plans[index] = {...plans[index], status: v};
            setPlans([...plans]);

        } catch (e) {
            error(e);
        } finally {
            setLoadingSwitch({...loadingSwitch, [record._id]: false});
        }
    }


    useEffect(() => {
        debounce();
    }, [search]);


    return (

        <div>
            <h3>Plans</h3>

            <Row gutter={24}>
                <Col span={4}>
                    <AddWidget label="Add Plan" onClick={
                        () => navigate('/plans/add/')
                    }/>
                </Col>
                <Col span={6} offset={14}>
                    <SearchWidget onSearch={onSearch} loading={loading}/>
                </Col>
            </Row>

            {loading && <TableSkeletonComponent columns={columns}/>}
            {!loading && <Table rowKey="_id" dataSource={plans} columns={columns} expandable={expandable}/>}

        </div>
    );
};


export default Plan;