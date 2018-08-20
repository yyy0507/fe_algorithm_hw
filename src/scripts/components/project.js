import React, {Component} from 'react';

import {Button} from 'antd';

import {Layout, Table, Divider} from 'antd';


const {Content} = Layout;


const columns = [{
    title: '项目名称',
    dataIndex: 'name',  //这里要和data数据中定义的属性一样才会显示相关的数据
    key: 'name',  //？？？
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: '项目说明',
    dataIndex: 'desc',
    key: 'desc',
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <div>
            <span>删除</span>
            <Divider type="vertical"/>
            <span>停止</span>
        </div>
    ),
}];

const data = [{
    key: '1',
    name: 'f_algo_captcha',
    desc: '验证码破解'
}, {
    key: '2',
    name: 'test2',
    desc: '机票价格数据导入HDFS'

}, {
    key: '3',
    name: 'test3',
    desc: '机票价格数据导入HDFS'
}];


export default class Project extends Component {
    render() {
        return (
            <Layout>
                <Content style={{padding: '0 50px'}}>
                    <div className='taskWrapper'>
                        <Button type="primary">添加工程</Button>
                    </div>
                    <Table columns={columns} dataSource={data}/>
                </Content>
            </Layout>
        );
    }
}

