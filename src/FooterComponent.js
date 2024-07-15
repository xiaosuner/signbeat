import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

const { Footer } = Layout;

export const FooterComponent = () => (
    <Footer style={{ position: 'fixed', bottom: 0, width: '100%', padding: 0 }}>
        <Menu mode="horizontal" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Menu.Item key="home" style={{ textAlign: 'center' }}>
                <HomeOutlined style={{ fontSize: '24px' }} />
                <div style={{ fontSize: '16px' }}>Home</div>
            </Menu.Item>
            <Menu.Item key="profile" style={{ textAlign: 'center' }}>
                <UserOutlined style={{ fontSize: '24px' }} />
                <div style={{ fontSize: '16px' }}>Profile</div>
            </Menu.Item>
            <Menu.Item key="settings" style={{ textAlign: 'center' }}>
                <SettingOutlined style={{ fontSize: '24px' }} />
                <div style={{ fontSize: '16px' }}>Settings</div>
            </Menu.Item>
        </Menu>
    </Footer>
);
