module.exports = [
    {
        pattern: '/test',
        responder: 'http://100.81.136.44:8080/projects/111/missions?page=1&pageSize=10'
    },
    {
        pattern: /\/data\?page=(\d+)\&pageSize=(\d+)/,
        responder: 'http://100.81.136.44:8080/projects/124/missions?page=$1&pageSize=$2'
    },
    {
        pattern: /\/modifydata\/(\d+)/,
        responder: 'http://100.81.136.44:8080/projects/124/missions/$1'
    }

];
