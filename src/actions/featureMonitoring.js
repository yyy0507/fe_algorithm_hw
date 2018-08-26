//特征监控
import type from '../constant/type.js';

const {
    HANDLE_TAB,
    HANDLE_CHANGE_CONFIG,
    HANDLE_CHANGE_DBSPACE,
    HANDLE_ADD_FIELD
} = type;

//点击tab切换
const handleTab = (v) => dispatch => {
    if (v == 2) {
        console.log('handleTab');
        const url = `/monitorinit`;  //点击特征监控发起请求，获取库类型和服务器的配置
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
                if (res && res.status === 0) {
                    dispatch({
                        type: 'HANDLE_TAB',
                        payload: {
                            dbtypeAndconfig: res.data
                        }
                    })
                } else {
                    alert(res.message)
                }
            }).catch(err => {
            console.log(err);
        })

    }
};

const handleChangeConfig = (v) => dispatch => {
    console.log('handleChangeConfig',v);
    const url = `/test`;  //点击服务器配置发起的请求
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
            if (res && res.status === 0) {
                dispatch({
                    type: 'HANDLE_CHANGE_CONFIG',
                    payload: {
                        dbspace: res.data
                    }
                })
            } else {
                alert(res.message)
            }
        }).catch(err => {
        console.log(err);
    })
};

const handleChangedbspace = (v) => dispatch => {
    console.log('handleChangedbspace');
    const url = `/test`;  //点击库名发起的请求
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
            if (res && res.status === 0) {
                dispatch({
                    type: 'HANDLE_CHANGE_DBSPACE',
                    payload: {
                        dbtable: res.data
                    }
                })
            } else {
                alert(res.message)
            }
        }).catch(err => {
        console.log(err);
    })
};

const handleAddfield = () => dispatch => {
    console.log('handleAddfield');
    const url = `/loadMonitorItem`;  //点击库名发起的请求
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
            if (res && res.status === 0) {
                dispatch({
                    type: 'HANDLE_ADD_FIELD',
                    payload: {
                        field: res.data.valueList,
                        fieldname: res.data.fieldname
                    }
                })
            } else {
                alert(res.message)
            }
        }).catch(err => {
        console.log(err);
    })
};
export {
    handleTab,
    handleChangeConfig,
    handleChangedbspace,
    handleAddfield
}