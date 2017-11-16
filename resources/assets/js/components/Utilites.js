/**
 * Created by Rajesh on 10/17/17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Panel, Button, Glyphicon} from 'react-bootstrap';

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

export class PanelHeaderToggle extends Component{

    toggleExpand(e) {
        e.preventDefault();
        this.props.toggleExpand();
    }

    renderButton() {

        let icon = this.props.expanded ? 'chevron-down' : 'chevron-right';
        return (
            <Button
                className={this.props.expanded ? '' : 'collapsed'}
                bsStyle="link"
                onClick={this.toggleExpand}>
                <Glyphicon glyph={icon} /> {' '}
                {this.props.header}
            </Button>
        );
    }

    render() {
        let HTag = this.props.headerElement;
        return (
            <div>
                <HTag className="panel-title">
                    {this.renderButton()}
                </HTag>
            </div>
        );
    }
}

PanelHeaderToggle.propTypes = {
    toggleExpand: React.PropTypes.func.isRequired,
    header: React.PropTypes.node.isRequired,
    expanded: React.PropTypes.bool.isRequired,
    headerElement: React.PropTypes.string
};


export class CollapsablePanel extends Component{

    toggleExpand() {
        let isExpanded = !this.isExpanded();
        this.setState({expanded:isExpanded});
        if(this.props.toggleExpand) {
            this.props.toggleExpand();
        }
    }

    isExpanded() {
        return this.props.expanded != null
            ? this.props.expanded
            : this.state.expanded;
    }

    render() {
        let isExpanded = this.isExpanded();
        let header = (
            <PanelHeaderToggle
                header={this.props.header}
                headerElement={this.props.headerElement}
                expanded={isExpanded}
                toggleExpand={this.toggleExpand} />);
        return (
            <Panel {...this.props} header={header} collapsable expanded={isExpanded}>
                {this.props.children}
            </Panel>
        );
    }
}

CollapsablePanel.propTypes = {
    header: React.PropTypes.node.isRequired,
    children: React.PropTypes.node.isRequired,
    expanded: React.PropTypes.bool,
    toggleExpand: React.PropTypes.func,
    headerElement: React.PropTypes.string
};