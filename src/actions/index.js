import type from '../constant/type.js';

const {SHOW_MODAL, HIDE_MODAL, SHOW_USER_MODAL, HIDE_USER_MODAL, HANDLE_CHANGE_PAGE, HANDLE_TASK_DETAIL, HANDLE_TAB,HANDLE_TYPE_CHANGE,START_TASK,FETCH_TASK} = type;


// 展示弹窗
const handleShowModal = () => ({
    type: 'SHOW_MODAL',
    payload: {
        addShow: true
    }
});

//隐藏弹窗
const handleHideModal = () => ({
    type: 'HIDE_MODAL',
    payload: {
        addShow: false
    }
});

//显示特征项配置的弹窗
const handleShowUser = () => ({
    type: 'SHOW_USER_MODAL',
    payload: {
        showUser: true
    }
});

//隐藏用户弹窗
const handleHideUser = () => ({
    type: 'HIDE_USER_MODAL',
    payload: {
        showUser: false
    }
});

//上下翻页
const handleChangePage = (u, page, pageSize) => dispatch => {
    // const url = `${u}?page=${page}&pageSize=${pageSize}`;

    console.log('page',page);
    const url = `${u}?page=${page}&pageSize=${pageSize}`;

    console.log('handleChangePage', url);
    let options = {
        method: 'GET',//get请求
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    fetch(url, options)
        .then(res => res.json())
        .then(res => {
            console.log('22222',res.data.valueList);
            if (res && res.status === 0) {
                const dataList = res.data.valueList;
                dataList.map((item, index) => {
                    item.key = index;
                })
                dispatch({
                    type: 'HANDLE_CHANGE_PAGE',
                    payload: {
                        page,
                        nextPage: dataList
                    }
                })
            } else {
                alert(res.message);
            }
        }).catch(err => {
        console.log(err);
    })
};

//查询任务详情
const handleTaskDetail = (pid, mid) => dispatch => {
    // const url = `projects/${pid}/missions/${mid}`
    const url = `/modifytask/${pid}/${mid}`;
    let options = {
        method: 'GET',//get请求
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    fetch(url, options)
        .then(res => res.json())
        .then(res => {
            if (res && res.status === 0) {

                dispatch({
                    type: 'HANDLE_TASK_DETAIL',
                    payload: {
                        taskDetail: res.data,
                        taskId: res.data.pkMissionId,
                        missiontype: res.data.missionType
                    }
                })
            } else {
                alert(res.message);
            }
        }).catch(err => {
        console.log(err);
    })
};

//查看工程详情//没有做呢
const handleProjectDetail = (pid, mid) => dispatch => {
    // const url = `projects/${pid}/missions/${mid}`
    const url = `/modifytask/${pid}/${mid}`;
    let options = {
        method: 'GET',//get请求
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    fetch(url, options)
        .then(res => res.json())
        .then(res => {
            if (res && res.status === 0) {
                dispatch({
                    type: 'HANDLE_PROJECT_DETAIL',
                    payload: {
                        projectDetail: res.data,
                        projectId: res.data.pkMissionId
                    }
                })
            } else {
                alert(res.message);
            }
        }).catch(err => {
        console.log(err);
    })
};



//点击字段类型，获取监控项
const handleTypeChange = (v) => dispatch => {
    console.log('handleTypeChange', v);
    const url = `/test`;  //地址要换
    let options = {
        method: 'GET',//get请求
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    fetch(url, options)
        .then(res => res.json())
        .then(res => {
            if (res && res.status === 0) {
                dispatch({
                    type: 'HANDLE_TYPE_CHANGE',
                    payload: {
                        itemlist: res.data
                    }
                })
            }
        }).catch(err => {
        console.log(err);
    })
};


//启动服务
const startTask = (pid,mid,page,pageSize) => dispatch => {
    // const url = `projects/${pid}/missions/start/${mid}`;
    const url = `/startTask/${pid}/${mid}`;
    let options = {
        method: 'GET',//get请求
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    fetch(url, options)
        .then(res => res.json())
        .then(res => {
            if (res && res.status === 0) {
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
                            alert(res.message);
                        }
                    }).catch(err => {
                    console.log(err);
                })
            } else {
                alert(res.message);
            }
        }).catch(err => {
        console.log(err);
    })
};

//停止任务

const stopTask = (pid,mid,page,pageSize) => dispatch => {
    // const url = `projects/${pid}/missions/start/${mid}`;
    const url = `/stopTask/${pid}/${mid}`;
    let options = {
        method: 'GET',//get请求
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    fetch(url, options)
        .then(res => res.json())
        .then(res => {
            if (res && res.status === 0) {
                const url = `/data/${pid}?page=${page}&pageSize=${pageSize}`;
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
                            alert(res.message);
                        }
                    }).catch(err => {
                    console.log(err);
                })
            } else {
                alert(res.message);
            }
        }).catch(err => {
        console.log(err);
    })
}

export {
    handleShowModal,
    handleHideModal,
    handleShowUser,
    handleHideUser,
    handleChangePage,
    handleTaskDetail,
    handleProjectDetail,
    handleTypeChange,
    startTask,
    stopTask
}

