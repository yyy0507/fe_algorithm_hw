import React, {Component} from 'react';


import {Layout,Input, Form} from 'antd';

const {Content} = Layout;


class Flume extends Component {
    render() {
        return (
            <div>
                <div className='flex'><span className='flexL'>任务名称</span><Input placeholder="任务名称" /></div>
                <div className='flex'><span className='flexL'>任务说明</span><Input placeholder="任务说明" /></div>
                <div className='flex'><span className='flexL'>flume监控URL</span><Input placeholder="flume监控url" /></div>
                <div className='flex'>要监控的字段</div>
                <div className='flex'>要报警的字段</div>
            </div>
        );
    }
}

export default Flume;



{/*<div>*/}
    {/*<div className='flex'><span className='flexL'>任务名称</span><Input placeholder="任务名称" /></div>*/}
    {/*<div className='flex'><span className='flexL'>任务说明</span><Input placeholder="任务说明" /></div>*/}
    {/*<div className='flex'><span className='flexL'>flume监控URL</span><Input placeholder="flume监控url" /></div>*/}
    {/*<div className='flex'>要监控的字段</div>*/}
    {/*<div className='flex'>要报警的字段</div>*/}
{/*</div>*/}