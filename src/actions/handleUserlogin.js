import type from '../constant/type.js';

const { USER_LOGIN } = type;

const handleUserLogin = (v) => dispatch => {
    console.log('handleUserLogin',v);
    const url = `ddd`; //添加工程的url

    const jsontest = {operatorApiKey: v.operatorApiKey};
    const data = JSON.stringify(jsontest);

    console.log('handleUserLogin',data);
    let options = {
        method: 'POST',//post请求
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    }
    fetch(url, options)
        .then(res => res.json())
        .then(res => {
            if (res && res.status === 0) {
                dispatch({
                    type: USER_LOGIN,
                    payload: {

                    }
                })
            } else if (res && res.status === -1){
                alert(res.message);
            }
        }).catch(err => {
        console.log(err);
    })
}

export { handleUserLogin }