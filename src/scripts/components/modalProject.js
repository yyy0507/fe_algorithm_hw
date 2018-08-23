import React, {Component} from 'react';


import { Modal,Layout,Tabs, Input , Form} from 'antd';
const { Content } = Layout;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

import {connect} from "react-redux";
import {handleHideModal} from '../../actions'


class ModalProject extends Component {
    constructor(props) {
        super(props)
    }

    handleCancel = () => {
        this.props.onChange(false)
    }

    render() {
        const {projectModalShow, handleCancel,handleOk} = this.props;
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
                    >
                        <Form layout="vertical" onSubmit={this.handleCreateConfig}>

                            <FormItem label="工程名称" className='task-item'>
                                {getFieldDecorator('name')(<Input type="text" placeholder="工程名称" />)}
                            </FormItem>
                            <FormItem label="watcher路径" className='task-item'>
                                {getFieldDecorator('path')(<Input type="text" placeholder="watcher路径" />)}
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
        showModal: state.showModal
    }
}
const mapDispatchToProps = {
    handleHideModal
};


ModalProject = connect(mapStateToProps, mapDispatchToProps)(ModalProject)

export default ModalProject  = Form.create()(ModalProject);