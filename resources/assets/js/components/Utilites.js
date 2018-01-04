/**
 * Created by Rajesh on 10/17/17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Panel, Button, Glyphicon} from 'react-bootstrap';
import {Fade} from './Animations';

export class Segment extends Component{

    render(){
        let _props = this.props;
        return(
            <div className={`segment ${_props.basic ? 'basic' : '' } ${_props.secondary ? 'secondary' : '' }`}>
                <Container fluid={_props.fluid}>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}

Segment.defaultProps = {basic: false, fluid: true};

Segment.propTypes = {
    basic: PropTypes.bool,
    secondary: PropTypes.bool
};

export class Container extends Component{
    render(){
        if(this.props.fluid){
            return(
                <div className="container-fluid">{this.props.children}</div>
            );
        }else{
            return(
                <div className="container">{this.props.children}</div>
            );
        }

    }
}

Container.defaultProps = {
    fluid: false
};

Container.propTypes = {
  fluid: PropTypes.bool
};

export class CollapsablePanel extends Component{


    constructor(props){
        super(props);
        this.state = {
          expanded: this.props.expanded
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({expanded: nextProps.expanded});
    }

    toggleExpand() {
        let isExpanded = !this.state.expanded;
        this.setState({expanded:isExpanded});
        if(this.props.toggleExpand) {
            this.props.toggleExpand();
        }
    }

    renderButton() {

        let icon = this.state.expanded ? 'chevron-down' : 'chevron-right';
        return (
            <Button
                className={this.state.expanded ? '' : 'collapsed'}
                bsStyle="link">
                <Glyphicon glyph={icon} />
            </Button>
        );
    }

    getPanelHeader(){
        if(this.props.header)
            return (<div onClick={this.toggleExpand.bind(this)}>{this.renderButton()}{this.props.header}</div>);
    }

    render() {
        let isExpanded = this.state.expanded;
        return (
            <Panel {...this.props} header={this.getPanelHeader()} collapsible expanded={isExpanded}>
                {this.props.children}
            </Panel>
        );
    }
}

CollapsablePanel.propTypes = {
    header: React.PropTypes.node,
    children: React.PropTypes.node.isRequired,
    expanded: React.PropTypes.bool,
    toggleExpand: React.PropTypes.func
};

CollapsablePanel.defaultProps = {
    expanded: true
};

export class Loader extends Component{
    constructor(props){
        super(props);
        this.state = {
            mounted: false
        }
    }

    componentDidMount(){
        this.setState({mounted: true});
    }

    render(){
        let CustomElement = this.props.elementType;
        return(
            <Fade in={this.state.mounted} duration={200}>
                <CustomElement style={{textAlign: 'center'}}>
                    {this.props.caption} <span className="glyphicon glyphicon-repeat normal-right-spinner"/>
                </CustomElement>
            </Fade>
        );
    }s
}

Loader.propTypes = {
    caption: React.PropTypes.string,
    elementType: React.PropTypes.oneOf(['h4', 'h5', 'p', 'div'])
};

Loader.defaultProps = {
    elementType: `h4`,
    caption: 'ফলাফল খোঁজা হচ্ছে'
};
