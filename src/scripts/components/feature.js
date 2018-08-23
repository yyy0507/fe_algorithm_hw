import React, {Component} from 'react';


import {Layout, Input, Form,Checkbox,Button,Select} from 'antd';

const {Content} = Layout;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
import {connect} from "react-redux";

import TaskCommon from './taskcommon'
import FeatureTable from './featureTable'
import {handleFetchTask} from "../../actions/fetchTask";
import {handleModifyTask} from "../../actions/modifyTask";
import {handleHideModal} from "../../actions";

class Feature extends Component {

    constructor(props) {
        super(props)
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


    handleCreateFeature = (e) => {
        e.preventDefault();
        const {handleFetchTask,handleHideModal,taskId, handleModifyTask, projectId, page} = this.props
        const form = this.props.form;
        const pageSize = 10;
        form.validateFields((err, values) => {
            if (!err) {
                if(!taskId) {
                    handleFetchTask(111,page,pageSize,{
                        ...values,
                        missionName: this.state.missionName,
                        description: this.state.description,
                        watcherLink: this.state.watcherLink
                    });
                } else {
                    handleModifyTask(111,taskId,{
                        ...values,
                        missionName: this.state.missionName,
                        description: this.state.description,
                        watcherLink: this.state.watcherLink
                    });
                }
            }
            // console.log('Received values of form: ', values);
            handleHideModal()
            form.resetFields();
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="vertical" onSubmit={this.handleCreateFeature} className='clrfix'>
                <TaskCommon handlename={this.handlename} handledesc={this.handledesc} handlewatcher={this.handlewatcher}/>
                <FormItem label="库类型" className='task-item feature-left'>
                    {getFieldDecorator('dbType',{
                        initialValue: 'lucy'
                    })(
                        <Select style={{width: 100}}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="库/namespace" className='task-item feature-left'>
                    {getFieldDecorator('dbName')(<Input type="text" placeholder="namespace"/>)}
                </FormItem>
                <FormItem label="表" className='task-item feature-left'>
                    {getFieldDecorator('tableName')(<Input type="text" placeholder="表"/>)}
                </FormItem>
                <FormItem label="其他配置" className='task-item feature-left'>
                    {getFieldDecorator('dbOtherConfig')(<Input type="text" placeholder="其他配置项"/>)}
                </FormItem>
                <FormItem label="触发方式" className='task-item feature-left'>
                    {getFieldDecorator('triggerMode',
                        {
                            initialValue: 'lucy'
                        }
                    )(
                        <Select style={{ width: 120 }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>Disabled</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="触发规则" className='task-item feature-left'>
                    {getFieldDecorator('triggerRule')(<Input type="text" placeholder="触发规则"/>)}
                </FormItem>
                <FormItem label="数据范围" className='task-item feature-left'>
                    {getFieldDecorator('triggerRule')(<Input type="text" placeholder="数据范围"/>)}
                </FormItem>
                <FeatureTable/>
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
    handleFetchTask
};


Feature = connect(mapStateToProps, mapDispatchToProps)(Feature)

export default Feature = Form.create()(Feature);;
