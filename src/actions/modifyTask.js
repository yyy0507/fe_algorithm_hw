//修改任务

import type from '../constant/type.js';

const { MODIFY_TASK  } = type;

const handleModifyTask = (pid,mid,v) => dispatch => {

    let data = 'missionType=0&missionName='+ v.missionName + '&description='
        +v.description+'&watcherLink='+v.watcherLink
        +'&configuration='+'{"url":"'+v.url+'","monitorItems":"'+ v.monitorItems+'","alarmItems":"'+ v.alarmItems+'"}'
    let options = {
        method: 'PUT',//put请求
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    }
    const url = `http://100.81.136.44:8080/projects/${pid}/missions/${mid}`;

    fetch(url,options)
        .then(res => res.json())
        .then(res => {
            if (res && res.status === 0) {
                dispatch({
                    type: MODIFY_TASK,
                    payload: {

                    }
                })
            }
        }).catch(err => {
        console.log(err);
    })
}

export { handleModifyTask }