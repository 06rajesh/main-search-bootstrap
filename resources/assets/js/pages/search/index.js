/**
 * Created by Rajesh on 10/17/17.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import {convertNumberToBengali, numberWithCommas} from '../../libs/common';

import {Segment} from '../../components/Utilites';
import InfoBox from '../../components/Infobox';
import Footer from '../../components/Footer';
import KnowledgeGraph from './knowledge-graph';
import Pagination from './pagination';
import Results from './results';

import {history} from '../../store';

class Search extends Component{
    constructor(props){
        super(props);
        this.renderTotalResult = this.renderTotalResult.bind(this);
        this.renderPagination = this.renderPagination.bind(this);
        this.updatePagination = this.updatePagination.bind(this);
    }

    renderTotalResult(){
        let {fetched, total, queryTime} = this.props;

        if(fetched){
            if(total && total > 0){
                return(
                    <Col sm={12}>
                        <p style={{color: '#949494', marginBottom: '25px'}}>
                            সর্বমোট {convertNumberToBengali(numberWithCommas(this.props.total))} টি ফলাফল পাওয়া গিয়েছে (সময়: {convertNumberToBengali(queryTime/1000)} সেকেন্ড)
                        </p>
                    </Col>
                );
            }else{
                return(
                    <Col sm={12}>
                        <p style={{color: '#949494', marginBottom: '25px'}}> কোন ফলাফল পাওয়া যায়নি। (সময়: {convertNumberToBengali(queryTime/1000)} সেকেন্ড)</p>
                    </Col>
                );
            }
        }
    }

    updatePagination(value){
        history.push("/search?q=" + this.props.query + "&p=" + value);
    }

    renderPagination(){
        let page = this.props.page ? this.props.page: 1;
        let {total, fetched, browser} = this.props;

        if(fetched && total > 20){
            return (
                <Pagination total={total} page={Number(page)} onClick={this.updatePagination} onMobile={browser.lessThan.medium}/>
            );
        }
    }

    render(){
        return(
            <div className="result-page page">
                <Segment basic>
                    <Row className="flexify remove-flex-sm">
                        <Col md={12} xsHidden smHidden style={{ 'flex': '0 0 150px'}}/>
                        <Col md={12} style={{ 'flex': '1'}}>
                            <Row style={{ 'maxWidth': '1150px'}}>
                                {this.renderTotalResult()}
                                <Col sm={12} mdPush={7} md={5}>
                                    <InfoBox/>
                                    <KnowledgeGraph/>
                                </Col>
                                <Col sm={12} mdPull={5} md={7}>
                                    <Results error={this.props.error} fetching = {this.props.fetching} fetched={this.props.fetched}
                                             query={this.props.query} total={this.props.total} results={this.props.results} />
                                    {this.renderPagination()}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Segment>
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        query: store.results.query,
        total: store.results.total,
        page: store.results.page,
        queryTime: store.results.queryTime,
        results: store.results.results,
        fetched: store.results.fetched,
        fetching: store.results.fetching,
        error: store.results.error,
        browser: store.browser
    };
}

export default connect(mapStateToProps)(Search);
