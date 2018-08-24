//搜索工程

import type from '../constant/type.js';

const { SEARCH_PROJECT } = type;

const handleSearchProject = (name,page,pageSize) => dispatch => {

    console.log('handleSearchProject');
    let options = {
        method: 'GET',//get请求
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    // const url = `http://100.81.136.44:8080/projects/${pid}/missions/query/${name}?page=${page}&pageSize=${pageSize}`;
    const url = `/searchProject/${name}?page=${page}&pageSize=${pageSize}`;

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
                    type: 'SEARCH_PROJECT',
                    payload: {
                        searchProject: dataList
                    }
                })
            } else {
                alert ('搜索工程失败');
            }
        }).catch(err => {
        console.log(err);
    })
}

export { handleSearchProject }