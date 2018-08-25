import React, {Component} from 'react';


import {Layout, Input, Form, Checkbox, Button, Select, Table, Popconfirm, Divider, InputNumber} from 'antd';


const {Content} = Layout;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

import {connect} from "react-redux";


// import FeatureTable from './featureTable'
import {handleFetchTask} from "../../actions/fetchTask";
import {handleModifyFlume} from "../../actions/modifyTask";
import {handleHideModal,handleTypeChange} from "../../actions";
import {handleAddfeature} from '../../actions/fetchAddFeature';


import {jiankong, monitoritem} from "../../constant";


const modeData = ['crontab', '接口'];
const dbTypeData = ['1', '2', '3'];
const ziduanname = ['11', '22', '33'];

const typeData = ['连续','分类'];
const itemsData = {
    连续: ['1', '2', '3'],
    分类: ['11','22','33']
}
const nameData = ['price','buy-cuppon'];


//
const data = [];
// for (let i = 0; i < 3; i++) {
//     data.push({
//         // key: i.toString(),
//         // name: `Edrward ${i}`,
//         // age: 32,
//         // type: '连续',
//         // address: `London Park no. ${i}`,
//     });
// }
const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {

    getInput = (itemlist,handletype) => {
        if (this.props.inputType === 'name') {
            console.log('this.props',this.props);
            console.log('this.props.page',itemlist);
            const nameoptions = nameData.map(mode => <Option key={mode}>{mode}</Option>);
            return (
                <Select>
                    {nameoptions}
                </Select>
            );
        } else if (this.props.inputType === 'type'){
            const typeoptions = typeData.map(mode => <Option key={mode}>{mode}</Option>);
            return (
                <Select onChange={(value) => handletype(value)}>
                    {typeoptions}
                </Select>
            )
        } else if (this.props.inputType === 'items'){
            console.log('this.props.itemlist',this.props.itemlist);
            return (
                <CheckboxGroup options={jiankong}></CheckboxGroup>
            )
        }
        return <Input/>;
    };


    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps,

        } = this.props;

        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput(this.props.itemlist,this.props.handle))}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class Feature extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editingKey: '',
            url: 'xxx',
            data,
            count: 0,
            mode: modeData[0]
        };

        const ziduanoptions = ziduanname.map(mode => <Option key={mode}>{mode}</Option>);

        this.columns = [
            {
                title: '字段名称',
                dataIndex: 'name',
                width: '15%',
                editable: true,
            },
            {
                title: '字段类型',
                dataIndex: 'type',
                width: '15%',
                editable: true,
            },
            {
                title: '监控项',
                dataIndex: 'items',
                width: '40%',
                editable: true,
            },
            {
                title: '其他配置',
                dataIndex: 'otherConfig',
                width: '20%',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a
                                                href="javascript:;"
                                                onClick={() => this.save(form, record.key)}
                                                style={{ marginRight: 8 }}
                                            >
                                                Save
                                            </a>
                                        )}
                                    </EditableContext.Consumer>
                                    <Popconfirm
                                        title="Sure to cancel?"
                                        onConfirm={() => this.cancel(record.key)}
                                    >
                                        <a>Cancel</a>
                                    </Popconfirm>
                                </span>
                            ) : (
                                <a onClick={() => this.edit(record.key)}>Edit</a>
                            )}
                        </div>
                    );
                },
            },
        ];
    }



    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };

    edit(key) {
        this.setState({ editingKey: key });
    }

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    handleAdd = () => {
        const {count, data} = this.state;
        console.log('add');
        const newData = {
            key: count,
            name: '',
            type: '',
            items: '',
            otherConfig: '{}'
        };
        this.setState({
            data: [...data, newData],
            count: count + 1,
        });

    };


    //创建一个表单并提交
    handleCreateFeature = (e) => {
        e.preventDefault();
        const {handleHideModal, taskId, handleModifyFlume, page, handleAddfeature, projectkey} = this.props;
        // console.log('projectkeyfeature', projectkey);
        console.log('dataSource', this.state.data);
        const form = this.props.form;
        const newfeatureItems = JSON.stringify(this.state.data);
        console.log('newfeatureItems',newfeatureItems);
        const pageSize = 10;
        form.validateFields((err, values) => {
            console.log('L64', this.state.dataSource);
            if (!err) {
                if (!taskId) {
                    handleAddfeature(projectkey, page, pageSize, {
                        ...values,
                        featureItems: newfeatureItems
                    });
                } else {
                    handleModifyFlume(projectkey, taskId, {
                        ...values,
                        featureItems: this.state.dataSource
                    });
                }
            } else {
                return ;
            }
            // console.log('Received values of form: ', values);
            handleHideModal()
            form.resetFields();
        });
    };

    render() {
        const modeOptions = modeData.map(mode => <Option key={mode}>{mode}</Option>);
        const dbTypeOptions = dbTypeData.map(type => <Option key={type}>{type}</Option>);


        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const {getFieldDecorator} = this.props.form;
        const {featureInit} = this.props;
        // console.log('featureInit', featureInit);

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'name' ? 'name' : (col.dataIndex === 'type' ? 'type' : (col.dataIndex === 'items' ? 'items' : 'text')),
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                    itemlist: [1,2],
                    handle: this.props.handleTypeChange
                }),
            };
        });

        return (
            <Form layout="vertical" onSubmit={this.handleCreateFeature} className='clrfix'>
                <FormItem label="任务名称" className='task-item g-flex'>
                    {getFieldDecorator('missionName', {
                        rules: [{
                            required: true, message: '请输入任务名称',
                        }],
                    })(<Input type="text" placeholder="任务名称"/>)}
                </FormItem>
                <FormItem label="任务说明" className='task-item g-flex'>
                    {getFieldDecorator('description', {
                        rules: [{
                            required: true, message: '请输入任务说明',
                        }],
                    })(<Input type="text" placeholder="任务说明"/>)}
                </FormItem>
                <FormItem label="watcher链接" className='task-item g-flex'>
                    {getFieldDecorator('watcherLink', {
                        rules: [{
                            type: 'url', message: '请输入合法的url地址!',
                        }, {
                            required: true, message: '请输入watcher链接',
                        }],
                    })(<Input type="text" placeholder="watcher链接"/>)}
                </FormItem>
                <div className='g-flex feature-item'>
                    <FormItem label="库类型" className='feature-left g-flex'>
                        {getFieldDecorator('dbType', {
                            initialValue: dbTypeData[0]
                        })(
                            <Select style={{width: 100}}>
                                {dbTypeOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="服务器配置" className='feature-item g-flex'>
                        {getFieldDecorator('fuwuqiConfig')(
                            <div className='g-flex'>
                                <Select style={{width: 100}}>
                                    {dbTypeOptions}
                                </Select>
                                <Input value='ddd' disabled/>
                            </div>

                        )}
                    </FormItem>
                </div>
                <div className='g-flex feature-item'>
                    <FormItem label="库/namespace" className='feature-left g-flex'>
                        {getFieldDecorator('dbName')(<Input type="text" placeholder="namespace"/>)}
                    </FormItem>
                    <FormItem label="表" className=' feature-item g-flex'>
                        {getFieldDecorator('tableName')(<Input type="text" placeholder="表"/>)}
                    </FormItem>
                </div>

                <FormItem label="数据范围" className='feature-item g-flex'>
                    {getFieldDecorator('dataScope')(<Input type="text" placeholder="数据范围"/>)}
                </FormItem>

               <div className='g-flex feature-item'>
                   <FormItem label="触发方式" className='feature-left g-flex'>
                       {getFieldDecorator('triggerMode',
                           {
                               initialValue: modeData[0]
                           }
                       )(
                           <Select>
                               {modeOptions}
                           </Select>
                       )}
                   </FormItem>
                   <FormItem label="触发规则" className='feature-left g-flex'>
                       {getFieldDecorator('triggerRule', {
                           initialValue: this.state.rule
                       })(
                           <Input type="text" placeholder="触发规则"/>
                       )}
                   </FormItem>
               </div>


                {/*<FeatureTable/>*/}

                <div className='clrfix'>
                    <Button onClick={this.handleAdd} type="primary" style={{marginBottom: 16}}>
                        增加一行
                    </Button>
                    <Table
                        components={components}
                        bordered
                        dataSource={this.state.data}
                        columns={columns}
                        rowClassName="editable-row"
                        pagination={false}
                    />
                </div>
                <FormItem>
                    <Button type="primary" htmlType="submit" className='btn'>确定</Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskId: state.taskId,
        page: state.page,
        featureInit: state.featureInit,
        itemlist: state.itemlist

    }
}
const mapDispatchToProps = {
    handleHideModal,
    handleModifyFlume,
    handleFetchTask,
    handleAddfeature,
    handleTypeChange
};


const featureForm = Form.create()(Feature);

export default connect(mapStateToProps, mapDispatchToProps)(featureForm);