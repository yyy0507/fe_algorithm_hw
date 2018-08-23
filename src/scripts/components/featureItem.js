
//弹窗点击增加一列的弹窗，现在不用了


import React, {Component} from 'react';


import { Modal, Layout,  Input, Select,Checkbox ,Form, Button} from 'antd';
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const FormItem = Form.Item;

const { Content } = Layout;


import {connect} from "react-redux";

import {monitoritem} from "../../constant";
import {handleHideFeature} from '../../actions'


class FeatureItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showBaojing: true
        }
    }

    handleCancel = () => {
        this.props.onChange(false)
    }

    render() {
        const {projectModalShow, handleCancel,handleOk} = this.props;
        const {showFeature,handleHideFeature} = this.props;

        const {getFieldDecorator} = this.props.form;
        return (
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <Modal
                        okText='确定'
                        cancelText='取消'
                        title="字段配置"
                        visible={showFeature}
                        onCancel={handleHideFeature}
                    >

                        <Form layout="vertical" onSubmit={this.handleCreateConfig}>

                            <FormItem label="字段名称" className='task-item'>
                                {getFieldDecorator('name')(<Input type="text" placeholder="字段名称" />)}
                            </FormItem>
                            <FormItem label="字段类型" className='task-item'>
                                {getFieldDecorator('type', {
                                    initialValue: '连续'
                                })(
                                    <Select style={{ width: 120 }}>
                                        <Option value="连续">连续</Option>
                                        <Option value="分类">分类</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="数据范围" className='task-item'>
                                {getFieldDecorator('dataScope')(<Input type="text" placeholder="数据范围"/>)}
                            </FormItem>
                            <FormItem label="监控项" className='task-item'>
                                {getFieldDecorator('items')(
                                    <CheckboxGroup options={monitoritem} />
                                )}
                            </FormItem>
                            <FormItem label="其他配置" className='task-item'>
                                {getFieldDecorator('otherConfig')(<Input type="text" placeholder="其他配置"/>)}
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
        showFeature: state.showFeature
    }
}
const mapDispatchToProps = {
    handleHideFeature
};


FeatureItem = connect(mapStateToProps, mapDispatchToProps)(FeatureItem)

export default FeatureItem = Form.create()(FeatureItem);