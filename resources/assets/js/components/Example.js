import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Button, ButtonToolbar, Panel} from 'react-bootstrap';

export default class Example extends Component {
    render() {
        return (
            <div className="container full-height">
                <div className="row vertical-center">
                    <div className="col-md-8 col-md-offset-2">
                        <Panel header="Example Component" bsStyle="primary">
                            I'm an example component! <a href="#">Example Link</a>
                            <ButtonToolbar>
                                <Button bsStyle="primary">Primary button</Button>
                                <Button>Button</Button>
                            </ButtonToolbar>
                        </Panel>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
