/**
 * Created by Rajesh on 10/16/17.
 */

import React, { Component } from 'react';
import Topbar from './components/Topbar';

export default class Layout extends Component {

    constructor(){
        super();
    }

    render(){
        return(
            <div className="full-height">
                <Topbar currentPath = {this.props.location.pathname}/>
                <div className="main-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

