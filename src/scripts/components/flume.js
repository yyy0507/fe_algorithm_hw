import React, {Component} from 'react';


import {Layout, Input, Form} from 'antd';
import {connect} from "react-redux";

const FormItem = Form.Item;

const {Content} = Layout;


const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const {visible, onCancel, onCreate, form} = this.props;
            const {getFieldDecorator} = form;
            return (
                <Form layout="vertical" onSubmit={this.handleCreateFeature}>
                    <FormItem label="任务名称">
                        {getFieldDecorator('missionName',{
                            rules: [{ required: true, message: 'Please input your missionName!' }],
                        })(<Input type="text" placeholder="任务名称"/>)}
                    </FormItem>
                    <FormItem label="任务说明">
                        {getFieldDecorator('description',{
                            rules: [{ required: true, message: 'Please input your description!' }],
                        })(<Input type="text" placeholder="任务说明"/>)}
                    </FormItem>
                    <FormItem label="watcher跳转链接">
                        {getFieldDecorator('watcherLink',{
                            rules: [{ required: true, message: 'Please input your watcherLink!' }],
                        })(<Input type="text" placeholder="watcher跳转链接"/>)}
                    </FormItem>
                </Form>
            );
        }
    }
);


class Flume extends Component {

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        return (
            <div>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = {

};


Flume = connect(mapStateToProps, mapDispatchToProps)(Flume)

export default Flume;

