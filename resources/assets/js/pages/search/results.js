/**
 * Created by Rajesh on 10/19/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import {Fade} from '../../components/Animations';
import {Loader} from '../../components/Utilites';

import {sendUserActivity} from  '../../actions/analyticsActions';

class ResultItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            mounted: false
        };

        this.onResultClick = this.onResultClick.bind(this);
    }

    componentDidMount(){
        this.setState({
            mounted: true
        });
    }

    componentWillUnmount(){
        this.setState({
           mounted: false
        });
    }

    onResultClick(resultItem){

        let userActivity = {
            query    : this.props.query,
            domain   : resultItem.domain,
            result_id: resultItem.id,
            position : resultItem.position,
            title    : resultItem.title,
            link     : resultItem.url
        };

        sendUserActivity(userActivity);
    }

    render(){
        let {result} = this.props;
        return (
            <Fade in={this.state.mounted} delay={this.props.delay * 20}>
                <ListGroupItem key={result.id} style={styles.resultItem} listItem>
                    <h4><a href={result.url} target="_blank" onClick={() => this.onResultClick(result)}>{result.title}</a></h4>
                    <p className="result-url">
                        <a href={result.url} target="_blank" onClick={() => this.onResultClick(result)}>
                            <span className="glyphicon glyphicon-globe"/> {decodeURIComponent(result.url)}</a>
                    </p>
                    {/*<p dangerouslySetInnerHTML={{__html: result.content}} style={styles.resultDescription}/>*/}
                    <p style={styles.resultDescription}>{ResultItem.truncateContent(result.content)}</p>
                </ListGroupItem>
            </Fade>
        );
    }
}

ResultItem.truncateContent = function (content) {
    if(content.length > 350){
        return content.substring(0, 347) + '...';
    }
    return content;
};


class Results extends Component{
    constructor(props){
        super(props);
    }

    renderPostList(results, total){
        if(total > 0 && results.length > 0){
            return results.map((result, index) => {
                return (
                    <ResultItem result={result} key={index} delay={index} query={this.props.query}/>
                );
            });
        }else{
            return(
                <ListGroupItem>
                    <h4 style={styles.noResultText}> আপনার অনুসন্ধানকৃত  <b>"{this.props.query}"</b> কোন তথ্যাদির সাথে মেলেনি। অনুগ্রহ করে আবার চেষ্টা করুন।</h4>
                    <br/>
                    <h4 style={styles.noResultText}> পরামর্শ: </h4>
                    <ul className="media-list">
                        <li>সমস্ত শব্দের বানান সঠিক কিনা তা যাচাই করুন।</li>
                        <li>ভিন্ন কিওয়ার্ড দিয়ে অনুসন্ধানের চেষ্টা করুন। </li>
                    </ul>
                </ListGroupItem>
            );
        }
    }

    render(){
        if(this.props.error != null){
            return(<p>{this.props.error}</p>);
        }
        else if(this.props.fetching || !this.props.fetched){
            return(
                <ListGroup style={styles.resultListStyle} className="basic">
                        <Loader/>
                </ListGroup>
            );
        }else{
            return(
                <ListGroup style={styles.resultListStyle} className="basic" componentClass="ul">
                    {this.renderPostList(this.props.results, this.props.total)}
                </ListGroup>
            );
        }
    }

}

const styles = {
    resultListStyle:{
        display: 'block',
        maxWidth: '750px',
        width: '100%'
    },
    resultHeader:{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: '18px',
        lineHeight: '1.4em',
        marginBottom: '8px',
        color: 'rgba(0,0,0,0.75)'
    },
    noResultText:{
        fontWeight: 'normal',
        fontSize: '17px',
        lineHeight: '1.4em',
        marginBottom: '8px',
        color: 'rgba(0,0,0,0.55)',
        whiteSpace: 'normal'
    },
    resultDescription: {
        fontSize: '12px',
        lineHeight: '1.5em',
        color: 'rgba(0,0,0,0.6)',
        textAlign: 'justify'
    },
    dimmerStyle: {
        background: 'transparent',
        minHeight: '450px'
    }
};

export default Results;
