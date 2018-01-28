/**
 * Created by talha on 10/17/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import {Link} from 'react-router';
import {Row, Col, MenuItem, Glyphicon, Dropdown, Image} from 'react-bootstrap';
import {history} from '../store';
import {Segment} from './Utilites';
import SearchInput from './SearchInput';

class TopDropdown extends Component{

    render(){
        return(
            <Dropdown id = "top-dropdown-menu" pullRight style={styles.dropDownStyle} onSelect={() => null}>
                <Dropdown.Toggle bsStyle="success" noCaret style={styles.dropDownButton}>
                    <Glyphicon glyph="align-justify" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="super-colors">
                    <li><Link to="/about" activeClassName="active">পিপীলিকা সম্পর্কে</Link></li>
                    <li><Link to="/what" activeClassName="active">পিপীলিকা কি?</Link></li>
                    <li><Link to="/feedback" activeClassName="active">মতামত</Link></li>
                    <li><Link to="/contact" activeClassName="active">যোগাযোগ</Link></li>
                    <MenuItem divider />
                    <li><Link to="https://product.pipilika.com" target="_blank">প্রোডাক্ট সার্চ</Link></li>
                    <li><Link to="https://jobs.pipilika.com" target="_blank">জব সার্চ</Link></li>
                    <li><Link to="https://library.pipilika.com" target="_blank">লাইব্রেরী সার্চ</Link></li>
                    <li><Link to="https://news.pipilika.com" target="_blank">সর্বশেষ সংবাদ</Link></li>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

class Topbar extends Component{

    goToLink(link){
        history.push(link);
    }

    renderHomeHeader(){
        return(
            <Segment basic className="no-border-radius transparent top-bar">
                <div className="pull-right">
                    <TopDropdown/>
                </div>
            </Segment>
        );
    }

    renderSearchHeader(){
        return(
            <Segment secondary className="no-border-radius top-bar">
                <Row className="flexify">
                    <Col md={12} className="hidden-sm hidden-xs" style={{ 'flex': '0 0 150px'}}>
                        <Image src="/img/logo.png" responsive style = {styles.imageClass} onClick={this.goToLink.bind(this, '/')}/>
                    </Col>
                    <Col xs={12} style={{ 'flex': '1', 'paddingTop': '5px'}}>
                        <SearchInput size='large' onTop={true}/>
                    </Col>
                    <Col xs={12} style={{ 'flex': '0 0 30px', 'paddingLeft': '0'}}>
                        <TopDropdown/>
                    </Col>
                </Row>
            </Segment>
        );
    }

    render(){
        let currentPath = this.props.currentPath;

        if(currentPath == '/' || currentPath == '/home') {
            return(
                this.renderHomeHeader()
            );
        }else {
            return (
                this.renderSearchHeader()
            );
        }
    }
}

const styles = {
    topBar: {
        height: '90px',
        marginBottom: '10px'
    },
    imageClass: {
        position: 'relative',
        top: '0px'
    },
    dropDownStyle: {
        margin: '5px'
    },
    dropDownButton: {
        fontSize: '20px'
    },
    leftSpacing: {
        width: '150px'
    }
};

export default Topbar;
