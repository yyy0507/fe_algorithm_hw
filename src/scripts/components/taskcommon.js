import React, {Component} from 'react';

import { Input } from 'antd';
import {connect} from "react-redux";
import {handleHideUser} from "../../actions";

class TaskCommon extends Component {

    render() {
        const {taskDetail} = this.props;
        return (
            <div>
                <div className='task-item'>
                    <div className='task-left'>任务名称</div>
                    <Input placeholder='任务名称' name='missionName' onChange={this.props.handlename} required defaultValue={taskDetail.missionName}/>
                </div>
                <div className="task-item">
                    <div className='task-left'>任务说明</div>
                    <Input placeholder='任务说明' name='description' onChange={this.props.handledesc} required defaultValue={taskDetail.description}/>
                </div>
                <div className="task-item">
                    <div className='task-left'>watcher链接</div>
                    <Input placeholder='watcher链接' name='watcherLink' onChange={this.props.handlewatcher} required defaultValue={taskDetail.watcherLink}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        showUser: state.showUser,
        taskDetail: state.taskDetail,
    }
}
const mapDispatchToProps = {
    handleHideUser
};


TaskCommon = connect(mapStateToProps, mapDispatchToProps)(TaskCommon)

export default TaskCommon