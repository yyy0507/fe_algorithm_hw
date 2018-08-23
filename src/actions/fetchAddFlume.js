import type from '../constant/type.js';

const { ADD_FLUME } = type;

const handleAddFlume = ( pid, page, pageSize,v) => dispatch => {
    const url = `http://100.81.136.44:8080/projects/${pid}/missions?page=${page}&pageSize=${pageSize}`;
    let data = 'missionType=0&missionName='+ v.missionName + '&description='
        +v.description+'&watcherLink='+v.watcherLink
        +'&configuration='+'{"url":"'+v.url+'","monitorItems":"'+ v.monitorItems+'","alarmItems":"'+ v.alarmItems+'"}'
    let options = {
        method: 'POST',//post请求
        // mode: "no-cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    }
    fetch(url, options)
        .then(res => res.json())
        .then(res => {
            if (res && res.status === 0) {
                const dataList = res.data;
                dataList.map((item,index) => {
                    item.key = index;
                })
                dispatch({
                    type: ADD_FLUME,
                    payload: {
                        dataList: dataList
                    }
                })
            }
        }).catch(err => {
        console.log(err);
    })
}

export { handleAddFlume }