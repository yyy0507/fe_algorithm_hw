
const dataTask = [{
    key: '1',
    pkMissionId: '1',
    missionName: '国际券购买',
    description: '监控每天国际券的购买率',
    missionType: 1,
    watcherLink: 'http://www.baidu.com',
    missionStatus: 1,
    url: 'http://www.baidu.com'
}, {
    key: '2',
    pkMissionId: '2',
    missionName: '机票价格导入',
    description: '机票价格数据导入HDFS',
    missionType: 0,
    watcherLink: 'http://www.baidu.com',
    missionStatus: 0

}, {
    key: '3',
    pkMissionId: '3',
    missionName: '机票价格导入',
    description: '机票价格数据导入HDFS',
    missionType: 1,
    watcherLink: 'http://www.baidu.com',
    missionStatus: 0
},{
    key: '4',
    pkMissionId: '4',
    missionName: '国际券购买',
    description: '监控每天国际券的购买率',
    missionType: 0,
    watcherLink: 'http://www.baidu.com',
    missionStatus: 1
}];


const dataFeature = [{
    key: '1',
    name: 'price',
    type: '连续',
    jiankongitem: '平均值',
    otherConfig: '{}'
}];

const ziduan = [{
    key: '1',
    label: 'EventReceivedCount',
    value:'EventReceivedCount'
},{
    key: '2',
    label: 'ChannelFillPercentage',
    value:'ChannelFillPercentage'
},{
    key: '3',
    label: 'ConnectionFailedCount',
    value:'ConnectionFailedCount'
}]
const monitoritem = [{
    key: '1',
    label: '最大值',
    value:'最大值'
},{
    key: '2',
    label: '最小值',
    value:'最小值'
}]




export { dataTask, dataFeature, ziduan,monitoritem };