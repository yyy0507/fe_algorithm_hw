//搜索任务

import type from '../constant/type.js';

const { SEARCH_TASK } = type;

const handleSearchTask = (pid,name,page,pageSize) => dispatch => {

console.log('handleSearchTask');
    let options = {
        method: 'GET',//get请求
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    // const url = `http://100.81.136.44:8080/projects/${pid}/missions/query/${name}?page=${page}&pageSize=${pageSize}`;
    const url = ` /searchtask/${pid}/${name}?page=${page}&pageSize=${pageSize}`;
    console.log('searchtask');

    fetch(url,options)
        .then(res => res.json())
        .then(res => {
            console.log('search',res)
            if (res && res.status === 0) {
                const dataList = res.data.valueList;
                dataList.map((item,index) => {
                    item.key = index;
                })
                dispatch({
                    type: 'SEARCH_TASK',
                    payload: {
                        searchItem: dataList
                    }
                })
            }
        }).catch(err => {
        console.log(err);
    })
}

export { handleSearchTask }