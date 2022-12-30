import {Button} from "antd";
import React from "react";


const ModalFooterWidget = ({loading, onCancelClick, onOkClick}) => {

        return (
            <>
                 <Button key="back" onClick={onCancelClick}>
                     Cancel
                 </Button>,
                 <Button key="sub"
                         type="primary"
                         loading={loading}
                         onClick={onOkClick}>
                     Submit
                 </Button>
            </>

        )
}

export default ModalFooterWidget;
