import React, {Component} from 'react';

import {Button} from 'antd';

import {Layout, Table, Divider, Popconfirm,Input} from 'antd';

const {Content} = Layout;
const Search = Input.Search;

import {connect} from "react-redux";
import ModalTask from "./modalTask";
import {handleFetchTask} from '../../actions/fetchTask';
import {handleDelTask} from '../../actions/handleDelTask';
import {handleTaskDetail} from '../../actions';
import {handleShowModal} from '../../actions';
import {handleSearchTask} from '../../actions/searchTask';
import Pag from "./pagination";


class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // url: `http://100.81.136.44:8080/projects/${this.props.match.params.id}/missions`,
            url:`/data/${this.props.match.params.id}`,
            start: []
        };
        this.taskcolumns = [{
            title: '任务名称',
            dataIndex: 'missionName',  //这里要和data数据中定义的属性一样才会显示相关的数据
            render: (text, record) => (<a href="javascript:;" onClick={
                () => {
                    // this.props.handleModifyTask()
                    // console.log('www' ,record.pkMissionId);
                    const projectId = this.props.match.params.id;
                    this.props.handleTaskDetail(projectId,record.pkMissionId)
                    this.props.handleShowModal()
                }
            }>{text}</a>),
        }, {
            title: '任务说明',
            dataIndex: 'description',
            render: (text) => (
                <div className='task-desc'>{text}</div>
            )
        }, {
            title: '任务类型',
            dataIndex: 'missionType',
            render: (text) => (
                <div>
                    {text === 0 ? 'Flume监控' : '特征监控'}
                </div>
            )
        }, {
            title: 'watcher链接',
            dataIndex: 'watcherLink',
            render: text => <a href={text}>跳转</a>,
        }, {
            title: '状态',
            dataIndex: 'missionStatus',
            render: (text) => (
                <div>
                    {text === 0 ? '停止' : '成功'}
                </div>
            )
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <div>
                    <Popconfirm title="Sure to delete?" onConfirm={() => {
                            const projectId = this.props.match.params.id;
                            this.props.handleDelTask(projectId,record.pkMissionId,this.props.page);
                        }
                    }>
                        <a href="javascript:;">删除</a>
                    </Popconfirm>
                    <Divider type="vertical"/>
                    <a href="javascript:;"
                       onClick={() => this.handleStatus(record.pkMissionId)}>{this.state.start.indexOf(record.pkMissionId) === -1 ? '启动' : '停止'}</a>
                </div>
            ),
        }];
    }

    componentDidMount() {
        const projectId = this.props.match.params.id;
        this.props.handleFetchTask(projectId,1,10)
    }

    //修改状态
    handleStatus = (i) => {
        const newStart = this.state.start.slice();
        const valIndex = this.state.start.indexOf(i);
        if( valIndex === -1) {
            newStart.push(i)
        } else {
            newStart.splice(valIndex,1)
        }
        this.setState({
            start: newStart
        })
    }


    render() {
        const {handleShowModal,taskList,totalPage,handleSearchTask,searchItem,page} = this.props;
        console.log('this.props.match.params',this.props.match.params.id);
        const projectId = this.props.match.params.id;
        return (
            <Layout>
                <Content style={{padding: '0 50px'}}>
                    <div className='task-wrapper'>
                        <div className='task-name'>{this.props.match.params.projectname}</div>
                        <Button type="primary" onClick={handleShowModal}>增加任务</Button>
                        <Search
                            className='task-search'
                            placeholder="input search text"
                            enterButton="搜索"
                            onSearch={(value) => handleSearchTask(projectId,value,page,10)}
                            style={{ width: 300 }}
                        />
                    </div>
                    <Table
                        columns={this.taskcolumns}
                        dataSource={ searchItem || taskList }
                        pagination={false}
                    />
                    <Pag url={this.state.url} totalCount={totalPage}/>
                </Content>
                <ModalTask taskId={this.state.taskId} proid={projectId}/>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showModal: state.showModal,
        projectId: state.projectId,
        taskList: state.taskList,
        totalPage: state.totalPage,
        searchItem: state.searchItem,
        page: state.page
    }
}
const mapDispatchToProps = {
    handleFetchTask,
    handleShowModal,
    handleDelTask,
    handleTaskDetail,
    handleSearchTask
};


Task = connect(mapStateToProps, mapDispatchToProps)(Task)

export default Task
