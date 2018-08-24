import type from '../constant/type.js';

const { ADD_PROJECT } = type;

const handleAddProject = ( page, pageSize,v) => dispatch => {
    console.log('addproject',v)
    const url = `工程链接`; //添加工程的url
    let data = 'projectName='+ v.projectName + '&description='
        +v.description+'&watcherLink='+v.watcherLink;
    console.log('handleAddfeature',data);
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
                    type: ADD_PROJECT,
                    payload: {

                    }
                })
            }
        }).catch(err => {
        console.log(err);
    })
}

export { handleAddProject }