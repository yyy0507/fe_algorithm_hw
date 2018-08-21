//reducer.js

import type from '../constant/type.js';

const {  HANDLE_STATUS,  FETCH_FLUME, FETCH_TASK } = type;

import {dataTask, dataFeature} from '../constant'

const initialState = {
    dataTask,
    dataFeature,
    test: [],
    taskList:[]
}

const activeReducer = (state = initialState, action) => {
    const {type, payload} = action;
    const { flumeList, taskList } = payload || {};
    switch (type) {

        case HANDLE_STATUS:
            return {
                ...state
            };
        case FETCH_FLUME:
            return {
                ...state,
                test: flumeList
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







