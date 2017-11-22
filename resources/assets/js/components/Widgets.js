/**
 * Created by talha on 10/16/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {InputGroup, Glyphicon, Button, ListGroupItem, ListGroup} from 'react-bootstrap';
import ToggleButton from 'react-toggle-button';

import jquery from 'jquery';
window.$ = window.jQuery = jquery;

//import '../libs/ime/jquery.ime.css';
require('../libs/ime/jquery.ime');
require('../libs/ime/jquery.ime.selector.js');
require('../libs/ime/jquery.ime.inputmethods');
require('../libs/ime/jquery.ime.preferences');



export class ImeInput extends Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.changeOnBlur = this.changeOnBlur.bind(this);
        this.changeOnFocus = this.changeOnFocus.bind(this);
        this.state = {
            toggle: true,
            value: '',
            cursor: 0,
            suggestions: [],
            onFocus: false
        }
    }

    componentDidMount() {
        this.$node = $(this.refs.imeInput);
        this.$node.ime({
            languages: ['bn']
        });

        this.ime = this.$node.data('ime');

        this.ime.setLanguage('bn');
        this.ime.load('bn-avro');

        setTimeout(() => {
            this.ime.setIM( 'bn-avro' );
            this.ime.enable();
            this.setState({
                suggestions: this.props.suggestions
            });
        }, 500);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.value == '' && nextProps.value != ''){
            this.$node.get(0).value = nextProps.value;
        }
        if(nextProps.suggestions.length > 1){
            this.setState({
                suggestions: nextProps.suggestions
            });
        }
    }

    handleChange(event){
        this.setState({value: event.target.value});
        this.props.onChange(event.target.value);
    }

    handleSelect(event, selectedVal){
        this.setState({value: selectedVal});
        this.refs.imeInput.value = selectedVal;
        this.props.onChange(selectedVal);
        setTimeout(() => {
            this.setState({
                onFocus: false
            });
            this.props.onSubmit(event);
        },500);
    }

    changeOnFocus(){
        this.setState({
            onFocus: true,
            cursor: -1
        });
    }

    changeOnBlur(){
        setTimeout(() => {
            this.setState({
                onFocus: false
            });
        }, 250);
    }

    handleKeyDown(e) {
        const { cursor, suggestions } = this.state;

        // arrow up/down button should select next/previous list element
        if (e.keyCode == 38) {
            if(cursor > 0){
                this.setState({
                    cursor: this.state.cursor - 1
                });
            }else{
                this.setState({
                    cursor: suggestions.length
                });
            }

        } else if (e.keyCode == 40) {
            if(cursor < suggestions.length){
                this.setState({
                    cursor: this.state.cursor + 1
                });
            }else {
                this.setState({
                    cursor: 0
                });
            }

        }else if(e.keyCode == 13){
            if(suggestions.length > 0 && cursor < suggestions.length && cursor > -1){
                this.handleSelect(e, this.state.suggestions[cursor].query);
            }else{
                this.setState({
                    onFocus: false
                });
            }
        }
    }

    componentWillUnmount() {
        this.ime.destroy();
    }

    renderQuerySuggestion(){
        let suggestions = this.state.suggestions;

        if(suggestions && this.state.onFocus){

            let iterThroughSuggestion = () => {
                if(this.props.fetching){
                    return(
                        <ListGroupItem>Fetching <Glyphicon glyph="refresh" /></ListGroupItem>
                    );
                }
                return suggestions.map((data, index) => {
                    return(
                        <ListGroupItem key={index} onClick={this.handleSelect.bind(this, event, data.query)} active={index == this.state.cursor}>{data.query}</ListGroupItem>
                    );
                });
            };


            return(
                <ListGroup style={styles.suggestionGroup}>
                    {iterThroughSuggestion()}
                </ListGroup>
            );
        }
    }

    render() {

        let _props = this.props;

        return (
            <div style={styles.inputGroupHolder}>
                <InputGroup className={_props.className} bsSize={this.props.size}>
                    <input type="text" placeholder={_props.placeholder}
                           defaultValue={_props.value}
                           onKeyDown={ this.handleKeyDown }
                           onChange={this.handleChange}
                           onFocus={this.changeOnFocus}
                           onBlur={this.changeOnBlur}
                           className="ime-input form-control" autoComplete="off" name="ime" ref="imeInput"/>
                    <div style={styles.toggleButtonStyle}>
                        <ToggleButton
                            value={ this.state.toggle || false }
                            onToggle={(value) => {
                                this.setState({
                                    toggle: !value,
                                })
                            }} />
                    </div>
                    <InputGroup.Button>
                        <Button onClick={this.props.onSubmit}><Glyphicon glyph="search" /></Button>
                    </InputGroup.Button>
                </InputGroup>
                {this.renderQuerySuggestion()}
            </div>
        );
    }

}

ImeInput.defaultProps = { icon: 'search', size: 'lg', placeholder: 'search', value: '', className: '', suggestions: [], fetching: false};

ImeInput.propTypes = {
    icon: PropTypes.string,
    size: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    suggestions: PropTypes.array,
    fetching: PropTypes.bool
};

const styles = {
    inputGroupHolder:{
        position: 'relative'
    },
    suggestionGroup: {
        position: 'absolute',
        width: '100%',
        zIndex: '100'
    },
    toggleButtonStyle: {
        position: 'absolute',
        top: '30%',
        zIndex: '100',
        right: '58px'
    }
};
