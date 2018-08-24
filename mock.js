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
        pattern: /\/searchtask\/(\d+)\/([\u4e00-\u9fa5_a-zA-Z0-9]+)\?page=(\d+)\&pageSize=(\d+)/,
        responder: 'http://100.81.136.44:8080/projects/$1/missions/query/$2?page=$3&pageSize=$4'
    },
    {
        pattern: /\/modifytask\/(\d+)\/(\d+)/,
        responder: 'http://100.81.136.44:8080/projects/$1/missions/$2'
    },
    {
        pattern: /\/dataProject\?page=(\d+)\&pageSize=(\d+)/,
        responder: 'http://100.81.136.44:8080/projects/111/missions?page=$2&pageSize=$3'
    },
    {
        pattern: /\/delProject\/(\d+)/,
        responder: 'http://100.81.136.44:8080/projects/124/missions/$1'
    }


];
