import type from '../constant/type.js';

const { DELETE_TASK_ITEM  } = type;



//删除一项任务
const handleDelTask = (pid,mid) => (dispatch) => {


    // const url = `projects/${pid}/missions/${mid}`;
    const url = `/modifydata/${mid}`;
    let options = {
        method: 'DELETE',//get请求
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    fetch(url,options)
        .then(res => res.json())
        .then(res => {
            if (res && res.status === 0) {
                // const url = `/data?page=${page}&pageSize=${pageSize}`;
                const url = `/data?page=1&pageSize=10`
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
        }).catch(err => {
        console.log(err);
    })

}


export { handleDelTask }