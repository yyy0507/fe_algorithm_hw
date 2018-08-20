import React, {Component} from 'react';

import {Button} from 'antd';

import {Layout, Table, Divider, Popconfirm} from 'antd';

const {Content} = Layout;

import {connect} from "react-redux";
import {handleAddTask, handleDelTask} from "../../actions";
import {dataTask} from "../../constant";


class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskIndex: 0,
            dataTask
        };
        this.taskcolumns = [{
            title: '任务名称',
            dataIndex: 'name',  //这里要和data数据中定义的属性一样才会显示相关的数据
            key: 'name',  //？？？
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '任务说明',
            dataIndex: 'desc',
            key: 'desc',
        }, {
            title: '任务类型',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: 'watcher链接',
            dataIndex: 'link',
            key: 'link',
            render: text => <a href={text}>跳转</a>,
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => (
                <div>
                    {text === 0 ? '停止' : '成功'}
                </div>
            )

        }, {
            title: '操作',
            dataIndex: 'status',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelTask(record.key)}>
                        <a href="javascript:;">删除</a>
                    </Popconfirm>
                    <Divider type="vertical"/>
                    <span onClick={() => this.handleStatus(text)}>{text === 0 ? '成功' : '停止'}</span>
                </div>
            ),
        }];
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
    //修改状态
    handleStatus = (i) => {
        console.log(i);

    }


    render() {
        const {handleAddTask} = this.props;
        // const {taskIndex, dataTask} = this.state;
        // console.log('taskIndex', taskIndex)
        // console.log('dataTask', dataTask)
        return (
            <Layout>
                <Content style={{padding: '0 50px'}}>
                    <div className='taskWrapper'>
                        <div className='taskName'>f_algo_captcha</div>
                        <Button type="primary" onClick={() => handleAddTask()}>增加任务</Button>
                    </div>
                    <Table columns={this.taskcolumns} dataSource={this.state.dataTask}/>
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataTask: state.dataTask,
        taskKey: state.taskKey
    }
}
const mapDispatchToProps = {
    handleAddTask,
    handleDelTask
};


Task = connect(mapStateToProps, mapDispatchToProps)(Task)

export default Task
