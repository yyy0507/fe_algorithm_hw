import React, {Component} from 'react';

import { Pagination } from 'antd';
import {connect} from "react-redux";
import {handleFetchTask} from '../../actions/fetchTask';
import {handleChangePage} from '../../actions'

class Pag extends Component {
    constructor(props){
        super(props);
    };

    render() {
        const {url,handleChangePage,page,totalCount} = this.props;
        // console.log(this.props);
        return (
            <Pagination
                className='pagination'
                //defaultCurrent={1}
                total={totalCount}
                onChange={(page,pageSize) => handleChangePage(url,page,pageSize)}
            />

        );
    }
}
const mapStateToProps = (state) => {
    return {
        projectId: state.projectId,
        page: state.page
    }
}
const mapDispatchToProps = {
    handleFetchTask,
    handleChangePage
};


Pag = connect(mapStateToProps, mapDispatchToProps)(Pag)

export default Pag


