module.exports = [
    {
        pattern: '/test',
        responder: 'http://100.81.136.44:8080/projects/111/missions?page=1&pageSize=10'
    },
    {
        pattern: /\/data\/(\d+)\?page=(\d+)\&pageSize=(\d+)/,
        responder: 'http://100.81.136.44:8080/projects/$1/missions?page=$2&pageSize=$3'
    },
    {
        pattern: /\/searchtask\/(\d+)\/([a-zA-Z0-9_\u4e00-\u9fa5]+)\?page=(\d+)\&pageSize=(\d+)/,
        responder: 'http://100.81.136.44:8080/projects/$1/missions/query/$2?page=$3&pageSize=$4'
    },
    {
        pattern: /\/modifytask\/(\d+)\/(\d+)/,
        responder: 'http://100.81.136.44:8080/projects/$1/missions/$2'
    },
    {
        pattern: /\/dataProject\?page=(\d+)\&pageSize=(\d+)/,
        responder: 'http://100.81.137.99:8080/projects?page=$1&pageSize=$2'
    },
    {
        pattern: /\/delProject\/(\d+)/,
        responder: 'http://100.81.137.99:8080/projects/$1'
    },
    {
        pattern: /\/searchProject\/(\w+)\?page=(\d+)\&pageSize=(\d+)/,
        responder: 'http://100.81.137.99:8080/projects/$1?page=$2&pageSize=$3'
    },
    {
        pattern: /\/startTask\/(\d+)\/(\d+)/,
        responder: 'http://100.81.136.44:8080/projects/$1/missions/start/$2'
    },
    {
        pattern: /\/stopTask\/(\d+)\/(\d+)/,
        responder: 'http://100.81.136.44:8080/projects/$1/missions/stop/$2'
    }
];
