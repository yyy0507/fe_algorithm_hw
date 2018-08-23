import React, {Component} from 'react';

import { Layout, Menu } from 'antd';

const { Header } = Layout;
import {
    Link
} from 'react-router-dom';
import {handleFetchTask} from "../../actions/fetchTask";
import {handleShowUser} from "../../actions";
import {connect} from "react-redux";

import User from './user'


class Navigation extends Component {
    render() {
        const {handleShowUser,showUser} = this.props;

        console.log('user',showUser)
        return (
            <Layout>
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        {/*<Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>*/}
                        <Menu.Item key="2"><Link to="/">工程管理</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/permission">权限管理</Link></Menu.Item>
                        <Menu.Item key="4"><div onClick={handleShowUser}>用户配置</div></Menu.Item>
                    </Menu>
                </Header>
                <User/>
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
    handleShowUser
};


Navigation = connect(mapStateToProps, mapDispatchToProps)(Navigation)

export default Navigation
