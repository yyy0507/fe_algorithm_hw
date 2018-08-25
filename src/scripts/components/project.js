import React, {Component} from 'react';
import {Layout, Table, Divider, Popconfirm,Button,Input, AutoComplete} from 'antd';
const {Content} = Layout;
const Search = Input.Search;

import {connect} from "react-redux";
import {
    Link
} from 'react-router-dom';

import ModalProject from './modalProject'
import {handleShowModal} from "../../actions";
import {handleFetchProject} from '../../actions/fetchProject';
import {handleDelProject} from '../../actions/handleDelProject';
import {handleSearchProject} from '../../actions/searchProject';
// import {handleModifyProject} from '../../actions/modifyProject';

import Pag from "./pagination";


const dataProject = [{
    key: 124,
    pkProjectId: 124,
    name: 'f_algo_captcha',
    desc: '验证码破解'
}, {
    key: 1,
    pkProjectId: 1,
    name: 'test2',
    desc: '机票价格数据导入HDFS'

}, {
    key: 12,
    pkProjectId: 12,
    name: 'test3',
    desc: '机票价格数据导入HDFS'
}];


class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectModalShow: false,
            dataProject:dataProject,
            url: 'cc', //工程的链接
        }
        this.columns = [{
            title: '项目名称',
            dataIndex: 'projectName',  //这里要和data数据中定义的属性一样才会显示相关的数据
            render: (text,record) => <Link to={`/project/${text}/${record.pkProjectId}`}>{text}</Link>,
        }, {
            title: '项目说明',
            dataIndex: 'description',
        }, {
            title: 'watcher链接',
            dataIndex: 'watcherLink',
            render: (text) => <a href={text}>跳转</a>
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.props.handleDelProject(record.pkProjectId,this.props.page)}>
                        <a href="javascript:;">删除</a>
                    </Popconfirm>
                    {/*<Divider type="vertical"/>*/}
                    {/*<a href="javascript:;">修改</a>*/}
                </div>
            ),
        }];
    }

    componentDidMount() {
        this.props.handleFetchProject(1,10);
    }

    render() {
        const { handleShowModal, projectList,totalProject,handleSearchProject,searchProject,page} = this.props;
        console.log('projectList',projectList);
        return (
            <div>
                <Layout>
                    <Content style={{padding: '0 50px'}}>
                        <div className='task-wrapper'>
                            <Button type="primary" onClick={handleShowModal}>添加工程</Button>
                            <AutoComplete
                                className='task-search'
                                placeholder="input search text"
                                enterButton="搜索"
                                onChange={(value) => handleSearchProject(value,page,10)}
                                style={{ width: 300 }}
                            />
                        </div>
                        <Table
                            columns={this.columns}
                            dataSource={searchProject || projectList}
                            pagination={false}
                        />
                        <Pag url={this.state.url} totalCount={totalProject}/>
                    </Content>
                </Layout>
                <ModalProject/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projectList: state.projectList,
        totalProject: state.totalProject,
        searchProject: state.searchProject,
        page: state.page
    }
}
const mapDispatchToProps = {
    handleShowModal,
    handleFetchProject,
    handleDelProject,
    handleSearchProject
};


Project = connect(mapStateToProps, mapDispatchToProps)(Project)

export default Project