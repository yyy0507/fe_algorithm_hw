
//请求任务列表

import type from '../constant/type.js';

const { FETCH_TASK } = type;

const handleFetchTask = (pid,page,pageSize ) => dispatch => {
    // const url = `http://100.81.136.44:8080/projects/${pid}/missions?page=${page}&pageSize=${pageSize}`;
    const url = `/data/${pid}?page=${page}&pageSize=${pageSize}`
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
                alert('请求任务列表失败');
            }
        }).catch(err => {
        console.log(err);
    })
}

export { handleFetchTask }