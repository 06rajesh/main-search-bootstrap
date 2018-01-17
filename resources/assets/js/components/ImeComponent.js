/**
 * Created by talha on 10/16/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {InputGroup, Glyphicon, Button, ListGroupItem, ListGroup} from 'react-bootstrap';
import ToggleButton from 'react-toggle-button';
import {Loader} from './Utilites';

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
        this.toggleInputLanguage = this.toggleInputLanguage.bind(this);
        this.state = {
            toggle: true,
            value: '',
            cursor: -1,
            suggestions: [],
            onFocus: false
        };
        this.mounted = false;
    }

    componentDidMount() {
        this.$node = $(this.refs.imeInput);
        this.$node.ime({
            languages: ['bn', 'en'],
            showSelector: false
        });

        this.ime = this.$node.data('ime');
        this.mounted = true;

        this.ime.load('bn-avro');

        setTimeout(() => {
            this.ime.setLanguage('bn');
            this.ime.setIM( 'bn-avro' );
            this.ime.enable();
            this.setState({
                value: this.props.query,
                suggestions: this.props.suggestions
            }, () => {this.props.onChange(this.state.value)});
        }, 500);
    }

    componentWillReceiveProps(nextProps){

        /*if(this.props.initValue != this.state.initValue) {
            this.setState({
                value: nextProps.initValue,
                initValue: nextProps.initValue
            });
        }*/

        if(nextProps.query !== this.props.query){
            this.setState({
                value: nextProps.query
            });
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

        if(event) {
            event.preventDefault();
        }

        this.setState({value: selectedVal});
        this.refs.imeInput.value = selectedVal;
        this.props.onChange(selectedVal);
        setTimeout(() => {
            if(this.mounted){
                this.setState({
                    onFocus: false
                });
                this.props.onSubmit();
            }
        },500);
    }

    changeOnFocus(e){
        this.setState({
            value: event.target.value,
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

        if(this.mounted){
            // arrow up/down button should select next/previous list element
            //console.log(this.state.cursor);

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
                    this.setState({
                        cursor: -1
                    });
                }else{
                    if(this.state.value.length > 0){
                        this.setState({
                            onFocus: false
                        });
                        this.props.onSubmit(e);
                    }
                }
            }
        }
    }

    componentWillUnmount() {
        this.ime.destroy();
        this.setState({
            value: ''
        });
        this.mounted = false;
    }

    toggleInputLanguage(value){
        this.setState({
            toggle: !value,
        });
        if(value){
            this.ime.setLanguage('en');
            this.ime.setIM( 'en' );
            this.ime.enable();
        }else{
            this.ime.setLanguage('bn');
            this.ime.setIM( 'bn-avro' );
            this.ime.enable();
        }
    }

    renderQuerySuggestion(){
        let suggestions = this.state.suggestions;

        if(this.props.autoSuggestion && suggestions && this.state.onFocus){

            let iterThroughSuggestion = () => {
                if(this.props.fetching){
                    return(
                        <ListGroupItem><Loader elementType="p"/></ListGroupItem>
                    );
                }
                return suggestions.map((data, index) => {
                    return(
                        <ListGroupItem key={index} onClick={this.handleSelect.bind(this, null, data.query)} active={index == this.state.cursor}>{data.query}</ListGroupItem>
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
                    {/*<input type="text" placeholder={_props.placeholder} value={this.state.value}*/}
                           {/*onKeyDown={ this.handleKeyDown } onChange={this.handleChange}*/}
                           {/*onFocus={this.changeOnFocus} onBlur={this.changeOnBlur}*/}
                           {/*className="ime-input form-control" autoComplete="off" name="q" ref="imeInput"/>*/}
                    <input type="text" placeholder={_props.placeholder} value={this.state.value}
                           onKeyDown={ this.handleKeyDown } onChange={this.handleChange}
                           className="ime-input form-control" autoComplete="off" name="q" ref="imeInput"/>
                    <div style={styles.toggleButtonStyle}>
                        <ToggleButton
                            inactiveLabel={'EN'}
                            activeLabel={'BN'}
                            value={ this.state.toggle || false }
                            onToggle={(value) => this.toggleInputLanguage(value)}/>
                    </div>
                    <InputGroup.Button>
                        <Button onClick={this.props.onSubmit} bsStyle="success"><Glyphicon glyph="search" /></Button>
                    </InputGroup.Button>
                </InputGroup>
                {this.renderQuerySuggestion()}
            </div>
        );
    }

}

ImeInput.defaultProps = { icon: 'search', size: 'lg', placeholder: 'search', query: '', className: '', autoSuggestion: false, suggestions: [], fetching: false};

ImeInput.propTypes = {
    icon: PropTypes.string,
    size: PropTypes.string,
    autoSuggestion: PropTypes.bool,
    placeholder: PropTypes.string,
    query: PropTypes.string,
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
