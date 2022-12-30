import React, {useEffect, useState} from "react";
import {Card, Form, Input, InputNumber, Modal} from "antd";

import HarbourService from "../../api/services/harbour";
import {success, error} from "../../utils/helper";
import StatusWidget from "../../widgets/StatusWidget";
import EditWidget from "../../widgets/EditWidget";
import ModalFooterWidget from "../../widgets/ModalFooterWidget";


const HarbourAction = ({open, action, harbour, onClose}) => {

    const [isEdit, setIsEdit] = useState(true);
    const [status, setStatus] = useState(harbour?.status);
    const [formAction, setFormAction] = useState(action);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm()


    const handleOk = () => {
        form.submit();
    }


    const onFinish = async (values) => {

        try {
            setConfirmLoading(true);

            let response = null;
            if (formAction === 'add')
                response = await HarbourService.create(values);
            if (formAction === 'edit')
                response = await HarbourService.update(harbour._id, values);

            success(response?.data?.message);

            onClose(true);

        } catch (e) {
            error(e);
        } finally {
            setConfirmLoading(false);
        }
    }

    function renderEditButton() {
        if (formAction === 'add')
            return null;

        return !isEdit
            ? <EditWidget onClick={() => setFormAction('edit')}/>
            : null;
    }


    useEffect(() => {
        if (formAction === 'view') {
            setIsEdit(false);
        } else setIsEdit(true);
    }, [formAction]);


    return (
        <Modal title="Harbour" closable={false} centered={true} open={open}
               footer={[
                   <ModalFooterWidget key="footer" loading={confirmLoading} onCancelClick={() => onClose(false)}
                                      onOkClick={handleOk}/>
               ]}>

            <Card extra={renderEditButton()}>
                <Form form={form} onFinish={onFinish} layout="vertical" initialValues={harbour}>

                    <Form.Item name="_id" hidden={true}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="name" label="Name" rules={[{required: true, message: 'Required!'}]}>
                        <Input disabled={!isEdit} placeholder="Name"/>
                    </Form.Item>

                    <Form.Item name="lat" label="Latitude" rules={[{required: true, message: 'Required!'}]}>
                        <InputNumber disabled={!isEdit} controls={false} placeholder="Latitude" style={{
                            width: "100%",
                        }}/>
                    </Form.Item>

                    <Form.Item name="lng" label="Longitude" rules={[{required: true, message: 'Required!'}]}>
                        <InputNumber disabled={!isEdit} controls={false} placeholder="Longitude" style={{
                            width: "100%",
                        }}/>
                    </Form.Item>

                    <Form.Item name="status" label="Status" valuePropName="checked">
                        <StatusWidget disabled={!isEdit} status={status} onChange={(v) => setStatus(v)}/>
                    </Form.Item>

                </Form>
            </Card>
        </Modal>
    );
}

export default HarbourAction;