import React, {Component} from 'react';


import {Modal, Layout, Tabs, Form, Input, Select, Checkbox,Button, Table, InputNumber, Popconfirm } from 'antd';

const {Content} = Layout;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;



import { connect } from "react-redux";

import { handleFlumeSubmit } from "../../actions/fetchFlume";

import {handleHideModal} from '../../actions'

import {ziduan} from "../../constant";

import TaskCommon from './taskcommon'
import FeatureTable from './featureTable'

const options = {
    mapPropsToFields(props) {
        return {
            missionName: Form.createFormField({
                value: props.missionName
            }),
            watcherLink: Form.createFormField({
                value: props.watcherLink
            }),
            url: Form.createFormField({
                value: props.url
            })
        }
    }
}


class ModalTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showBaojing: false,
            baojing: []
        }
    }

    handleCreateFlume = (e) => {
        e.preventDefault();
        const {handleFlumeSubmit} = this.props
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            handleFlumeSubmit({
                ...values,
                missionName: this.state.missionName,
                description: this.state.description,
                watcherLink: this.state.watcherLink
            });
            this.handleModalCancel()
            form.resetFields();
        });
    }

    handleCreateFeature = (e) => {
        e.preventDefault();
        const {handleFlumeSubmit} = this.props
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            this.handleModalCancel()
            // handleFeatureSubmit(values);
            form.resetFields();
        });
    }

    getFlumeContent = () => {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="vertical" onSubmit={this.handleCreateFlume}>

                <TaskCommon handlename={this.handlename} handledesc={this.handledesc} handlewatcher={this.handlewatcher}/>

                <FormItem label="任务类型" style={{display: 'none'}}>
                    {getFieldDecorator('missionType')(<Input type="text" placeholder="类型" />)}
                </FormItem>
                <FormItem label="flume监控URL" className='taskItem'>
                    {getFieldDecorator('url',{
                        rules: [{
                            required: true, message: '请输入flume监控URL!',
                        }],
                    })(<Input type="text" placeholder="flume监控URL"/>)}
                </FormItem>
                <FormItem label="要监控的字段">
                    {getFieldDecorator('monitorItems',{
                        rules: [{
                            required: true, message: '请选择要监控的字段',
                        }],
                    })(
                        <CheckboxGroup options={ziduan} onChange={this.handlejiankong}/>
                    )}
                </FormItem>
                {
                    this.state.showBaojing ?
                        <FormItem label="要报警的字段">
                            {getFieldDecorator('alarmItems')(
                                <CheckboxGroup options={this.state.baojing} />
                            )}
                        </FormItem> : null
                }
                <FormItem >
                    <Button type="primary" htmlType="submit" >确定</Button>
                </FormItem>
            </Form>
        )

    }

    getFeatureContent = () => {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="vertical" onSubmit={this.handleCreateFeature} className='clrfix'>

                <FormItem label="库类型" className='taskItem featureLeft'>
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
                <FormItem label="库/namespace" className='taskItem featureLeft'>
                    {getFieldDecorator('dbName')(<Input type="text" placeholder="namespace"/>)}
                </FormItem>
                <FormItem label="表" className='taskItem featureLeft'>
                    {getFieldDecorator('tableName')(<Input type="text" placeholder="表"/>)}
                </FormItem>
                <FormItem label="其他配置" className='taskItem featureLeft'>
                    {getFieldDecorator('dbOtherConfig')(<Input type="text" placeholder="其他配置项"/>)}
                </FormItem>
                <FormItem label="触发方式" className='taskItem featureLeft'>
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
                <FormItem label="触发规则" className='taskItem featureLeft'>
                    {getFieldDecorator('triggerRule')(<Input type="text" placeholder="触发规则"/>)}
                </FormItem>
                <FeatureTable/>
                <FormItem>
                    <Button type="primary" htmlType="submit">确定</Button>
                </FormItem>
            </Form>
        )
    }

    handlejiankong = (checkedValues) => {
        this.setState({
            showBaojing: true,
            baojing: checkedValues
        })
    }

    handleModalCancel = () => {
        this.props.onChange(false)
    }
    //任务名称
    handlename = ( e) => {
        this.setState({missionName: e.target.value});
    }
    //任务说明
    handledesc = (e) => {
        this.setState({description: e.target.value});
    }
    //watcher链接
    handlewatcher = (e) => {
        this.setState({watcherLink: e.target.value});
    }




    render() {
        const show = this.props.show;
        const missionName = this.state.missionName;

        const {handleHideModal} = this.props;

        return (
            <Layout>
                <Content style={{padding: '0 50px'}}>
                    <Modal
                        visible={this.props.showModal}
                        onCancel={handleHideModal}
                        footer={null}
                    >
                        <Tabs type="card">
                            <TabPane tab="Flume监控" key="1">

                                {this.getFlumeContent()}
                            </TabPane>
                            <TabPane tab="特征监控" key="2">
                                <TaskCommon
                                    handlename={this.handlename}
                                    handledesc={this.handledesc}
                                    handlewatcher={this.handlewatcher}
                                />
                                {this.getFeatureContent()}
                            </TabPane>
                        </Tabs>
                    </Modal>
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // taskModalShow: state.taskModalShow,
        showModal: state.showModal
    }
}
const mapDispatchToProps = {
    handleFlumeSubmit,
    handleHideModal
};


ModalTask = connect(mapStateToProps, mapDispatchToProps)(ModalTask)

export default ModalTask = Form.create(options)(ModalTask);
