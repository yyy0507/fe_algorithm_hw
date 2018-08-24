// 未使用

import React, {Component} from 'react';


import {Table, Input, InputNumber, Popconfirm, Button, Form, Select, Checkbox, Divider} from 'antd';
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

import {connect} from "react-redux";
import {monitoritem} from "../../constant";


const FormItem = Form.Item;
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

class FeatureTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingKey: '',
            url: 'xxx',
            dataSource: [{
                key: 0,
                name: `price`,
                type: '连续',
                items: '最大值',
                dataScope: '@dt...',
                otherConfig: '{}'
            }, {
                key: 1,
                name: `test`,
                type: '分类',
                items: '最大值',
                dataScope: '@dt...',
                otherConfig: '{}'
            }],
            count: 2,

        };
        this.columns = [
            {
                title: '字段名称',
                dataIndex: 'name',
                width: '15%',
                editable: false,
                render:  () => (
                    <Select defaultValue='特征的空值率' style={{ width: 120 }}>
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
                    <Select defaultValue='连续' style={{ width: 120 }}>
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
                    <CheckboxGroup options={monitoritem} />
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

    }

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

    cancel = () => {
        this.setState({editingKey: ''});
    };

    handleAdd = () => {
        const { count, dataSource } = this.state;
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

    }

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

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
            <div className='clrfix'>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
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
        );
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = {
};


FeatureTable = connect(mapStateToProps, mapDispatchToProps)(FeatureTable)

export default FeatureTable