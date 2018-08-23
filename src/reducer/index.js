//reducer.js

import type from '../constant/type.js';

const { HANDLE_STATUS, FETCH_TASK,ADD_FLUME, MODIFY_TASK,
    SHOW_MODAL,HIDE_MODAL,SHOW_USER_MODAL,HIDE_USER_MODAL,DELETE_TASK_ITEM,HANDLE_CHANGE_PAGE,
    HANDLE_TASK_DETAIL } = type;

import {dataTask, dataFeature} from '../constant'

const initialState = {
    dataTask,
    dataFeature,
    test: '',
    taskList:[],
    showModal: false,
    taskDetail: [],
    showUser: false,
    projectId: '',
    page: 1
}

const activeReducer = (state = initialState, action) => {
    const {type, payload} = action;
    const { flumeList, taskList, addShow, taskDetail ,showUser, delKey , page, nextPage ,totalPage,taskId} = payload || {};
    switch (type) {
        case SHOW_USER_MODAL:
            return{
                ...state,
                showUser
            }
        case HIDE_USER_MODAL:
            return {
                ...state,
                showUser
            }
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
        case FETCH_TASK:
            return {
                ...state,
                taskList: taskList,
                totalPage
            }
        case MODIFY_TASK:
            return {
                ...state
            }
        case HANDLE_STATUS:
            return {
                ...state
            };
        case ADD_FLUME:
            return {
                ...state,
                taskList: taskList
            }
        case DELETE_TASK_ITEM:
            return {
                ...state,
            }
        case HANDLE_CHANGE_PAGE:
            return{
                ...state,
                page,
                taskList: nextPage
            }
        case HANDLE_TASK_DETAIL:
            return {
                ...state,
                taskDetail,
                taskId
            }
        default :
            return state;
    }

}
export default activeReducer







