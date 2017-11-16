/**
 * Created by talha on 11/5/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import {decode} from 'html-encoder-decoder';
import jquery from 'jquery';
window.$ = window.jQuery = jquery;
import {Jumbotron, Col, Row, Panel} from 'react-bootstrap';
import {CollapsablePanel} from './Utilites';

import {ParseHtmlTable} from '../libs/common';
import {banglaInfo} from './infoHtml';

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
        this.setState({ info: data}, () => console.log(this.state.info));
    }

    renderImage(info){
        if(info.image){
            return(
                <div className="jumbotron-photo">
                    <img src={info.image.src} alt={info.image.alt}/>
                    <div className="title">{info.title}</div>
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

    getPanelHeader(attribute){
        if(attribute['title'])
            return (<div>{attribute['title']}<span className="badge badge-danger">33</span></div>);
    }

    renderAttributes(info){
        if(info.attributes){
            return info.attributes.map((attr, index) => {
                return(
                    <Panel key = {index} header={this.getPanelHeader(attr)} bsStyle="success" collapsible expanded={false}>
                        {this.renderPrimary(attr)}
                    </Panel>
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