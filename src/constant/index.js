
const dataTask = [{
    key: '1',
    name: '国际券购买',
    desc: '监控每天国际券的购买率',
    type: '特征监控',
    link: 'http://www.baidu.com',
    status: 1
}, {
    key: '2',
    name: '机票价格导入',
    desc: '机票价格数据导入HDFS',
    type: 'Flume监控',
    link: 'http://www.baidu.com',
    status: 0

}, {
    key: '3',
    name: '机票价格导入',
    desc: '机票价格数据导入HDFS',
    type: 'Flume监控',
    link: 'http://www.baidu.com',
    status: 0
},{
    key: '4',
    name: '国际券购买',
    desc: '监控每天国际券的购买率',
    type: '特征监控',
    link: 'http://www.baidu.com',
    status: 1
}];


const dataFeature = [{
    key: '1',
    name: 'price',
    type: '连续',
    jiankongitem: '平均值',
    otherConfig: '{}'
}];


export { dataTask, dataFeature };