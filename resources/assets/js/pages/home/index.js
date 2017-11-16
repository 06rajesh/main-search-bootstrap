/**
 * Created by Rajesh on 10/16/17.
 */

import React, { Component } from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import SearchInput from '../../components/SearchInput';
import {Container} from '../../components/Utilites';

export default class Home extends Component {


    render() {
        return (
            <div className="full-height">
                <Container>
                    <Row className="vertical-center">
                        <Col md={8} mdOffset={2} className="center-align">
                            <Image src="http://a2i.pipilika.com/img/logo.png" style={styles.centerLogo}/>
                            <SearchInput size='large'/>
                        </Col>
                    </Row>
                </Container>
                <div className="home-image"/>
            </div>
        );
    }
}

const styles = {
    centerLogo : {
        marginBottom: '25px',
        width: '250px',
        position: 'relative',
        left: '-35px'
    },
    homeFlex: {
        flex: '1',
        marginTop: '0px',
        marginBottom: '0px'
    },
    homeColumn: {
        position: 'relative',
        top: '-80px'
    }
};
