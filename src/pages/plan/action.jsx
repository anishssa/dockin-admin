import React, {useEffect, useState} from "react";
import {Card, Col, Form, Input, InputNumber, Row, Select, Checkbox} from "antd";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";


import PlanService from "../../api/services/plan";
import {success, error, ucFirst, confirmAlert} from "../../utils/helper";
import StatusWidget from "../../widgets/StatusWidget";
import {PeriodEnum} from "../../utils/enums";
import ActionSkeletonComponent from "../../components/ActionSkeletonComponent";
import DiscountAction from "./discountAction";
import ActionButtonComponent from "../../components/ActionButtonComponent";
import IdWidget from "../../widgets/IdWidget";
import PlusWidget from "../../widgets/PlusWidget";


const PlanAction = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [status, setStatus] = useState(false);
    const [isFree, setIsFree] = useState(false);
    const [action, setAction] = useState(params.action);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(params.id);
    const [form] = Form.useForm();


    const getPlan = async () => {
        try {
            setLoading(true);
            const response = await PlanService.get(id);
            form.setFieldsValue(response.data.data);
            setStatus(response.data.data.status);
            setIsFree(response.data.data.isFree);
        } catch (e) {
            error(e);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }

    const onFinish = async (values) => {

        try {
            setLoading(true);

            let response = null;
            if (action === 'add')
                response = await PlanService.create(values);
            if (action === 'edit')
                response = await PlanService.update(id, values);

            success(response?.data?.message);
            navigate(`/plans/view/${response?.data?.data?._id}t`);
            setAction('view');
        } catch (e) {
            error(e);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }

    const deletePlan = (id) => {
        confirmAlert(
            () => {
                return PlanService.delete(id)
                    .then(response => {
                        success(response.data.message);
                        navigate('/plans');
                    })
                    .catch(e => error(e));
            }
        )
    };

    const handleSubmit = () => {
        form.submit();
    }

    useEffect(() => {
        if (action === 'view') {
            setIsEdit(false);
        } else setIsEdit(true);
    }, [action]);


    useEffect(() => {
        if (id) {
            getPlan();
        } else {
            setLoading(false);
            form.setFieldsValue({
                status: true,
                isFree: false,
            });
            setStatus(true);
        }
    }, [id]);


    return (
        <div className="planAction">
            <Card extra={<IdWidget id={id}/>} title={`Plan - ${ucFirst(action)}`}>
                <Form form={form} onFinish={onFinish} layout="vertical" name="Plan">

                    {loading ? <ActionSkeletonComponent row={5}/> :
                        (<>
                            <Form.Item name="_id" hidden={true}>
                                <Input/>
                            </Form.Item>

                            <Row gutter={16}>

                                <Col className="gutter-row" span={12}>
                                    <Form.Item name="name" label="Name"
                                               rules={[{required: true, message: 'Required!'}]}>
                                        <Input disabled={!isEdit}/>
                                    </Form.Item>

                                </Col>

                                <Col className="gutter-row" span={7}>
                                    <Form.Item label="Validity">
                                        <Input.Group compact>
                                            <Form.Item name='unit' noStyle
                                                       rules={[{required: true, message: 'Required!'}]}>
                                                <Input disabled={!isEdit} style={{width: '40%'}}
                                                       placeholder="Unit"/>
                                            </Form.Item>
                                            <Form.Item name='period' noStyle
                                                       rules={[{required: true, message: 'Required!'}]}>
                                                <Select disabled={!isEdit} placeholder="Select Period" allowClear
                                                        style={{width: '50%'}}
                                                        options={
                                                            Object.values(PeriodEnum).map((item, index) => {
                                                                return {
                                                                    label: ucFirst(item),
                                                                    value: item
                                                                }
                                                            })
                                                        }>
                                                </Select>
                                            </Form.Item>
                                        </Input.Group>
                                    </Form.Item>
                                </Col>

                                <Col className="gutter-row" span={4}>
                                    <Form.Item name="isFree" label={"  "} valuePropName="checked">
                                        <Checkbox checked={isFree} onChange={(e) => {
                                            setIsFree(e.target.checked);
                                        }} disabled={!isEdit}>Is Free</Checkbox>
                                    </Form.Item>
                                </Col>

                                {
                                    !isFree && (
                                        <Col className="gutter-row" span={5}>
                                            <Form.Item name="amount" label="Price"
                                                       rules={[{required: true, message: 'Required!'}]}>
                                                <InputNumber disabled={!isEdit} controls={false} placeholder="Price"
                                                             style={{
                                                                 width: "100%",
                                                             }}/>
                                            </Form.Item>
                                        </Col>
                                    )

                                }


                                <Col className="gutter-row" span={12}>
                                    <Form.Item name="description" label="Description">
                                        <Input.TextArea disabled={!isEdit} autoSize={true}/>
                                    </Form.Item>
                                </Col>

                                <Col className="gutter-row" span={3}>
                                    <Form.Item name="status" label="Status" valuePropName="checked">
                                        <StatusWidget disabled={!isEdit} status={status}
                                                      onChange={(v) => setStatus(v)}/>
                                    </Form.Item>
                                </Col>

                            </Row>
                            {!isFree && (
                                <Card title="Usage Discount" style={{width: "50%"}}>
                                    <Row>
                                        <table style={{width: "100%"}} id="tableDisc">
                                            <thead>
                                            <tr>
                                                <th style={{width: "16%"}}>Usage</th>
                                                <th style={{width: "30%"}}>Type</th>
                                                <th colSpan={3}>Validity/Amount</th>
                                            </tr>
                                            </thead>
                                        </table>
                                    </Row>
                                    <Form.List name="discounts">
                                        {(fields, {add, remove}) => (
                                            <>
                                                {fields.map(({key, name, ...restField}) => (

                                                    <DiscountAction
                                                        resetForm={form}
                                                        keyDis={key}
                                                        name={name}
                                                        isEdit={isEdit}
                                                        remove={remove}
                                                        {...restField}
                                                        key={key}
                                                    />

                                                ))}
                                                <Row>
                                                    <Col span={24} style={{textAlign: 'right'}}>
                                                        <Form.Item>
                                                            <PlusWidget title={"Add Row"} onClick={() => add()}
                                                                        disabled={!isEdit}/>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>

                                            </>
                                        )}
                                    </Form.List>
                                </Card>
                            )
                            }
                            <ActionButtonComponent
                                action={action}
                                onSave={handleSubmit}
                                onAdd={() => {
                                    navigate('/plans/add');
                                    form.resetFields();
                                    setAction('add');
                                    setId('');

                                }}
                                onEdit={() => {
                                    navigate(`/plans/edit/${id}`);
                                    setAction('edit');
                                }}
                                onCancel={() => navigate('/plans')}
                                onDelete={() => deletePlan(id)}
                            />

                        </>)
                    }
                </Form>
            </Card>
        </div>
    );
}

export default PlanAction;