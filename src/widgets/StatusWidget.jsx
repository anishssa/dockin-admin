import {Switch, theme} from "antd";



const StatusWidget = ({status, loading= false, disabled = false, onChange}) => {

    const {token: {iconColor}} = theme.useToken();
        return (
            <Switch loading={loading} checked={status} checkedChildren="Active" unCheckedChildren="Inactive"
                    disabled={disabled}
                    style={{background: status ? iconColor : 'red'}}
                    onChange={onChange}/>
        )
}

export default StatusWidget;
