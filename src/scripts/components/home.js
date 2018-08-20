import React, {Component} from 'react';


import { Layout } from 'antd';

const { Content } = Layout;

import Navigation  from './navigation';


export default class Home extends Component {
    render() {
        return (
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <div className='taskWrapper'>home</div>
                </Content>
            </Layout>
        );
    }
}

