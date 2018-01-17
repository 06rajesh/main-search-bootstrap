/**
 * Created by Rajesh on 1/7/18.
 */


//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import {Segment} from './Utilites';
import {Row, Col} from 'react-bootstrap';

class Footer extends Component{
    render(){
        return(
            <Segment basic secondary style={{marginBottom: '0'}} className="footer">
                <Row>
                    <Col sm={6}>
                        <ul className="no-padd footer-nav">
                            <li><a href="https://product.pipilika.com" target="_blank">প্রোডাক্ট সার্চ</a></li>
                            <li><a href="https://jobs.pipilika.com" target="_blank">জব সার্চ</a></li>
                            <li><a href="https://library.pipilika.com" target="_blank">লাইব্রেরী সার্চ</a></li>
                            <li><a href="https://news.pipilika.com" target="_blank">সর্বশেষ সংবাদ</a></li>
                        </ul>
                    </Col>
                    <Col sm={6} style={{textAlign: 'right'}}>
                        <p className="no-padd">শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় এর একটি উদ্যোগ</p>
                    </Col>
                </Row>
            </Segment>
        );
    }
}

export default Footer;
