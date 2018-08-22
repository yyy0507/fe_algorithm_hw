import React, {Component} from 'react';

import { Input } from 'antd';

export default class TaskCommon extends Component {
    render() {
        return (
            <div>
                <div className='taskItem'>
                    <div className='taskLeft'>任务名称</div>
                    <Input placeholder='任务名称' name='missionName' onChange={this.props.handlename} required/>
                </div>
                <div className="taskItem">
                    <div className='taskLeft'>任务说明</div>
                    <Input placeholder='任务说明' name='description' onChange={this.props.handledesc} required/>
                </div>
                <div className="taskItem">
                    <div className='taskLeft'>watcher链接</div>
                    <Input placeholder='watcher链接' name='watcherLink' onChange={this.props.handlewatcher} required/>
                </div>
            </div>
        );
    }
}
