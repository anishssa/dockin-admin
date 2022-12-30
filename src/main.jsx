import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'

import {ConfigProvider} from 'antd';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    primary: '#2666ba',
                    secondary: '#fb1b17',
                    tertiary: '#fdc701',
                    iconColor: '#2666ba',
                    backgroundColor: '#ffffff',
                },
                hashed: false
            }}>
            <App/>
        </ConfigProvider>
    </React.StrictMode>,
)
