/**
 * Created by Rajesh on 10/16/17.
 */

import React, { Component } from 'react';
import axios from "axios";
import {ImeInput} from './ImeComponent';
import {FormGroup} from 'react-bootstrap';

import { connect } from 'react-redux';
import {history} from '../store';
import {resetInfoBox} from '../actions/infoboxActions';

class SearchInput extends Component {

    constructor(props){
        super(props);

        this.state = {
            value       : '',
            suggestions : [],
            fetchedSuggestion: false,
            fetchingSuggestions: false
        };

        this.mounted = false;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.mounted = true;
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.query !== this.props.query){
            this.setState({
                value: nextProps.query
            });
        }
    }


    fetchSuggestions(query){
        this.setState({fetchingSuggestions: true});

        axios.get(`/api/suggestions?query=${query}`)
            .then((response) => {
                if(this.mounted){
                    this.setState({
                        suggestions: response.data.query_suggestion
                    }, () => {
                        this.setState({fetchingSuggestions: false});
                    });
                }
            })
            .catch((err) => {
                console.log("Error On Fetching");
                if(this.mounted){
                    this.setState({fetchingSuggestions: false});
                }
            })
    }

    handleChange(eventValue) {
        if(this.mounted) this.setState({value: eventValue});
    }

    handleSubmit(event = null){
        if(event)  event.preventDefault();
        if(this.mounted) this.setState({suggestions: []});
        if(this.props.query !== this.state.value) this.props.resetInfoBox();
        history.push("/search?q=" + encodeURIComponent(this.state.value));
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup className = "search-input" bsSize={this.props.size} style = {(this.props.onTop) ? styles.searchInputStyle: styles.homeSearchInput}>
                    <ImeInput
                        icon='search'
                        size={this.props.size}
                        placeholder='সার্চ করুন...'
                        query = {this.props.query}
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

SearchInput.defaultProps = { size: '', className: '', onTop: false};

SearchInput.propTypes = {
    size: React.PropTypes.string,
    className: React.PropTypes.string,
    onTop: React.PropTypes.bool
};


const styles = {
    searchInputStyle:{
        maxWidth: '670px'
    },
    homeSearchInput : {
        maxWidth: '750px',
        marginBottom: '15px'
    }
};

function mapStateToProps(store) {
    return {
        query: store.results.query,
        infoBox: store.infoBox
    };
}

function mapDispatchToProps(dispatch){
    return{
        resetInfoBox: () => {
            dispatch(resetInfoBox());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);