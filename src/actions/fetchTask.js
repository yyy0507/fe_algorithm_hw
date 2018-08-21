import type from '../constant/type.js';

const { FETCH_TASK  } = type;

const handleFetchTask = (v,s) => dispatch => {
    const url = `http://hy.travel.qunar.com/api/poi/search?page=${v}&pagesize=${s}`;
    fetch(url)
        .then(res => res.json())
        .then(res => {
            if (res && res.status === 0) {
                dispatch({
                    type: FETCH_TASK,
                    payload: {
                        taskList: res.data
                    }
                })
            }
        }).catch(err => {
        console.log(err);
    })
}

export { handleFetchTask }