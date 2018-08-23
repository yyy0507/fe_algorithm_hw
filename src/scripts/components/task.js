import React, {Component} from 'react';

import {Button} from 'antd';

import {Layout, Table, Divider, Popconfirm,Input} from 'antd';

const {Content} = Layout;
const Search = Input.Search;

import {connect} from "react-redux";
import ModalTask from "./modalTask";
import {handleFetchTask} from '../../actions/fetchTask'
import {handleDelTask} from '../../actions/handleDelTask'
import {handleTaskDetail} from '../../actions'
import {handleShowModal} from '../../actions'
import Pag from "./pagination";


class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://100.81.136.44:8080/projects/124/missions',
            start: []
        };
        this.taskcolumns = [{
            title: '任务名称',
            dataIndex: 'missionName',  //这里要和data数据中定义的属性一样才会显示相关的数据
            render: (text, record) => (<a href="javascript:;" onClick={
                () => {
                    // this.props.handleModifyTask()
                    console.log('www' ,record.pkMissionId)
                    this.props.handleTaskDetail(124,record.pkMissionId)
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
                    <Popconfirm title="Sure to delete?" onConfirm={async () => {

                            const res = await this.props.handleDelTask(124,record.pkMissionId);
                            console.log('deleete', res);

                                this.props.handleFetchTask(124,1,10)

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
        this.props.handleFetchTask(124,1,10)
    }


    handleModify = (i) => {
        this.setState({
            taskId: i
        })
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
        const {handleShowModal,taskList,totalPage} = this.props;
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
                            onSearch={value => console.log(value)}
                            style={{ width: 300 }}
                        />
                    </div>
                    <Table
                        columns={this.taskcolumns}
                        dataSource={taskList}
                        pagination={false}
                    />
                    <Pag url={this.state.url} totalCount={totalPage}/>
                </Content>
                <ModalTask taskId={this.state.taskId}/>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showModal: state.showModal,
        projectId: state.projectId,
        taskList: state.taskList,
        totalPage: state.totalPage
    }
}
const mapDispatchToProps = {
    handleFetchTask,
    handleShowModal,
    handleDelTask,
    handleTaskDetail
};


Task = connect(mapStateToProps, mapDispatchToProps)(Task)

export default Task
