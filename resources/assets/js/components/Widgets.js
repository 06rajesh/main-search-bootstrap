/**
 * Created by talha on 10/16/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {InputGroup, Glyphicon, Button, ListGroupItem, ListGroup} from 'react-bootstrap';

import jquery from 'jquery';
window.$ = window.jQuery = jquery;

import '../libs/ime/jquery.ime.css';
require('../libs/ime/jquery.ime');
require('../libs/ime/jquery.ime.selector.js');
require('../libs/ime/jquery.ime.inputmethods');
require('../libs/ime/jquery.ime.preferences');



export class ImeInput extends Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            value: '',
            cursor: 0,
            suggestions: []
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

        //console.log(this.input.$node[0]);
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
        this.setState({
            suggestions: []
        });
    }

    handleSelect(selectedVal){
        this.setState({value: selectedVal});
        this.refs.imeInput.value = selectedVal;
        this.props.onChange(selectedVal);
        this.setState({
            suggestions: []
        });
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
            if(this.state.suggestions.length > 0){
                this.handleSelect(this.state.suggestions[cursor].name);
            }
        }
    }

    componentWillUnmount() {
        this.ime.destroy();
    }

    renderQuerySuggestion(){
        let suggestions = this.state.suggestions;
        if(suggestions){
            let iterThroughSuggestion = () => {
                return suggestions.map((data, index) => {
                    return(
                        <ListGroupItem key={index} onClick={() => this.handleSelect(data.name)} active={index == this.state.cursor}>{data.name}</ListGroupItem>
                    );
                });
            };

            if(suggestions.length > 0){
                return(
                    <ListGroup style={styles.suggestionGroup}>
                        {iterThroughSuggestion()}
                    </ListGroup>
                );
            }
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
                           className="ime-input form-control" autoComplete="off" name="ime" ref="imeInput"/>
                    <InputGroup.Button>
                        <Button><Glyphicon glyph="search" /></Button>
                    </InputGroup.Button>
                </InputGroup>
                {this.renderQuerySuggestion()}
            </div>
        );
    }

}

ImeInput.defaultProps = { icon: 'search', size: 'lg', placeholder: 'search', value: '', className: ''};

ImeInput.propTypes = {
    icon: PropTypes.string,
    size: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    suggestions: PropTypes.array
};

const styles = {
    inputGroupHolder:{
        position: 'relative'
    },
    suggestionGroup: {
        position: 'absolute',
        width: '100%',
        zIndex: '100'
    }
};
