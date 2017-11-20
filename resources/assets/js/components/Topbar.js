/**
 * Created by talha on 10/17/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
//import {Link} from 'react-router';
import {Row, Col, MenuItem, Glyphicon, Dropdown, Image} from 'react-bootstrap';
import {Segment} from './Utilites';
import SearchInput from './SearchInput';

const TopDropdown = () => {
  return(
      <Dropdown id = "top-dropdown-menu" pullRight style={styles.dropDownStyle}>
          <Dropdown.Toggle bsStyle="success" noCaret style={styles.dropDownButton}>
              <Glyphicon glyph="align-justify" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
              <MenuItem eventKey="1">Action</MenuItem>
              <MenuItem eventKey="2">Another action</MenuItem>
              <MenuItem eventKey="3" active>Active Item</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">Separated link</MenuItem>
          </Dropdown.Menu>
      </Dropdown>
  );
};

class Topbar extends Component{

    componentDidMount(){

    }

    renderHomeHeader(){
        return(
            <Segment basic className="no-border-radius transparent">
                <div className="pull-right">
                    <TopDropdown/>
                </div>
            </Segment>
        );
    }

    renderSearchHeader(){
        return(
            <Segment secondary className="no-border-radius">
                <Row className="flexify">
                    <Col md={12} className="hidden-sm hidden-xs" style={{ 'flex': '0 0 150px'}}>
                        <Image src="http://a2i.pipilika.com/img/logo.png" responsive style = {styles.imageClass}/>
                    </Col>
                    <Col xs={12} style={{ 'flex': '1', 'paddingTop': '5px'}}>
                        <SearchInput size='large'/>
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

        if(currentPath == '/') {
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
        minHeight: '90px',
        marginBottom: '0px'
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