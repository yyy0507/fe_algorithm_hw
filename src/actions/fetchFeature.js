import type from '../constant/type.js';

const { FETCH_FEATURE  } = type;

//提交feature表单
const handleFeatureSubmit = (url,v) => dispatch => {

    let data = 'missionType=1&missionName='+ v.missionName + '&description='
        +v.description+'&watcherLink='+v.watcherLink
        +'&configuration='+'{"url":"'+v.url+'","monitorItems":"'+ v.monitorItems+'","alarmItems":"'+ v.alarmItems+'"}'
    console.log('sss',data);
    let options = {
        method: 'POST',//post请求
        // mode: "no-cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data

    }
    const url = `/test`;
    fetch(url,options)
        .then(res =>
            {
                return res.json()
            }
        )
        .then(res => {
            console.log('L64', res.status)
            if (res && res.status === 0) {
                dispatch({
                    type: 'FETCH_FEATURE',
                    payload: {
                        featureList: res.data
                    }
                })
            } else if ( res && res.status === 1) {
                dispatch({
                    type: 'FETCH_FEATURE_ERROR',
                    payload:{
                        featureListerror: res.message
                    }
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
}


export { handleFeatureSubmit }