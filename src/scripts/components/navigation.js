import React, {Component} from 'react';

import { Layout, Menu } from 'antd';

const { Header } = Layout;
import {
    Link
} from 'react-router-dom';



export default class Navigation extends Component {
    render() {
        return (
            <Layout>
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        {/*<Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>*/}
                        <Menu.Item key="2"><Link to="/">工程管理</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/permission">权限管理</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/user">用户配置</Link></Menu.Item>
                    </Menu>
                </Header>
            </Layout>
        );
    }
}

