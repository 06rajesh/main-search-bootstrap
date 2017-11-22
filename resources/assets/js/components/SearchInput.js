/**
 * Created by Rajesh on 10/16/17.
 */

import React, { Component } from 'react';
import axios from "axios";
import {ImeInput} from './Widgets';
import {FormGroup} from 'react-bootstrap';

import { connect } from 'react-redux';
import {history} from '../store';

class SearchInput extends Component {

    constructor(props){
        super(props);

        this.state = {
            value       : '',
            suggestions : [],
            fetchedSuggestion: false,
            fetchingSuggestions: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(typeof nextProps.query !== 'undefined'){
            this.setState({ value: nextProps.query });
        }
    }

    fetchSuggestions(query){
        this.setState({fetchingSuggestions: true});

        axios.get(`/api/suggestions?query=${query}`)
            .then((response) => {
                this.setState({
                    suggestions: response.data.query_suggestion
                }, () => this.setState({fetchingSuggestions: false}));
            })
            .catch((err) => {
                console.log("Error On Fetching");
                this.setState({fetchingSuggestions: false});
            })
    }

    handleChange(eventValue) {
        this.setState({value: eventValue});
        if(!this.state.fetchingSuggestions && eventValue.length > 1){
            this.fetchSuggestions(eventValue);
        }
    }

    handleSubmit(event){
        if(event)  event.preventDefault();
        this.setState({suggestions: []});
        history.push("/search?q=" + this.state.value);
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup className = "search-input" bsSize={this.props.size} style = {(this.props.size == 'large') ? styles.homeSearchInput : styles.searchInputStyle}>
                    <ImeInput
                        icon='search'
                        size={this.props.size}
                        placeholder='Jquery IME ...'
                        value = {this.props.query}
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        className="home-search"
                        suggestions = {this.state.suggestions}
                        fetching = {this.state.fetchingSuggestions}
                    />
                </FormGroup>
            </form>
        );
    }
}

SearchInput.defaultProps = { size: '', className: ''};

SearchInput.propTypes = {
    size: React.PropTypes.string,
    className: React.PropTypes.string
};


const styles = {
    searchInputStyle:{
        maxWidth: '700px'
    },
    homeSearchInput : {
        maxWidth: '700px',
        marginBottom: '15px'
    }
};

function mapStateToProps(store) {
    return {
        query: store.results.query
    };
}


export default connect(mapStateToProps)(SearchInput);