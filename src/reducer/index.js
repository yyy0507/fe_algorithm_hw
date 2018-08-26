//reducer.js

import type from '../constant/type.js';

const {
    HANDLE_STATUS,
    FETCH_TASK,
    ADD_FLUME,
    ADD_FEATURE,
    MODIFY_TASK,
    SHOW_MODAL,
    HIDE_MODAL,
    SHOW_USER_MODAL,
    HIDE_USER_MODAL,
    DELETE_TASK_ITEM,
    HANDLE_CHANGE_PAGE,
    HANDLE_TASK_DETAIL,
    FETCH_PROJECT,
    HANDLE_PROJECT_DETAIL,
    SEARCH_TASK,
    HANDLE_TAB,
    SEARCH_PROJECT,
    USER_LOGIN,
    HANDLE_TYPE_CHANGE,
    HANDLE_CHANGE_CONFIG,
    HANDLE_CHANGE_DBSPACE
} = type;

import {dataTask, dataFeature} from '../constant'

const initialState = {
    dataTask,
    dataFeature,
    test: '',
    taskList: [],
    showModal: false,
    taskDetail: [],
    showUser: false,
    projectId: '',
    page: 1,
    statusList: []
}

const activeReducer = (state = initialState, action) => {
    const {type, payload} = action;
    const {
        taskList, addShow, taskDetail, showUser, page, nextPage, totalPage, taskId,projectList,
        projectDetail,projectId,searchItem,totalProject,searchProject,missiontype,itemlist,
        dbtypeAndconfig,dbspace,dbtable
    } = payload || {};
    switch (type) {
        case SHOW_USER_MODAL:
            return {
                ...state,
                showUser
            };
        case HIDE_USER_MODAL:
            return {
                ...state,
                showUser
            };
        case SHOW_MODAL:
            return {
                ...state,
                showModal: addShow
            };
        case HIDE_MODAL:
            return {
                ...state,
                showModal: addShow
            };
        case FETCH_TASK:
            return {
                ...state,
                taskList,
                totalPage
            };
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
                // taskList: taskList
            };
        case DELETE_TASK_ITEM:
            return {
                ...state,
            };
        case HANDLE_CHANGE_PAGE:
            return {
                ...state,
                page,
                taskList: nextPage,
                projectList: nextPage
            };
        case HANDLE_TASK_DETAIL:
            return {
                ...state,
                taskDetail,
                taskId,
                missiontype
            };
        case FETCH_PROJECT:
            return {
                ...state,
                projectList,
                totalProject
            };
        case HANDLE_PROJECT_DETAIL:
            return{
                ...state,
                projectDetail,
                projectId
            };
        case SEARCH_TASK:
            return {
                ...state,
                searchItem
            };
        case HANDLE_TAB:
            const dbtype = Object.keys(dbtypeAndconfig);
            return {
                ...state,
                dbtypeAndconfig,
                dbtype
            };
        case SEARCH_PROJECT:
            return {
                ...state,
                searchProject
            };
        case HANDLE_TYPE_CHANGE:
            return {
                ...state,
                itemlist
            };
        case HANDLE_CHANGE_CONFIG:
            return {
                ...state,
                dbspace
            }
        case HANDLE_CHANGE_DBSPACE:
            return {
                ...state,
                dbtable
            }
        default :
            return state;
    }

}
export default activeReducer







