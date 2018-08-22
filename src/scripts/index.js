import React from 'react'
import ReactDOM from 'react-dom'

import Home from './components/home'
import Task from './components/task'
import Project from './components/project'
import Navigation from './components/navigation'
import Permission from './components/permission'
import User from './components/user'

import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';


import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import activeReducer from '../reducer'
import thunk from 'redux-thunk'

const store = createStore(activeReducer, applyMiddleware(thunk))

class App extends React.Component {
    render() {
        return (
            <Router>
                <Provider store={store}>
                    <div>
                        <Navigation/>
                        <hr/>
                        {/*<Route exact path="/" component={Home}/>*/}
                        <Route exact path="/" component={Project}/>
                        <Route path='/project/:projectname' component={Task}/>
                        <Route path="/permission" component={Permission}/>
                        <Route path="/user" component={User}/>
                    </div>
                </Provider>
            </Router>
        )
    }
}

ReactDOM.render(
    <App name="Ykit-Starter-Antd"/>, document.getElementById('app')
);

