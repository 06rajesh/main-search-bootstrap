/**
 * Created by talha on 11/5/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {decode} from 'html-encoder-decoder';
import { connect } from 'react-redux';
import jquery from 'jquery';
window.$ = window.jQuery = jquery;
import {Jumbotron, Col, Row, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import {CollapsablePanel} from './Utilites';

import {ParseHtmlTable} from '../libs/common';
import {nazrulInfo, banglaInfo} from './infoHtml';

class Infobox extends Component{

    constructor(props){
        super(props);
        this.tempString = banglaInfo;
        this.state = {
            info :''
        };
    }

    componentDidMount(){
        let data = ParseHtmlTable(this.tempString);
        this.setState({info: data});
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
        return(
            <Jumbotron className="info-box">
                <InfoBoxImage info={this.state.info}/>
                <div className="jumbotron-contents">
                    {this.renderSecondary(this.state.info)}
                    {this.renderAttributes(this.state.info)}
                </div>
            </Jumbotron>
            // <Jumbotron className="info-box" dangerouslySetInnerHTML={{__html: decode(banglaInfo)}}/>
        );
    }
}

function mapStateToProps(store) {
    return {
        browser: store.browser
    };
}

class InfoBoxImage extends Component{
    constructor(props){
        super(props);
        this.state = {
            fontSize: 35
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
        return (this.refs.titleText.scrollWidth > this.refs.titleContainer.clientWidth - 2*padding);
    }

    render(){
        let info = this.props.info;

        if(info.image){
            return(
                <div className="jumbotron-photo table-container" >
                    <Row className = 'table-row'>
                        <Col xs={7} className="no-padd table-col" style={{'verticalAlign': 'middle'}}>
                            <img src={info.image.src} alt={info.image.alt}/>
                        </Col>
                        <Col xs={5} className="no-padd table-col grass">
                            <div className="title-cont" id="title-container" ref="titleContainer">
                                <div className="title" id="title" ref="titleText" style={{'fontSize' : this.state.fontSize + 'px'}}>{info.title}</div>
                                <div className="caption">{info.image.caption}</div>
                            </div>
                        </Col>
                    </Row>
                </div>
            );
        }else if(info.title){
            return(
                <div className="jumbotron-photo">
                    <div className="title-cont" id="title-container">
                        <div className="title" id="title" ref="imeInput" style={{'fontSize' : this.state.fontSize + 'px'}}>{info.title}</div>
                    </div>
                </div>
            );
        }else{
            return(
                <div className="jumbotron-photo">
                    <div className="title-cont" id="title-container">
                        <div className="title" id="title" ref="imeInput" style={{'fontSize' : this.state.fontSize + 'px'}}>Loading</div>
                    </div>
                </div>
            );
        }
    }
}

export default connect(mapStateToProps)(Infobox);