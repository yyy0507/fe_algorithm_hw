//reducer.js

import type from '../constant/type.js';

const { ADD_TASK, HANDLE_STATUS, HANDLE_DEL_TASK, HANDLE_CANCEL, HANDLE_OK } = type;

import {dataTask, dataFeature} from '../constant'

const initialState = {
    taskModalShow: false,
    dataTask,
    taskKey: '',
    dataFeature
}

const activeReducer = (state = initialState, action) => {
    const {type, payload} = action;
    const { addShow, taskKey } = payload || {};
    switch (type) {
        case ADD_TASK:
            return {
                ...state,
                taskModalShow: !state.taskModalShow
            };
        case HANDLE_STATUS:
            return {
                ...state
            };
        case HANDLE_DEL_TASK:
            return {
                ...state,
                dataTask: dataTask.filter(item => item.key !== taskKey),
                taskKey: taskKey
            }
        case HANDLE_CANCEL:
            return {
                ...state,
                taskModalShow: false
            }
        case HANDLE_OK:
            return {
                ...state,
                taskModalShow: false
            }
        default :
            return state;
    }

}
export default activeReducer







