
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
import {fetchResults} from './actions/searchActions';

history.listen(location => {
    if(Object.keys(location.query).length > 0){
        store.dispatch(fetchResults(location.query.q));
    }
});

render(
    <Provider store = {store}>
        <Router history={history}>
            <Route path="/" component={Layout} >
                <IndexRoute component={Home}/>
                <Route path={"home"} component={Home}/>
                <Route path={"search"} component={Search}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('example')
);
