import React, {Component} from 'react';

import { Layout, Input, Button, Modal} from 'antd';
import {handleHideUser} from "../../actions";
import {connect} from "react-redux";

const { Content } = Layout;


class User extends Component {
    render() {
        const {showUser,handleHideUser} = this.props
        return (
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <Modal
                        okText='确定'
                        cancelText='取消'
                        title="用户配置"
                        visible={showUser}

                        onCancel={handleHideUser}
                    >
                    <div className='user-wrapper'>
                        <div className='user-config'></div>
                        <div className='user-watcher'>
                            <span className='user-watcher-title'>watcher用户指纹</span>
                            <Input placeholder='watcher用户指纹'/>
                        </div>
                        {/*<Button>确定修改</Button>*/}
                    </div>
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
    handleHideUser
};


User = connect(mapStateToProps, mapDispatchToProps)(User)

export default User

