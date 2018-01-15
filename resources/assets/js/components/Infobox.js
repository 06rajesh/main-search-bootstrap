/**
 * Created by talha on 11/5/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import {decode} from 'html-encoder-decoder';
import { connect } from 'react-redux';
import jquery from 'jquery';
window.$ = window.jQuery = jquery;
import {Jumbotron, Col, Row, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import {CollapsablePanel} from './Utilites';

import {ParseHtmlTable} from '../libs/common';
import {fetchInfobox} from '../actions/infoboxActions';
import {Fade} from './Animations';
import {Loader} from './Utilites';

class InfoBoxImage extends Component{
    constructor(props){
        super(props);
        this.state = {
            fontSize: 25
        };

        this.updated = false;
    }

    componentDidUpdate(){
        if(!this.updated && this.shouldUpdateFontSize()){
            this.decreaseFontSize();
            this.updated = true;
        }
    }

    decreaseFontSize(){
        let newFontSize = parseInt(this.state.fontSize) - 1;
        this.setState({
            fontSize: newFontSize
        }, () => {
            if(this.shouldUpdateFontSize()){
                setTimeout(this.decreaseFontSize(), 10);
            }
        });
    }

    shouldUpdateFontSize(){
        let padding = 10;
        if(this.refs.titleText && this.refs.titleContainer)
            return (this.refs.titleText.scrollWidth > this.refs.titleContainer.clientWidth - 2*padding);
        else
            return false;
    }

    render(){
        let {info} = this.props;
        let title = this.props.title ? this.props.title : info.title;

        if(info.image){
            return(
                <div className="jumbotron-photo table-container" >
                    <Row className = 'table-row'>
                        <Col xs={7} className="no-padd table-col" style={{'verticalAlign': 'middle'}}>
                            <a href={this.props.url} target="_blank">
                                <img src={info.image.src} alt={info.image.alt}/>
                            </a>
                        </Col>
                        <Col xs={5} className="no-padd table-col grass">
                            <div className="title-cont" id="title-container" ref="titleContainer">
                                <a href={this.props.url} target="_blank">
                                    <div className="title" id="title" ref="titleText" style={{'fontSize' : this.state.fontSize + 'px'}}>{title}</div>
                                </a>
                                {/*<div className="caption">{info.image.caption}</div>*/}
                            </div>
                        </Col>
                    </Row>
                </div>
            );
        }else if(info.title){
            return(
                <div className="jumbotron-photo" style={{minHeight: '70px'}}>
                    <div className="title-cont" id="title-container">
                        <a href={this.props.url} target="_blank">
                            <div className="title" id="title" ref="imeInput" style={{'fontSize' : this.state.fontSize + 'px'}}>{title}</div>
                        </a>
                    </div>
                </div>
            );
        }
    }
}

class Infobox extends Component{

    constructor(props){
        super(props);
        this.state = {
            query: '',
            info : {},
            infoReady: false
        };

        this.fetchInfoBox = this.fetchInfoBox.bind(this);
    }

    componentDidMount(){
        if(this.props.infoBox.query != this.props.query){
            this.fetchInfoBox(this.props.query);
        }
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.query && nextProps.query != this.state.query){
            this.fetchInfoBox(nextProps.query);
        }

        if(nextProps.infoBox.results){
            let data = ParseHtmlTable(nextProps.infoBox.results);
            this.setState({
                    info: data
                }, () => {
                this.setState({
                    infoReady: true
                });
            });
        }
    }

    fetchInfoBox(query){
        this.props.getInfoBox(query);
        this.setState({
            query: query,
            info: {},
            infoReady: false
        });
    }

    renderSecondary(info){

        let iterSecondaryItem = (secondary) => {
            return secondary.map((item, index) => {
                if(item && typeof item === 'string'){
                    let htmlCode;

                    try{
                        htmlCode = decode(item);
                    }catch(e){
                        htmlCode = item;
                    }

                    return(
                        <ListGroupItem key={index}><div className="panel-title" dangerouslySetInnerHTML={{__html: htmlCode}}/></ListGroupItem>
                    );
                }
            })
        };

        if(info.secondary && info.secondary.length > 0){
            return(
                <ListGroup>
                    {iterSecondaryItem(info.secondary)}
                </ListGroup>
            );
        }
    }

    renderPrimary(attribute){
        if(attribute){
            return Object.keys(attribute)
                .filter((item) => {
                    if(item !== 'title') return item;
                })
                .map((item, index) => {
                    if(Number(item) || item == '0'){
                        return(
                            <Row key={index} style={{'textAlign' : 'center'}}>
                                <Col xs={12} dangerouslySetInnerHTML={{__html: decode(attribute[item])}}/>
                            </Row>
                        );
                    }
                    return(
                        <Row key={index}>
                            <Col xs={3} style={{'fontWeight':'bold'}}>{item}:</Col>
                            <Col xs={9} dangerouslySetInnerHTML={{__html: decode(attribute[item])}}/>
                        </Row>
                    );
                });
        }
    }

    renderAttributes(info){
        let expandOnRes = !this.props.browser.lessThan.large;

        let getTitle = (attr) => {
            if(attr['title']) return attr['title'];
            else if(!expandOnRes && Object.keys(attr).length > 0) return ' আরও দেখুন';
            return '';
        };

        if(info.attributes){
            return info.attributes.map((attr, index) => {
                if(index == 0){
                    return(
                        <Panel key = {index} bsStyle="success">
                            {this.renderPrimary(attr)}
                        </Panel>
                    );
                }
                return(
                    <CollapsablePanel key = {index} header={getTitle(attr)} className={(attr['title'])? '' : 'no-top-margin'} bsStyle="success" expanded={!(getTitle(attr).length > 1)}>
                        {this.renderPrimary(attr)}
                    </CollapsablePanel>
                );
            });
        }
    }

    render(){
        if(Object.keys(this.state.info).length > 0){
            return(
                <Fade in={this.state.infoReady}>
                    <Jumbotron className="info-box">
                        <InfoBoxImage info={this.state.info} title={this.props.infoBox.title} url={this.props.infoBox.url}/>
                        <div className="jumbotron-contents">
                            {this.renderSecondary(this.state.info)}
                            {this.renderAttributes(this.state.info)}
                        </div>
                    </Jumbotron>
                </Fade>
                //<Jumbotron className="info-box" dangerouslySetInnerHTML={{__html: decode(this.state.info)}}/>
            );
        }else if(this.props.infoBox.fetching){
            return(
                <Loader elementType='p' caption='ইনফো খোঁজা হচ্ছে'/>
            );
        }
        else{
            return(
                <span/>
            );
        }
    }
}

function mapStateToProps(store) {
    return {
        browser: store.browser,
        query: store.results.query,
        infoBox: store.infoBox
    };
}

function mapDispatchToProps(dispatch){
    return{
        getInfoBox: (query) => {
            dispatch(fetchInfobox(query));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Infobox);