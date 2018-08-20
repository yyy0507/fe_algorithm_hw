import React, {Component} from 'react';


import { Layout } from 'antd';

const { Content } = Layout;


export default class User extends Component {
    render() {
        return (
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <div className='taskWrapper'>user</div>
                </Content>
            </Layout>
        );
    }
}

