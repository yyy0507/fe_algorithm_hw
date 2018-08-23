import React, {Component} from 'react';
import {Layout, Table, Divider, Popconfirm,Button,Input} from 'antd';
const {Content} = Layout;
const Search = Input.Search;

import {connect} from "react-redux";
import {
    Link
} from 'react-router-dom';

import ModalProject from './modalProject'
import {handleShowModal} from "../../actions";


const dataProject = [{
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


class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectModalShow: false,
            dataProject: dataProject
        }
        this.columns = [{
            title: '项目名称',
            dataIndex: 'name',  //这里要和data数据中定义的属性一样才会显示相关的数据
            key: 'name',  //？？？
            render: text => <Link to={`/project/${text}`}>{text}</Link>,
        }, {
            title: '项目说明',
            dataIndex: 'desc',
            key: 'desc',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelProject(record.key)}>
                        <a href="javascript:;">删除</a>
                    </Popconfirm>
                    <Divider type="vertical"/>
                    <span>修改</span>
                </div>
            ),
        }];
    }

    handleDelProject = (i) => {
        let newProject = [];
        this.state.dataProject.forEach((item) => {
            if (item.key !== i) {
                newProject.push(item)
            }
        })
        this.setState({
            dataProject: newProject
        })
    }


    render() {
        const { handleShowModal } = this.props
        return (
            <div>
                <Layout>
                    <Content style={{padding: '0 50px'}}>
                        <div className='task-wrapper'>
                            <Button type="primary" onClick={handleShowModal}>添加工程</Button>
                            <Search
                                className='task-search'
                                placeholder="input search text"
                                enterButton="搜索"
                                onSearch={value => console.log(value)}
                                style={{ width: 300 }}
                            />
                        </div>
                        <Table columns={this.columns} dataSource={this.state.dataProject}/>
                    </Content>
                </Layout>
                <ModalProject show={this.state.projectModalShow} onChange={this.handleModal}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = {
    handleShowModal
};


Project = connect(mapStateToProps, mapDispatchToProps)(Project)

export default Project