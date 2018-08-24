import React, {Component} from 'react';


import {Layout, Input, Form, Checkbox, Button, Select, Table, Popconfirm, Divider} from 'antd';


const {Content} = Layout;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

import {connect} from "react-redux";


// import FeatureTable from './featureTable'
import {handleFetchTask} from "../../actions/fetchTask";
import {handleModifyTask} from "../../actions/modifyTask";
import {handleHideModal} from "../../actions";
import {handleAddfeature} from '../../actions/fetchAddFeature';



import {monitoritem} from "../../constant";


const modeData = ['zhejiang', 'Jiangsu'];
const ruleData = {
    Zhejiang: 'Hangzhou',
    Jiangsu: 'Nanjing',
};


const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
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
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const {getFieldDecorator} = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{margin: 0}}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
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
            dataSource: [],
            count: 0,
            mode: modeData[0],
            rule: ruleData[modeData[0]],
        };
        this.columns = [
            {
                title: '字段名称',
                dataIndex: 'name',
                width: '15%',
                editable: false,
                render: () => (
                    <Select defaultValue='特征的空值率' onChange={this.handleNameChange}>
                        <Option value="特征的空值率">特征的空值率</Option>
                        <Option value="覆盖率">覆盖率</Option>
                        <Option value="均值">均值</Option>
                        <Option value="方差">方差</Option>
                        <Option value="分布变化">分布变化</Option>
                    </Select>
                )
            },
            {
                title: '字段类型',
                dataIndex: 'type',
                width: '10%',
                editable: false,
                render: () => (
                    <Select defaultValue='连续' style={{width: 120}}>
                        <Option value="连续">连续</Option>
                        <Option value="分类">分类</Option>
                    </Select>
                ),
            },
            {
                title: '监控项',
                dataIndex: 'items',
                width: '33%',
                editable: false,
                render: () => (
                    <CheckboxGroup options={monitoritem}/>
                )
            },
            {
                title: '其他配置',
                dataIndex: 'otherConfig',
                width: '15%',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'action',
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
                                                    style={{marginRight: 8}}
                                                >
                                                    保存
                                                </a>
                                            )}
                                      </EditableContext.Consumer>
                                      <Popconfirm
                                          title="Sure to cancel?"
                                          onConfirm={() => this.cancel(record.key)}
                                      >
                                            <a>取消</a>
                                      </Popconfirm>
                                </span>
                            ) : (
                                <div>
                                    <a onClick={() => this.edit(record.key)}>编辑</a>
                                    <Divider type="vertical"/>
                                    <a onClick={() => this.shanchu(record.key)}>删除</a>
                                </div>
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
        this.setState({editingKey: key});
    }

    shanchu(key) {
        console.log('L210',key)
    }

    //保存表格
    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.dataSource];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({dataSource: newData, editingKey: ''});
            } else {
                newData.push(row);
                this.setState({dataSource: newData, editingKey: ''});
            }
        });
    }

    //取消修改表格
    cancel = () => {
        this.setState({editingKey: ''});
    };

    handleAdd = () => {
        const {count, dataSource} = this.state;
        const newData = {
            key: count,
            name: ``,
            type: '',
            items: '',
            dataScope: '',
            otherConfig: '{}'
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });

    };


    //创建一个表单并提交
    handleCreateFeature = (e) => {
        e.preventDefault();
        const {handleFetchTask, handleHideModal, taskId, handleModifyTask, projectId, page, handleAddfeature} = this.props
        const form = this.props.form;
        const pageSize = 10;
        form.validateFields((err, values) => {
            console.log('L64', this.state.dataSource);
            if (!err) {
                if (!taskId) {
                    handleAddfeature(124, page, pageSize, {
                        ...values,
                        missionName: this.state.missionName,
                        description: this.state.description,
                        watcherLink: this.state.watcherLink,
                        featureItems: this.state.dataSource
                    });
                } else {
                    handleModifyTask(111, taskId, {
                        ...values,
                        missionName: this.state.missionName,
                        description: this.state.description,
                        watcherLink: this.state.watcherLink
                    });
                }
            }
            // console.log('Received values of form: ', values);
            handleHideModal()
            form.resetFields();
        });
    }

    //触发方式的改变
    handleModeChange = (value) => {
        this.setState({
            mode: modeData[value],
            rule: ruleData[value],
        });
    };

    handleNameChange = (value) => {

        this.setState({
            name: value
        })
    }

    render() {
        const modeOptions = modeData.map(mode => <Option key={mode}>{mode}</Option>);

        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const {getFieldDecorator} = this.props.form;

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <Form layout="vertical" onSubmit={this.handleCreateFeature} className='clrfix'>
                <FormItem label="任务名称" className='task-item'>
                    {getFieldDecorator('missionName', {
                        rules: [{
                            required: true, message: '请输入任务名称',
                        }],
                    })(<Input type="text" placeholder="任务名称"/>)}
                </FormItem>
                <FormItem label="任务说明" className='task-item'>
                    {getFieldDecorator('description', {
                        rules: [{
                            required: true, message: '请输入任务说明',
                        }],
                    })(<Input type="text" placeholder="任务说明"/>)}
                </FormItem>
                <FormItem label="watcher链接" className='task-item'>
                    {getFieldDecorator('watcherLink', {
                        rules: [{
                            required: true, message: '请输入watcher链接',
                        }],
                    })(<Input type="text" placeholder="watcher链接"/>)}
                </FormItem>
                <FormItem label="库类型" className='task-item feature-left'>
                    {getFieldDecorator('dbType', {
                        initialValue: 'lucy'
                    })(
                        <Select style={{width: 100}}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="库/namespace" className='task-item feature-left'>
                    {getFieldDecorator('dbName')(<Input type="text" placeholder="namespace"/>)}
                </FormItem>
                <FormItem label="表" className='task-item feature-left'>
                    {getFieldDecorator('tableName')(<Input type="text" placeholder="表"/>)}
                </FormItem>
                <FormItem label="其他配置" className='task-item feature-left'>
                    {getFieldDecorator('dbOtherConfig')(<Input type="text" placeholder="其他配置项"/>)}
                </FormItem>

                <FormItem label="触发方式" className='task-item feature-left'>
                    {getFieldDecorator('triggerMode',
                        {
                            initialValue: modeData[0]
                        }
                    )(
                        <Select onChange={this.handleModeChange}>
                            {modeOptions}
                        </Select>

                    )}
                </FormItem>
                <FormItem label="触发规则" className='task-item feature-left'>
                    {getFieldDecorator('triggerRule',{
                        initialValue: this.state.rule
                    })(
                        <Input type="text" placeholder="触发规则"/>
                    )}
                </FormItem>

                <FormItem label="数据范围" className='task-item feature-left'>
                    {getFieldDecorator('dataScope')(<Input type="text" placeholder="数据范围"/>)}
                </FormItem>
                {/*<FeatureTable/>*/}

                <div className='clrfix'>
                    <Button onClick={this.handleAdd} type="primary" style={{marginBottom: 16}}>
                        增加一行
                    </Button>
                    <Table
                        components={components}
                        bordered
                        dataSource={this.state.dataSource}
                        columns={columns}
                        rowClassName="editable-row"
                    />
                </div>
                <FormItem>
                    <Button type="primary" htmlType="submit">确定</Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskId: state.taskId,
        page: state.page
    }
}
const mapDispatchToProps = {
    handleHideModal,
    handleModifyTask,
    handleFetchTask,
    handleAddfeature
};


const featureForm = Form.create()(Feature);

export default connect(mapStateToProps, mapDispatchToProps)(featureForm);