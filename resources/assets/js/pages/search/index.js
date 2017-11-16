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
                    <Row className="flexify">
                        <Col md={12} style={{ 'flex': '0 0 150px'}}/>
                        <Col xs={12} style={{ 'flex': '1'}}>
                            <Row className="flexify">
                                <Col xs={6} style={{ 'flex': '0 0 750px'}}>
                                    <Results error={this.props.error} fetched={this.props.fetched} results={this.props.results} />
                                </Col>
                                <Col xs={6} style={{ 'flex': '1', 'maxWidth' : '450px'}}>
                                    <InfoBox/>
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
        error: store.results.error
    };
}

export default connect(mapStateToProps)(Search);
