import React, {Component} from 'react';

import { Pagination } from 'antd';
import {connect} from "react-redux";
import {handleFetchTask} from '../../actions/fetchTask'

class Pag extends Component {
    constructor(props){
        super(props);
    };

    handleChangePag = (page,pageSize) => {
        const { handleFetchTask } = this.props;
        console.log('11',page)
        handleFetchTask(page, pageSize)
    }
    render() {
        return (
            <Pagination
                className='pagination'
                defaultCurrent={1}
                total={50}
                pageSize={10}
                onChange={(page,pageSize) => this.handleChangePag(page,pageSize)}
            />
        );
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = {
    handleFetchTask
};


Pag = connect(mapStateToProps, mapDispatchToProps)(Pag)

export default Pag


