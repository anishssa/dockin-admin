import React from "react";

import {FloatButton, theme,} from "antd";
import {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined, PlusOutlined,
    SaveOutlined
} from "@ant-design/icons";


const ActionButtonComponent = ({action = 'add', onAdd, onSave, onEdit, onCancel, onDelete}
) => {
    const {token: {iconColor}} = theme.useToken();

    return (
        <FloatButton.Group
            shape="circle"
            style={{
                right: 94,
            }}>
            {action === 'view' && (
                <>
                    <FloatButton
                        tooltip={'Add'}
                        icon={<PlusOutlined style={{color: iconColor}}/>}
                        onClick={onAdd}
                    />
                    <FloatButton
                        tooltip={'Edit'}
                        icon={<EditOutlined style={{color: iconColor}}/>}
                        onClick={onEdit}
                    />
                    <FloatButton
                        tooltip={'Delete'}
                        icon={<DeleteOutlined style={{color: 'red'}}/>}
                        onClick={onDelete}
                    />
                </>
            )}

            {action === 'add' && (
                <FloatButton
                    tooltip={'Save'}
                    icon={<SaveOutlined style={{fontSize: '15px', color: iconColor}}/>}
                    onClick={onSave}
                />
            )}
            {action === 'edit' && (
                <>
                    <FloatButton
                        tooltip={'Add'}
                        icon={<PlusOutlined style={{color: iconColor}}/>}
                        onClick={onAdd}
                    />
                    <FloatButton
                        tooltip={'Update'}
                        icon={<SaveOutlined style={{fontSize: '15px', color: iconColor}}/>}
                        onClick={onSave}
                    />
                    <FloatButton
                        tooltip={'Delete'}
                        icon={<DeleteOutlined style={{fontSize: '15px', color: 'red'}}/>}
                        onClick={onDelete}
                    />
                </>
            )}
            <FloatButton
                tooltip={'Cancel'}
                icon={<CloseOutlined style={{fontSize: '15px', color: iconColor}}/>}
                onClick={onCancel}
            />
        </FloatButton.Group>
    );
}

export default ActionButtonComponent;