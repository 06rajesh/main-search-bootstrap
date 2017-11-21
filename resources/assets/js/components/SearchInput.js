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
            suggestions : []
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
        axios.get(`https://jsonplaceholder.typicode.com/users?q=${query}`)
            .then((response) => {
                this.setState({
                    suggestions: response.data
                });
            })
            .catch((err) => {
                console.log("Error On Fetching");
            })
    }

    handleChange(eventValue) {
        this.setState({value: eventValue});
        this.fetchSuggestions(eventValue);
    }

    handleSubmit(event){
        event.preventDefault();
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
                        className="home-search"
                        suggestions = {this.state.suggestions}
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