import React, {Component} from 'react';


import { Modal,Layout,Tabs, Input } from 'antd';
const { Content } = Layout;
const TabPane = Tabs.TabPane;

import {connect} from "react-redux";


class ModalProject extends Component {
    constructor(props) {
        super(props)
    }

    handleCancel = () => {
        this.props.onChange(false)
    }

    render() {
        const {projectModalShow, handleCancel,handleOk} = this.props;

        const {show} = this.props;
        return (
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <Modal
                        okText='确定'
                        cancelText='取消'
                        title="工程信息"
                        visible={show}
                        onCancel={this.handleCancel}
                    >
                        <div>工程名称<Input placeholder="工程名称" /></div>
                        <div>watcher路径<Input placeholder="watcher路径" /></div>
                    </Modal>
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = {

};


ModalProject = connect(mapStateToProps, mapDispatchToProps)(ModalProject)

export default ModalProject