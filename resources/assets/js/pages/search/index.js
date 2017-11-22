/**
 * Created by Rajesh on 10/17/17.
 */

import React, { Component } from 'react';
//import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import {Segment} from '../../components/Utilites';
import InfoBox from '../../components/Infobox';
import Results from './results';

class Search extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="result-page">
                <Segment basic>
                    <Row className="flexify remove-flex-sm">
                        <Col md={12} xsHidden smHidden style={{ 'flex': '0 0 150px'}}/>
                        <Col md={12} style={{ 'flex': '1'}}>
                            <Row style={{ 'maxWidth': '1150px'}}>
                                <Col sm={12} mdPush={8} md={4}>
                                    <InfoBox/>
                                </Col>
                                <Col sm={12} mdPull={4} md={8}>
                                    <Results error={this.props.error} fetching = {this.props.fetching} fetched={this.props.fetched} results={this.props.results} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Segment>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        query: store.results.query,
        results: store.results.results,
        fetched: store.results.fetched,
        fetching: store.results.fetching,
        error: store.results.error
    };
}

export default connect(mapStateToProps)(Search);
