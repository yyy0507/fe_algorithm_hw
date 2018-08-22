import React, {Component} from 'react';
import {Form,FormItem, Button } from 'antd';

import {ziduan} from "../../constant";

getFlumeContent = () => {
    const {getFieldDecorator} = this.props.form;
    return (
        <Form layout="vertical" onSubmit={this.handleCreateFlume}>

            {/*<TaskCommon handlename={this.handlename} handledesc={this.handledesc} handlewatcher={this.handlewatcher}/>*/}

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

export { getFlumeContent }