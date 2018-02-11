/**
 * Created by Rajesh on 10/16/17.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Row, Col, Image} from 'react-bootstrap';
import SearchInput from '../../components/SearchInput';
import {Container} from '../../components/Utilites';
import IconList from '../../components/IconList';
import {Fade} from '../../components/Animations';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            mounted: false,
            logoLoaded: false
        };
    }

    componentDidMount(){
        this.setState({
            mounted: true
        });
    }


    render() {
        return (
            <div className="full-height">
                <Container>
                    <Row className="vertical-center">
                        <Col md={8} mdOffset={2} className="center-align">
                            <Fade in={this.state.logoLoaded}>
                                <Image src="/img/logo.png" style={styles.centerLogo} height="82.5" onLoad={() => this.setState({logoLoaded: true})}/>
                            </Fade>
                            <Fade in={this.state.mounted}>
                                <SearchInput size='large' onHome={true}/>
                            </Fade>
                            <IconList/>
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

function mapStateToProps(store) {
    return {
        query: store.results.query
    };
}

export default connect(mapStateToProps)(Home);
