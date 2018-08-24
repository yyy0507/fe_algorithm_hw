
//请求工程列表

import type from '../constant/type.js';

const { FETCH_PROJECT } = type;

const handleFetchProject = ( page,pageSize ) => dispatch => {
    // const url = `http://100.81.136.44:8080/projects/${pid}/missions?page=${page}&pageSize=${pageSize}`;
    const url = `/dataProject?page=${page}&pageSize=${pageSize}`
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
                    type: FETCH_PROJECT,
                    payload: {
                        projectList: dataList,
                        totalProject: res.data.total
                    }
                })
            } else {
                alert('请求工程列表失败');
            }
        }).catch(err => {
        console.log(err);
    })
}

export { handleFetchProject }