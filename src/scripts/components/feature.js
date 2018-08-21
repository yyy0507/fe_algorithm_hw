import React, {Component} from 'react';


import {Layout, Input, Select, Table} from 'antd';
import {connect} from "react-redux";

const Option = Select.Option;
const {Content} = Layout;

const columns = [{
    title: '字段名称',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '字段类型',
    dataIndex: 'type',
    key: 'type',
}, {
    title: '监控项',
    dataIndex: 'jiankongitem',
    key: 'jiankongitem',
}, {
    title: '其他配置',
    dataIndex: 'otherConfig',
    key: 'otherConfig'
}];

class Feature extends Component {
    render() {
        const { dataFeature } = this.props;
        return (
            <div>
                <div className='flex'><span className='flexL'>任务名称</span><Input placeholder="任务名称"/></div>
                <div className='flex'><span className='flexL'>任务说明</span><Input placeholder="任务说明"/></div>
                <div className='flex'>
                    <div className='flex'><span className='flexL'>库类型</span>
                        <Select defaultValue="lucy" style={{width: 100}}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </div>
                    <div className='flex'>
                        <span className='flexL'>库/namespace</span>
                        <Input placeholder="库名"/>
                    </div>
                </div>
                <div className='flex'>
                    <div className='flex'>
                        <span className='flexL'>表</span>
                        <Input placeholder="表名"/>
                    </div>
                    <div className='flex'>
                        <span className='flexL'>其他配置</span>
                        <Input placeholder="其他配置"/>
                    </div>
                </div>
                <div>
                    <Table columns={columns} dataSource={dataFeature}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataFeature: state.dataFeature
    }
}
const mapDispatchToProps = {

};


Feature = connect(mapStateToProps, mapDispatchToProps)(Feature)

export default Feature;
