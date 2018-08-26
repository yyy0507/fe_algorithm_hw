export default {
    HANDLE_STATUS: 'HANDLE_STATUS', // 修改状态
    FETCH_TASK: 'FETCH_TASK',  //访问任务接口
    MODIFY_TASK: 'MODIFY_TASK', //修改任务
    SHOW_MODAL: 'SHOW_MODAL',  //显示弹窗
    HIDE_MODAL: 'HIDE_MODAL',  // 隐藏弹窗
    SHOW_USER_MODAL: 'SHOW_USER_MODAL', //显示用户配置
    HIDE_USER_MODAL: 'HIDE_USER_MODAL',  //隐藏用户配置
    DELETE_TASK_ITEM: 'DELETE_TASK_ITEM', //删除某一项任务
    ADD_FEATURE: 'ADD_FEATURE', //添加一个特征监控
    HANDLE_CHANGE_PAGE: 'HANDLE_CHANGE_PAGE',  //点击下一页
    ADD_FLUME: 'ADD_FLUME',  //增加一个flume的监控
    HANDLE_TASK_DETAIL: 'HANDLE_TASK_DETAIL',  //点击任务，查询任务详情，回填任务表单进行修改
    ADD_PROJECT: 'ADD_PROJECT', //新加工程
    FETCH_PROJECT: 'FETCH_PROJECT', //访问工程
    HANDLE_SEARCH_TASK: 'HANDLE_SEARCH_TASK', //搜索任务
    HANDLE_PROJECT_DETAIL: 'HANDLE_PROJECT_DETAIL',//工程详情
    SEARCH_TASK: 'SEARCH_TASK',//搜索任务
    HANDLE_TAB: 'HANDLE_TAB', // tab切换
    SEARCH_PROJECT: 'SEARCH_PROJECT', // 搜索工程
    USER_LOGIN:'USER_LOGIN', //用户登陆
    HANDLE_TYPE_CHANGE: 'HANDLE_TYPE_CHANGE', //点击字段类型切换
    // START_TASK: 'START_TASK', //启动任务
    // STOP_TASK: 'STOP_TASK', //停止任务
    HANDLE_CHANGE_CONFIG: 'HANDLE_CHANGE_CONFIG',// 点击服务器配置
    HANDLE_CHANGE_DBSPACE: 'HANDLE_CHANGE_DBSPACE',// 点击库名
}