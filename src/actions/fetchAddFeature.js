import type from '../constant/type.js';

const {ADD_FEATURE} = type;

const handleAddfeature = (pid, page, pageSize, v) => dispatch => {
    const url = `http://100.81.136.44:8080/projects/${pid}/missions?page=${page}&pageSize=${pageSize}`;

    const datas = {
        dbType: v.dbType,
        dbName: v.dbName,
        tableName: v.tableName,
        dbOtherConfig: v.dbOtherConfig,
        triggerMode: v.triggerMode,
        triggerRule: v.triggerRule,
        dataScope: v.dataScope,
        featureItems: v.featureItems
    };
    const json = JSON.stringify(datas);
    // let datas = 'missionType=0&missionName=' + v.missionName + '&description='
    //     + v.description + '&watcherLink=' + v.watcherLink + '&configuration=' +
    //     '{"dbType":"' + v.dbType + '","dbName":"' + v.dbName + '","tableName":"' + v.tableName + '","dbOtherConfig":"' + v.dbOtherConfig + '","triggerMode":"' + v.triggerMode + '","triggerRule":"' + v.triggerRule + '","featureItems":"' + v.featureItems + '"}';

    let data = 'missionType=1&missionName=' + v.missionName + '&description='
        + v.description + '&watcherLink=' + v.watcherLink
        + '&configuration=' + json;
    console.log('handleAddfeature', data);
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
                    type: ADD_FEATURE,
                    payload: {
                        // dataList: dataList
                    }
                })
            } else {
                alert('添加特征监控失败');
            }
        }).catch(err => {
        console.log(err);
    })
}

export {handleAddfeature}