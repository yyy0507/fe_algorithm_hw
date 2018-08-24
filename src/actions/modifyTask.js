//修改任务

import type from '../constant/type.js';

const { MODIFY_TASK, FETCH_TASK  } = type;

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
    // const url = `http://100.81.136.44:8080/projects/${pid}/missions/${mid}`;
    const url = `/modifytask/${pid}/${mid}`;

    fetch(url,options)
        .then(res => res.json())
        .then(res => {
            console.log('modifytask',res);
            if (res && res.status === 0) {
                const url = `/data?page=1&pageSize=10`
                let options = {
                    method: 'GET',//get请求
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
                fetch(url,options)
                    .then(res => res.json())
                    .then(res => {
                        console.log('featch dele')
                        if (res && res.status === 0) {
                            const dataList = res.data.valueList;
                            dataList.map((item,index) => {
                                item.key = index;
                            })
                            dispatch({
                                type: FETCH_TASK,
                                payload: {
                                    taskList: dataList,
                                    totalPage: res.data.total
                                }
                            })
                        }
                    }).catch(err => {
                    console.log(err);
                })
            }
        }).catch(err => {
        console.log(err);
    })
}

export { handleModifyTask }