//reducer.js

import type from '../constant/type.js';

const { ADD_TASK, HANDLE_STATUS,  FETCH_FLUME, FETCH_TASK, MODIFY_TASK, SHOW_MODAL,HIDE_MODAL } = type;

import {dataTask, dataFeature} from '../constant'

const initialState = {
    dataTask,
    dataFeature,
    test: [],
    taskList:[],
    showModal: false,
    taskDetail: ''
}

const activeReducer = (state = initialState, action) => {
    const {type, payload} = action;
    const { flumeList, taskList, addShow, taskDetail } = payload || {};
    switch (type) {
        case SHOW_MODAL:
            return {
                ...state,
                showModal: addShow
            }
        case HIDE_MODAL:
            return {
                ...state,
                showModal: addShow
            }
        case MODIFY_TASK:
            return {
                ...state,
                taskDetail: taskDetail
            }
        case HANDLE_STATUS:
            return {
                ...state
            };
        case FETCH_FLUME:
            return {
                ...state,
                test: flumeList,
                dataTask: [...dataTask, flumeList]
            }
        case FETCH_TASK:
            return {
                ...state,
                taskList: taskList
            }
        default :
            return state;
    }

}
export default activeReducer







