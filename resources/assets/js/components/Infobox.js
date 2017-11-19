/**
 * Created by talha on 11/5/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import {decode} from 'html-encoder-decoder';
import jquery from 'jquery';
window.$ = window.jQuery = jquery;
import {Jumbotron, Col, Row} from 'react-bootstrap';
import {CollapsablePanel} from './Utilites';

import {ParseHtmlTable} from '../libs/common';
import {robindroInfo} from './infoHtml';

class Infobox extends Component{

    constructor(props){
        super(props);
        this.tempString = robindroInfo;
        this.state = {
            info :''
        };
    }

    componentDidMount(){
        let data = ParseHtmlTable(this.tempString);
        this.setState({ info: data}, () => console.log(this.state.info));
    }

    renderImage(info){
        if(info.image){
            return(
                <div className="jumbotron-photo table-container" >
                    <Row className = 'table-row'>
                        <Col xs={7} className="no-padd table-col" style={{'verticalAlign': 'middle'}}>
                            <img src={info.image.src} alt={info.image.alt}/>
                        </Col>
                        <Col xs={5} className="no-padd table-col grass">
                            <div className="title-cont">
                                <div className="title">{info.title}</div>
                                <div className="caption">{info.image.caption}</div>
                            </div>
                        </Col>
                    </Row>
                </div>
            );
        }else if(info.title){
            return(
                <div className="jumbotron-photo">
                    <div className="title">{info.title}</div>
                </div>
            );
        }
    }

    renderAttributes(info){
        if(info.attributes){
            return info.attributes.map((attr, index) => {
                return(
                    <CollapsablePanel key = {index} header={attr['title'] ? attr['title'] : ''} className={(attr['title'] || index == 0)? '' : 'no-top-margin'} bsStyle="success" expanded={true}>
                        {this.renderPrimary(attr)}
                    </CollapsablePanel>
                );
            });
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

    render(){
        return(
            <Jumbotron className="info-box">
                {this.renderImage(this.state.info)}
                <div className="jumbotron-contents">
                    {this.renderAttributes(this.state.info)}
                </div>
            </Jumbotron>
        );
    }
}

export default Infobox;