import type from '../constant/type.js';

const {ADD_FLUME} = type;

const handleAddFlume = (pid, page, pageSize, v) => dispatch => {
    const url = `http://100.81.136.44:8080/projects/${pid}/missions?page=${page}&pageSize=${pageSize}`;

    const jsontest = {url: v.url, monitorItems: v.monitorItems, alarmItems: v.alarmItems};
    const json = JSON.stringify(jsontest);

    let data = 'missionType=0&missionName=' + v.missionName + '&description='
        + v.description + '&watcherLink=' + v.watcherLink
        + '&configuration=' + json;

    // let data = 'missionType=0&missionName='+ v.missionName + '&description='
    //     +v.description+'&watcherLink='+v.watcherLink
    //     +'&configuration='+'{"url":"'+v.url+'","monitorItems":"'+ v.monitorItems+'","alarmItems":"'+ v.alarmItems+'"}';

    console.log('addFlume', data);
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
                dataList.map((item, index) => {
                    item.key = index;
                })
                dispatch({
                    type: ADD_FLUME,
                    payload: {
                        dataList: dataList
                    }
                })
            } else {
                alert('增加flume监控失败');
            }
        }).catch(err => {
        console.log(err);
    })
}

export {handleAddFlume}