import React, {Component} from 'react';


import {Layout, Input, Form,Checkbox,Button,Select} from 'antd';
import {connect} from "react-redux";
import {jiankong} from "../../constant";
import {handleAddFlume} from "../../actions/fetchAddFlume";
import {handleModifyFlume} from "../../actions/modifyTask";
import {handleHideModal} from "../../actions";
import {handleFetchTask} from '../../actions/fetchTask';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

const options = {
    mapPropsToFields(props) {
        const {taskDetail} = props;

        // console.log('taskDetail', taskDetail.configuratio);
        const obj = JSON.parse(taskDetail.configuration || '{}');

        console.log('taskDetail', taskDetail);

        // console.log('taskDetailq',JSON.parse(`'${taskDetail.configuration}'`));
        return {
            missionName: Form.createFormField({
                value: taskDetail.missionName
            }),
            description: Form.createFormField({
                value: taskDetail.description
            }),
            watcherLink: Form.createFormField({
                value: taskDetail.watcherLink
            }),
            url: Form.createFormField({
                value: obj.url
            }),
            monitorItems: Form.createFormField({
                value: obj.monitorItems
            }),
            alarmItems: Form.createFormField({
                value: obj.alarmItems
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
        console.log('checkedValues', checkedValues);
        if (checkedValues[0]) {
            this.setState({
                showBaojing: true,
                baojing: checkedValues
            })
        } else {
            this.setState({
                showBaojing: true,
                baojing: checkedValues.slice(1)
            })
        }


    };

    handleCreateFlume = (e) => {
        e.preventDefault();
        const {handleAddFlume,handleFetchTask,handleHideModal,taskId, handleModifyFlume, projectId, page,projectkey,missiontype} = this.props;
        console.log('missiontype',missiontype);
        const form = this.props.form;
        const pageSize = 10;
        console.log('taskId',taskId);
        form.validateFields((err, values) => {
            if (!err) {
                if(!taskId) {
                    handleAddFlume(projectkey,page,pageSize,{
                        ...values
                    });
                } else if (missiontype === 0){
                    handleModifyFlume(projectkey,taskId,{
                        ...values
                    },page);
                }
            } else {
                return ;
            }
            handleHideModal();
            handleFetchTask(projectkey,page,10);
            form.resetFields();
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="vertical" onSubmit={this.handleCreateFlume}>
                <FormItem label="任务名称" className='task-item g-flex'>
                    {getFieldDecorator('missionName', {
                        rules: [{
                            required: true, message: '请输入任务名称',
                        }],
                    })(<Input type="text" placeholder="任务名称"/>)}
                </FormItem>
                <FormItem label="任务说明" className='task-item g-flex'>
                    {getFieldDecorator('description', {
                        rules: [{
                            required: true, message: '请输入任务说明',
                        }],
                    })(<Input type="text" placeholder="任务说明"/>)}
                </FormItem>
                <FormItem label="watcher链接" className='task-item g-flex'>
                    {getFieldDecorator('watcherLink', {
                        rules: [{
                            type: 'url', message: '请输入合法的url地址!',
                        }, {
                            required: true, message: '请输入watcher链接',
                        }],
                    })(<Input type="text" placeholder="watcher链接"/>)}
                </FormItem>
                <FormItem label="flume监控URL" className='task-item g-flex'>
                    {getFieldDecorator('url', {
                        rules: [{
                            type: 'url', message: '请输入合法的url地址!',
                        }, {
                            required: true, message: 'flume监控URL',
                        }],
                    })(<Input type="text" placeholder="请输入flume监控URL"/>)}
                </FormItem>
                <FormItem label="要监控的字段">
                    {getFieldDecorator('monitorItems', {
                        rules: [{
                            required: true, message: '请选择要监控的字段',
                        }],
                    })(
                        <CheckboxGroup options={jiankong}  onChange={this.handlejiankong}/>
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
                    <Button type="primary" htmlType="submit" className='btn'>确定</Button>
                </FormItem>
            </Form>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        taskId: state.taskId,
        page: state.page,
        taskDetail: state.taskDetail,
        missiontype: state.missiontype
    }
}
const mapDispatchToProps = {
    handleHideModal,
    handleModifyFlume,
    handleAddFlume,
    handleFetchTask
};

const flumeForm = Form.create(options)(Flume);

export default connect(mapStateToProps, mapDispatchToProps)(flumeForm)

