import React, {Component} from 'react';


import {Modal, Layout, Tabs } from 'antd';

const {Content} = Layout;
const TabPane = Tabs.TabPane;

import { connect } from "react-redux";
import {handleTab} from '../../actions/featureMonitoring';
import {handleHideModal} from '../../actions'

import Flume from './flume';
import Feature from './feature';

class ModalTask extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const {handleHideModal,showModal,proid,handleTab} = this.props;
        return (
            <Layout>
                <Content style={{padding: '0 50px'}}>
                    <Modal
                        visible={showModal}
                        onCancel={handleHideModal}
                        footer={null}
                    >
                        <Tabs type="card" onTabClick={(value) => handleTab(value)}>
                            <TabPane tab="Flume监控" key="1">
                                <Flume projectkey={proid}/>
                            </TabPane>
                            <TabPane tab="特征监控" key="2">
                                <Feature projectkey={proid}/>
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
        showModal: state.showModal,
        dataTask: state.dataTask,
        projectId: state.projectId,
        page: state.page
    }
}
const mapDispatchToProps = {
    handleHideModal,
    handleTab
};


ModalTask = connect(mapStateToProps, mapDispatchToProps)(ModalTask)

export default ModalTask
