import type from '../constant/type.js';

const { MODIFY_TASK  } = type;

const handleModifyTask = (id) => dispatch => {
    const url = `xxxx?taskId=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(res => {
            if (res && res.status === 0) {
                dispatch({
                    type: MODIFY_TASK,
                    payload: {
                        taskDetail: res.data
                    }
                })
            }
        }).catch(err => {
        console.log(err);
    })
}

export { handleModifyTask }