
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {Router, Route, IndexRoute} from 'react-router';

import store, {history} from './store';

import Layout from './layout';
import Home from './pages/home';
import Search from './pages/search';
import Single from './pages/single';
import Feedback from './pages/feedback';
import {fetchResults} from './actions/searchActions';

let pageData = store.getState().pages.items;

history.listen(location => {
    if(Object.keys(location.query).length > 0){
        let p = location.query.p ? location.query.p : 1;
        window.scrollTo(0, 0);
        store.dispatch(fetchResults(location.query.q, p));
    }
});

checkIfReloaded();

function checkIfReloaded() {
    let HugeObj = store.getState();
    if(HugeObj.results.query.length == 0){
        let location = HugeObj.routing.locationBeforeTransitions;
        if(location.query.q != HugeObj.results.query){
            let p = location.query.p ? location.query.p : 1;
            window.scrollTo(0, 0);
            store.dispatch(fetchResults(location.query.q, p));
        }
    }
}

render(
    <Provider store = {store}>
        <Router history={history}>
            <Route path="/" component={Layout} >
                <IndexRoute component={Home}/>
                <Route path='home' component={Home}/>
                <Route path='search' component={Search}/>
                {
                    pageData.map((item, index) => {
                        return(
                            <Route key ={index} path={item.url} component={() => <Single title={item.title} subtitle={item.subtitle} image={item.image} content={item.content}/>}/>
                        );
                    })
                }
                <Route path='feedback' component={Feedback}/>
                <Route path='*' exact={true} component={() => <Single title="404 Error" subtitle="Sorry, The page you requested, Not Found" content="<h5 class='text-center'>Thanks For Using Pipilika</h5>"/>} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('pipilika')
);
