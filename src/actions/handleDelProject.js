import type from '../constant/type.js';

const { DELETE_PROJECT_ITEM , FETCH_PROJECT } = type;



//删除一项工程
const handleDelProject = (pid) => (dispatch) => {

    // const url = `projects/${pid}/missions/${mid}`;
    const url = `/delProject/${pid}`;
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
                        console.log('featch dele project')
                        if (res && res.status === 0) {
                            const dataList = res.data.valueList;
                            dataList.map((item,index) => {
                                item.key = index;
                            })
                            dispatch({
                                type: FETCH_PROJECT,
                                payload: {
                                    projectList: dataList,
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


export { handleDelProject }