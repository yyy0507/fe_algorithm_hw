import type from '../constant/type.js';

const { FETCH_TASK } = type;

const handleFetchTask = ( pid,page,pageSize ) => dispatch => {
    // const url = `http://100.81.136.44:8080/projects/${pid}/missions?page=${page}&pageSize=${pageSize}`;
    const url = `/data?page=${page}&pageSize=${pageSize}`
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

export { handleFetchTask }