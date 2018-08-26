import React, {Component} from 'react';

import { Layout } from 'antd';
const { Content } = Layout;

export default class Permission extends Component {
    render() {
        return (
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <div className='task-wrapper'>权限管理</div>
                </Content>
            </Layout>
        );
    }
}

