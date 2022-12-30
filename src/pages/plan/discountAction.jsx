import React from "react";
import {Form, Input, InputNumber, Select, Row, Col} from "antd";
import {DiscountEnum, PeriodEnum, PriceEnum} from "../../utils/enums";
import DeleteWidget from "../../widgets/DeleteWidget";
import {ucFirst} from "../../utils/helper";


const DiscountAction = ({keyDis, name, isEdit, remove, resetForm}, restField) => {
    return (

        <Row key={keyDis}>
            <Col className="gutter-row" span={4}>
                <Form.Item
                    {...restField} name={[name, 'usage']} rules={[{required: true, message: ''}]}>
                    <InputNumber style={{width:"100%"}} disabled={!isEdit} controls={false} placeholder="Usage"/>
                </Form.Item>
            </Col>

            <Col className="gutter-row" span={7}>

                <Form.Item {...restField} name={[name, 'type']} rules={[{required: true, message: ''}]}>
                    <Select style={{width:"100%"}} disabled={!isEdit} placeholder="Select Type"
                            onChange={() => {
                                resetForm.setFieldValue(['discounts', name, 'discountType'], undefined);
                            }
                            }
                            allowClear
                            options={
                                Object.values(DiscountEnum).map((item, index) => {
                                    return {
                                        label:
                                            ucFirst(item),
                                        value: item
                                    }
                                })
                            }>
                    </Select>
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={4}>
                <Form.Item name={[name, 'discountValue']} rules={[{required: true, message: ''}]}>
                    <Input style={{width:"100%"}}  disabled={!isEdit} placeholder="Unit"/>
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={7}>

                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                        prevValues?.discounts?.[name]?.type !== currentValues?.discounts?.[name]?.type
                    }>

                    {({getFieldValue}) => {
                        const type = getFieldValue(['discounts', name, 'type']);
                        return (
                            <>
                                {type === DiscountEnum.PERIOD ? (
                                    <Form.Item {...restField} name={[name, 'discountType']}
                                               rules={[{required: true, message: ''}]}>
                                        <Select style={{width:"100%"}}  disabled={!isEdit} placeholder="Select Period" allowClear
                                                options={
                                                    Object.values(PeriodEnum).map((item, index) => {
                                                        return {
                                                            label:
                                                                ucFirst(item),
                                                            value: item
                                                        }
                                                    })
                                                }>
                                        </Select>
                                    </Form.Item>
                                ) : (
                                    <Form.Item {...restField} name={[name, 'discountType']}
                                               rules={[{required: true, message: ''}]}>
                                        <Select style={{width:"100%"}}  disabled={!isEdit} placeholder="Select Price" allowClear

                                                options={
                                                    Object.values(PriceEnum).map((item, index) => {
                                                        return {
                                                            label:
                                                                ucFirst(item),
                                                            value: item
                                                        }
                                                    })
                                                }>
                                        </Select>
                                    </Form.Item>
                                )}
                            </>
                        );
                    }}

                </Form.Item>

            </Col>
            <Col className="gutter-row" span={2}>
                <DeleteWidget style={{width:"100%"}}  onClick={() => remove(name)} loading={false}/>
            </Col>
        </Row>
    );
}

export default DiscountAction;