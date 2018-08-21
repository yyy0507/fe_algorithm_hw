import React from 'react'
import ReactDOM from 'react-dom'

import Home from './components/home'
import Task from './components/task'
import Project from './components/project'
import Navigation from './components/navigation'
import Permission from './components/permission'
import User from './components/user'

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';


import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import activeReducer from '../reducer'
import thunk from 'redux-thunk'

const store = createStore(activeReducer, applyMiddleware(thunk))

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Task/>
                </div>
            </Provider>
        )
    }
}

ReactDOM.render(
    <App name="Ykit-Starter-Antd"/>, document.getElementById('app')
);

