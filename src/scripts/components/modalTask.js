import React, {Component} from 'react';


import {Modal, Layout, Tabs, Form, Input, Select, Checkbox,Button, Table, InputNumber, Popconfirm } from 'antd';

const {Content} = Layout;
const TabPane = Tabs.TabPane;

// const FormItem = Form.Item;
// const CheckboxGroup = Checkbox.Group;
// const Option = Select.Option;



import { connect } from "react-redux";

// import { handleFlumeSubmit } from "../../actions/fetchFlume";
// import {handleFeatureSubmit} from '../../actions/fetchFeature';
// import {handleModifyTask} from '../../actions/modifyTask';
// import {handleFetchTask} from '../../actions/fetchTask';
import {handleHideModal} from '../../actions'


import Flume from './flume'
import Feature from './feature'

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
    }

    render() {

        const {handleHideModal,showModal} = this.props;
        return (
            <Layout>
                <Content style={{padding: '0 50px'}}>
                    <Modal
                        visible={showModal}
                        onCancel={handleHideModal}
                        footer={null}
                    >
                        <Tabs type="card">
                            <TabPane tab="Flume监控" key="1">
                                <Flume/>
                            </TabPane>
                            <TabPane tab="特征监控" key="2">
                                <Feature/>
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
    handleHideModal
};


ModalTask = connect(mapStateToProps, mapDispatchToProps)(ModalTask)

export default ModalTask = Form.create(options)(ModalTask);
