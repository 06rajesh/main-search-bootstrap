/**
 * Created by Rajesh on 10/19/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import {Fade} from '../../components/Animations';
import {Loader} from '../../components/Utilites';

class ResultItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            mounted: false
        }
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

    render(){
        let {result} = this.props;
        return (
            <Fade in={this.state.mounted} delay={this.props.delay * 20}>
                <ListGroupItem key={result.id} style={styles.resultItem} listItem>
                    <h4>{result.title}</h4>
                    <p className="result-url"><a href="#"><span className="glyphicon glyphicon-globe"/> {decodeURIComponent(result.url)}</a></p>
                    <p dangerouslySetInnerHTML={{__html: result.content}} style={styles.resultDescription}/>
                </ListGroupItem>
            </Fade>
        );
    }
}

class Results extends Component{
    constructor(props){
        super(props);
    }

    renderPostList(results){
        if(results.length > 0){
            return results.map((result, index) => {
                if(result.doc_type == 'html') {
                    return (
                        <ResultItem result={result} key={result.id} delay={index}/>
                    );
                }
            });
        }else{
            return(
                <ListGroupItem>
                    <h4 style={styles.resultHeader}>No Result Found..</h4>
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
                    {this.renderPostList(this.props.results)}
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
