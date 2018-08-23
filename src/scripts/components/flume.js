import React, {Component} from 'react';


import {Layout, Input, Form,Checkbox,Button,Select} from 'antd';
import {connect} from "react-redux";
import {ziduan} from "../../constant";
import {handleAddFlume} from "../../actions/fetchAddFlume";
import {handleModifyTask} from "../../actions/modifyTask";
import {handleHideModal} from "../../actions";
import {handleFetchTask} from '../../actions/fetchTask'
import TaskCommon from './taskcommon'

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

const {Content} = Layout;

const options = {
    mapPropsToFields(props) {
        return {
            url: Form.createFormField({
                value: props.url
            }),
            monitorItems: Form.createFormField({
                value: props.monitorItems
            }),
            alarmItems: Form.createFormField({
                value: props.alarmItems
            })
        }
    }
}

class Flume extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showBaojing: false,
            baojing: []
        }
    }

    handlejiankong = (checkedValues) => {
        this.setState({
            showBaojing: true,
            baojing: checkedValues
        })
    }

    //任务名称
    handlename = (e) => {
        this.setState(
            {missionName: e.target.value},
        );

    }
    //任务说明
    handledesc = (e) => {
        this.setState({description: e.target.value});
    }
    //watcher链接
    handlewatcher = (e) => {
        this.setState({watcherLink: e.target.value});
    }

    handleCreateFlume = (e) => {
        e.preventDefault();
        const {handleAddFlume,handleFetchTask,handleHideModal,taskId, handleModifyTask, projectId, page} = this.props
        const form = this.props.form;
        const pageSize = 10;
        console.log('taskId',taskId);
        form.validateFields((err, values) => {
            if (!err) {
                if(!taskId) {
                    handleAddFlume(124,page,pageSize,{
                        ...values,
                        missionName: this.state.missionName,
                        description: this.state.description,
                        watcherLink: this.state.watcherLink
                    });
                } else {
                    console.log(2222);
                    handleModifyTask(124,taskId,{
                        ...values,
                        missionName: this.state.missionName,
                        description: this.state.description,
                        watcherLink: this.state.watcherLink
                    });
                }
            }
            handleHideModal()
            handleFetchTask(124,page,10)
            form.resetFields();
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="vertical" onSubmit={this.handleCreateFlume}>
                <TaskCommon handlename={this.handlename} handledesc={this.handledesc} handlewatcher={this.handlewatcher}/>
                <FormItem label="flume监控URL" className='task-item'>
                    {getFieldDecorator('url', {
                        rules: [{
                            required: true, message: '请输入flume监控URL!',
                        }],
                    })(<Input type="text" placeholder="flume监控URL"/>)}
                </FormItem>
                <FormItem label="要监控的字段">
                    {getFieldDecorator('monitorItems', {
                        rules: [{
                            required: true, message: '请选择要监控的字段',
                        }],
                    })(
                        <CheckboxGroup options={ziduan}  onChange={this.handlejiankong}/>
                    )}
                </FormItem>
                {
                    this.state.showBaojing ?
                        <FormItem label="要报警的字段">
                            {getFieldDecorator('alarmItems')(
                                <CheckboxGroup options={this.state.baojing}/>
                            )}
                        </FormItem> : null
                }
                <FormItem>
                    <Button type="primary" htmlType="submit">确定</Button>
                </FormItem>
            </Form>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        taskId: state.taskId,
        page: state.page
    }
}
const mapDispatchToProps = {
    handleHideModal,
    handleModifyTask,
    handleAddFlume,
    handleFetchTask
};


Flume = connect(mapStateToProps, mapDispatchToProps)(Flume)

export default Flume = Form.create(options)(Flume);

