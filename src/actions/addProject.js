//新建工程

const handleAddProject = (page, pageSize, v) => dispatch => {
    console.log('handleAddProject');
    const url = `http://100.81.137.99:8080/projects?page=${page}&pageSize=${pageSize}`; //添加工程的url

    let data = 'projectName=' + v.projectName + '&description='
        + v.description + '&watcherLink=' + v.watcherLink;
    console.log('projectdata', data);
    let options = {
        method: 'POST',//post请求
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    }
    fetch(url, options)
        .then(res => res.json())
        .then(res => {
            if (res && res.status === 0) {

            } else {
                alert(res.message);
            }
        }).catch(err => {
        console.log(err);
    })
}

export {handleAddProject}