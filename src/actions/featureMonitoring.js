
import type from '../constant/type.js';

const { HANDLE_TAB } = type;

//点击tab切换
const handleTab = (v) => dispatch => {
    if (v == 2) {
        console.log('handleTab');
        const url = `/test`;  //地址要换
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
                            featureInit: res.data
                        }
                    })
                }
            }).catch(err => {
            console.log(err);
        })

    }
};



export {
    handleTab
}