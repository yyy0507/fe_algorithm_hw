import type from '../constant/type.js';

const { ADD_FEATURE } = type;

const handleAddfeature = ( pid, page, pageSize,v) => dispatch => {
    const url = `http://100.81.136.44:8080/projects/${pid}/missions?page=${page}&pageSize=${pageSize}`;
    let data = 'missionType=0&missionName='+ v.missionName + '&description='
        +v.description+'&watcherLink='+v.watcherLink+'&configuration='+
        '{"dbType":"'+v.dbType+'","dbName":"'+ v.dbName+'","tableName":"'+ v.tableName+'","dbOtherConfig":"'+v.dbOtherConfig+'","triggerMode":"'+v.triggerMode+'","triggerRule":"'+v.triggerRule+'","featureItems":"'+v.featureItems+'"}';
    console.log('handleAddfeature',data);
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
                    type: ADD_FEATURE,
                    payload: {
                        // dataList: dataList
                    }
                })
            }
        }).catch(err => {
        console.log(err);
    })
}

export { handleAddfeature }