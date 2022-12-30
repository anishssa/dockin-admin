import {Modal, message, notification} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import React from "react";

const {confirm} = Modal;


function confirmAlert(
    callback,
    title = 'Are you sure?',
    message = 'Do you want to delete?',
) {

    confirm({
        title: title,
        icon: <ExclamationCircleOutlined/>,
        content: message,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
            await callback();
        },
        onCancel() {

        }
    });
}

function success(msg) {
    message.success(msg);
}

function error(msg) {

    if (typeof msg === 'object') {
        if (msg.response?.status === 400) {
            if (msg.response.data) {
                if (msg.response.data.error) {
                    if (Array.isArray(msg.response.data.error)) {
                        msg.response.data.error.forEach((e) => {
                            message.error(e);
                        });
                    } else if (typeof msg.response.data.error === 'object') {
                        Object.keys(msg.response.data.error).forEach((key) => {
                            message.error(msg.response.data.error[key]);
                        });
                    } else {
                        message.error(msg.response.data.error);
                    }
                } else {
                    message.error(msg.response.data.message);
                }
            } else {
                message.error('Something went wrong');
            }
        }
    } else {
        message.error(msg);
    }
}

function warning(msg) {
    message.warning(msg);
}

function notify(type, msg) {
    switch (type) {
        case 'success':
            success(msg);
            break;
        case 'error':
            notification['error']({
                message: 'Error',
                description: msg,
            });
            break;
        case 'warning':
            warning(msg);
            break;
        default:
            success(msg);
            break;
    }
}

function ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatPrice(price, currency = 'INR') {
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency: currency,
    });
}

export {
    confirmAlert,
    success,
    error,
    warning,
    notify,
    ucFirst,
    formatPrice
}

