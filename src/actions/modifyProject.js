//修改工程  （暂定）

import type from '../constant/type.js';

const { MODIFY_PROJECT  } = type;

const handleModifyProject = (pid,v) => dispatch => {

    let data = 'missionType=0&missionName='+ v.missionName + '&description='
        +v.description+'&watcherLink='+v.watcherLink;
    let options = {
        method: 'PUT',//put请求
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    }
    const url = `http://100.81.136.44:8080/projects/${pid}`;

    fetch(url,options)
        .then(res => res.json())
        .then(res => {
            if (res && res.status === 0) {
                dispatch({
                    type: MODIFY_PROJECT,
                    payload: {

                    }
                })
            }
        }).catch(err => {
        console.log(err);
    })
}

export { handleModifyProject }