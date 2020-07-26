import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/App/App';
import * as serviceWorker from './serviceWorker';

import Content from './App/component/Content/Content'
import ContentView from './App/component/Content-View/ContentView.component'
import Services from './App/component/service/Services'

import {
    Route,
    BrowserRouter as Router
} from 'react-router-dom'


const routing = (
    <Router>

        <div>
            <Route exact path='/' component={App}></Route>
            <Route exact path='/search/:slug' component={Content}></Route>
            <Route exact path="/view/:id" component={ContentView} ></Route>
            <Route exact path="/services" component={Services} ></Route>
        </div>

    </Router>
)





ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();