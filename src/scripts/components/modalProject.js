import React, {Component} from 'react';


import { Modal,Layout,Tabs, Input , Form,Button} from 'antd';
const { Content } = Layout;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

import {connect} from "react-redux";
import {handleHideModal} from '../../actions';
import {handleAddProject} from '../../actions/addProject';
import {handleModifyProject} from '../../actions/modifyProject';
import {handleFetchProject} from "../../actions/fetchProject";


class ModalProject extends Component {
    constructor(props) {
        super(props)
    }

    handleCreateProject = (e) => {
        e.preventDefault();
        const {handleAddProject,projectId,page} = this.props
        const form = this.props.form;
        const pageSize = 10;
        console.log('projectId',projectId);
        form.validateFields((err, values) => {
            if (!err) {
                if(!projectId) {
                    handleAddProject(page,pageSize,{
                        ...values
                    });
                } else {
                    handleModifyProject(projectId,{
                        ...values
                    });
                }
            } else {
                return
            }
            handleHideModal()
            handleFetchProject(page,10)
            form.resetFields();
        });
    }


    render() {
        const {showModal,handleHideModal} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <Modal
                        okText='确定'
                        cancelText='取消'
                        title="工程信息"
                        visible={showModal}
                        onCancel={handleHideModal}
                        footer={null}
                    >
                        <Form layout="vertical" onSubmit={this.handleCreateProject}>
                            <FormItem label="工程名称" className='task-item'>
                                {getFieldDecorator('projectName',{
                                    rules: [{ required: true, message: 'Please input the 工程名称' }],
                                })(<Input type="text" placeholder="工程名称" />)}
                            </FormItem>
                            <FormItem label="工程描述" className='task-item'>
                                {getFieldDecorator('description',{
                                    rules: [{ required: true, message: 'Please input the 工程描述' }],
                                })(<Input type="text" placeholder="工程描述" />)}
                            </FormItem>
                            <FormItem label="watcher链接" className='task-item'>
                                {getFieldDecorator('watcherLink',{
                                    rules: [{ required: true, message: 'Please input the watcher链接' }],
                                })(<Input type="text" placeholder="watcher链接" />)}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">确定</Button>
                            </FormItem>
                        </Form>
                    </Modal>
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showModal: state.showModal,
        page: state.page
    }
}
const mapDispatchToProps = {
    handleHideModal,
    handleAddProject,
    handleModifyProject
};


ModalProject = connect(mapStateToProps, mapDispatchToProps)(ModalProject)

export default ModalProject  = Form.create()(ModalProject);