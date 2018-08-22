import React, {Component} from 'react';

import {Button} from 'antd';

import {Layout, Table, Divider, Popconfirm} from 'antd';

const {Content} = Layout;

import {connect} from "react-redux";
import {dataTask} from "../../constant";
import ModalTask from "./modalTask";
import {handleFetchTask} from '../../actions/fetchTask'
import {handleShowModal} from '../../actions'
import Pag from "./pagination";


class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskIndex: 0,
            dataTask,
            taskModalShow: false,
            url: 'xxx',
            start: false
        };
        this.taskcolumns = [{
            title: '任务名称',
            dataIndex: 'missionName',  //这里要和data数据中定义的属性一样才会显示相关的数据
            key: 'missionName',  // ？？？
            render: (text, record) => (<a href="javascript:;" onClick={this.props.handleShowModal}>{text}</a>),
        }, {
            title: '任务说明',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: '任务类型',
            dataIndex: 'missionType',
            key: 'missionType',
            render: (text) => (
                <div>
                    {text === 0 ? 'Flume监控' : '特征监控'}
                </div>
            )
        }, {
            title: 'watcher链接',
            dataIndex: 'watcherLink',
            key: 'watcherLink',
            render: text => <a href={text}>跳转</a>,
        }, {
            title: '状态',
            dataIndex: 'missionStatus',
            key: 'missionStatus',
            render: (text) => (
                <div>
                    {text === 0 ? '停止' : '成功'}
                </div>
            )

        }, {
            title: '操作',
            dataIndex: 'missionStatus',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Popconfirm title="Sure to delete?" onConfirm={() => {
                        this.handleDelTask(record.key)
                    }
                    }>
                        <a href="javascript:;">删除</a>
                    </Popconfirm>
                    <Divider type="vertical"/>
                    <a href="javascript:;"
                       onClick={() => this.handleStatus(record.key)}>{this.state.start ? '停止' : '启动'}</a>
                </div>
            ),
        }];
    }

    componentDidMount() {
        // handleFetchTask( 'http://www.baidu.com' , 1, 10)
    }


    //修改状态
    handleStatus = (i) => {
        console.log('taskL101', i);
        this.setState({
            start: !this.state.start
        })
    }

    //增加任务出现弹窗，点击任务列表也可以出现弹窗
    handleAddTask = () => {
        this.setState({
            taskModalShow: true
        })
    }


    //点击弹窗上的确定和取消按钮，隐藏弹窗
    handleModal = (i) => {
        this.setState({
            taskModalShow: i
        })
    }

    //删除一项任务
    handleDelTask = (i) => {
        let newTask = [];
        this.state.dataTask.forEach((item) => {
            if (item.key !== i) {
                newTask.push(item)
            }
        })
        this.setState({
            dataTask: newTask,
            taskIndex: i
        })
    }


    render() {
        const {test, dataTask, addShow} = this.props;
        console.log('addShow', addShow)
        console.log('taskL111', test)
        console.log('task114', dataTask)
        console.log('*****1', this.props.handleFetchTask);
        return (
            <Layout>
                <Content style={{padding: '0 50px'}}>
                    <div className='taskWrapper'>
                        <div className='taskName'>{this.props.match.params.projectname}</div>
                        <Button type="primary" onClick={this.props.handleShowModal}>增加任务</Button>
                    </div>
                    <Table
                        columns={this.taskcolumns}
                        dataSource={dataTask}
                        pagination={false}
                    />
                    <Pag url={this.state.url}/>
                </Content>
                <ModalTask/>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataTask: state.dataTask,
        test: state.test,
        showModal: state.showModal
    }
}
const mapDispatchToProps = {
    handleFetchTask,
    handleShowModal
};


Task = connect(mapStateToProps, mapDispatchToProps)(Task)

export default Task
