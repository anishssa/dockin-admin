import React from "react";
import {Layout} from "antd";

const {Footer} = Layout;

const FooterMenu = () => {
    return (
        <Footer
            style={{
                textAlign: 'left',
            }}
        >
           CopyRight 2023 - All Rights Reserved - Powered by <a href="https://stagingurl.tk/dockin/dockin-wp/" target="_blank">Dockin</a>
        </Footer>
    );
}

export default FooterMenu;