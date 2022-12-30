import React, {useEffect, useState} from "react";
import {Card, Form, Input, Modal} from "antd";

import LanguageService from "../../api/services/language";
import {success, error} from "../../utils/helper";
import StatusWidget from "../../widgets/StatusWidget";
import EditWidget from "../../widgets/EditWidget";
import ModalFooterWidget from "../../widgets/ModalFooterWidget";


const LanguageAction = ({open, action, language, onClose}) => {

    const [isEdit, setIsEdit] = useState(true);
    const [status, setStatus] = useState(language?.status);
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
                response = await LanguageService.create(values);
            if (formAction === 'edit')
                response = await LanguageService.update(language._id, values);

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
        <Modal title="Language" closable={false} centered={true} open={open} confirmLoading={confirmLoading}
               footer={[
                   <ModalFooterWidget key="footer" loading={confirmLoading} onCancelClick={() => onClose(false)}
                                      onOkClick={handleOk}/>
               ]}>

            <Card extra={renderEditButton()}>
                <Form form={form} onFinish={onFinish} layout="vertical" initialValues={language}>

                    <Form.Item name="_id" hidden={true}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="name" label="Name" rules={[{required: true, message: 'Required!'}]}>
                        <Input disabled={!isEdit}
                               placeholder="Name"
                        />
                    </Form.Item>

                    <Form.Item name="status" label="Status" valuePropName="checked">
                        <StatusWidget disabled={!isEdit} status={status} onChange={(v) => setStatus(v)}/>
                    </Form.Item>

                </Form>
            </Card>
        </Modal>
    );
}

export default LanguageAction;