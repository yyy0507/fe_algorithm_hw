import type from '../constant/type.js';

const { FETCH_TASK  } = type;

const handleFetchTask = (u, p, s, id) => dispatch => {
    const url = `${u}?page=${p}&pageSize=${s}&projectId=${id}`;
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