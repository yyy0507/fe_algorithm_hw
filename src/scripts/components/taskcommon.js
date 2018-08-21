import React, {Component} from 'react';


import { Input } from 'antd';

export default class TaskCommon extends Component {
    render() {
        return (
            <div>
                <span>任务名称</span>
                <Input placeholder='任务名称' name='missionName' onChange={this.props.handlename} required/>
                <span>任务说明</span>
                <Input placeholder='任务说明' name='description' onChange={this.props.handledesc} required/>
                <span>watcher链接</span>
                <Input placeholder='watcher链接' name='watcherLink' onChange={this.props.handlewatcher} required/>
            </div>
        );
    }
}
