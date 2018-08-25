//修改任务

import type from '../constant/type.js';

const { MODIFY_TASK, FETCH_TASK  } = type;

const handleModifyFlume = (pid,mid,v,page) => dispatch => {
    console.log('modify',v);
    const jsontest = {url: v.url, monitorItems: v.monitorItems, alarmItems: v.alarmItems};
    const json = JSON.stringify(jsontest);

    let data = 'missionType=0&missionName=' + v.missionName + '&description='
        + v.description + '&watcherLink=' + v.watcherLink
        + '&configuration=' + json;

    // let data = 'missionType=0&missionName='+ v.missionName + '&description='
    //     +v.description+'&watcherLink='+v.watcherLink
    //     +'&configuration='+'{"url":"'+v.url+'","monitorItems":"'+ v.monitorItems+'","alarmItems":"'+ v.alarmItems+'"}';

    let options = {
        method: 'POST',//put请求
        // mode: "no-cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    }
    const url = `http://100.81.136.44:8080/projects/${pid}/missions/${mid}`;
    // const url = `/modifytask/${pid}/${mid}`;

    fetch(url,options)
        .then(res => res.json())
        .then(res => {
            console.log('modifytask',res);
            if (res && res.status === 0) {     // 修改成功之后的回调函数，重新渲染一下当前页面的数据
                const url = `/data?page=${page}&pageSize=10`
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
                        // console.log('featch dele');
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
                        } else {
                            alert('修改成功，但更新失败');
                        }
                    }).catch(err => {
                    console.log(err);
                })
            } else {
                alert('修改失败');
            }
        }).catch(err => {
        console.log(err);
    })
}

export { handleModifyFlume }