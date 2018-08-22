import type from '../constant/type.js';

const { FETCH_FLUME  } = type;

//提交flume表单
const handleFlumeSubmit = (v) => dispatch => {
    console.log('fetchflume7',v)
    // dispatch({
    //     type: 'FETCH_FLUME',
    //     payload: {
    //         flumeList: v
    //     }
    // })
    let data = 'missionType=0&missionName='+ v.missionName + '&description='
        +v.description+'&watcherLink='+v.watcherLink
        +'&configuration='+'{"url":"'+v.url+'","monitorItems":"'+ v.monitorItems+'","alarmItems":"'+ v.alarmItems+'"}'
    let options = {
        method: 'POST',//post请求
        // mode: "no-cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data

    }
    const url = `http://100.81.136.44:8080/mission/flumeMonitor`;
    fetch(url,options)
        .then(res =>
            {
                // console.log('L59',res.text())
                // console.log(res.json());
                return res.json()
            }
        )
        .then(res => {
            console.log('L64', res)
            if (res && res.status === 0) {

                // dispatch({
                //     type: 'FETCH_FLUME',
                //     payload: {
                //         flumeList: res.data
                //     }
                // })
            }
        })
        .catch(err => {
            console.log(err)
        })
}


export { handleFlumeSubmit }