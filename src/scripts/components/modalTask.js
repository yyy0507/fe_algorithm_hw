import React, {Component} from 'react';


import { Modal,Layout,Tabs } from 'antd';
const { Content } = Layout;
const TabPane = Tabs.TabPane;

import {connect} from "react-redux";

import {handleCancel,handleOk} from "../../actions";
import { flume } from './flume'
import Flume from "./flume";
import Feature from './feature'

class ModalTask extends Component {

    render() {
        const {taskModalShow, handleCancel,handleOk} = this.props;
        console.log(taskModalShow)
        return (
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <Modal

                           visible={taskModalShow}
                           onOk={handleOk}
                           onCancel={handleCancel}
                    >
                        <Tabs type="card">
                            <TabPane tab="Flume监控" key="1"><Flume/></TabPane>
                            <TabPane tab="特征监控" key="2"><Feature/></TabPane>
                        </Tabs>,
                    </Modal>
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskModalShow: state.taskModalShow,
    }
}
const mapDispatchToProps = {
    handleCancel,
    handleOk
};


ModalTask = connect(mapStateToProps, mapDispatchToProps)(ModalTask)

export default ModalTask