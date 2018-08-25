import React, {Component} from 'react';

import {Layout, Input, Button, Modal, Form} from 'antd';
import {handleHideModal, handleHideUser} from "../../actions";
import {connect} from "react-redux";

const {Content} = Layout;
const FormItem = Form.Item;
const Search = Input.Search;

import {handleUserLogin} from '../../actions/userLogin';
import {handleFetchTask} from "../../actions/fetchTask";
import {handleAddFlume} from "../../actions/fetchAddFlume";


class User extends Component {

    handleCreateUser = (e) => {
        e.preventDefault();
        const {handleUserLogin} = this.props;
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                handleUserLogin(values);
            } else {
                return;
            }
            handleHideUser();
            form.resetFields();
        });
    };


    render() {
        const {showUser, handleHideUser, handleUserLogin} = this.props;
        const {getFieldDecorator} = this.props.form;


        return (
            <Layout>
                <Content style={{padding: '0 50px'}}>
                    <Modal
                        okText='确定'
                        cancelText='取消'
                        title="用户配置"
                        visible={showUser}
                        onCancel={handleHideUser}
                        destroyOnClose={true}
                        footer={null}
                    >
                        <Form layout="vertical" onSubmit={this.handleCreateUser}>
                            <FormItem label="watcher用户指纹" className='g-flex user-wrapper'>
                                {getFieldDecorator('missionName', {
                                    rules: [{
                                        required: true, message: '请输入watcher用户指纹',
                                    }],
                                })(<Input type="text" placeholder="watcher用户指纹"/>)}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">确定修改</Button>
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
        showUser: state.showUser
    }
}
const mapDispatchToProps = {
    handleHideUser,
    handleUserLogin
};

const UserForm = Form.create()(User);

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
