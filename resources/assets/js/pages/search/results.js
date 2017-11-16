/**
 * Created by Rajesh on 10/19/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Results extends Component{
    constructor(){
        super();
    }

    renderPostList(results){
        if(results.length > 0){
            return results.map((result) => {
                if(result.doc_type == 'html') {
                    return (
                        <ListGroupItem key={result.id} style={styles.resultItem} header={result.title}>
                            <p className="result-url"><a href="#">{decodeURIComponent(result.url)}</a></p>
                            <p dangerouslySetInnerHTML={{__html: result.content}} style={styles.resultDescription}/>
                        </ListGroupItem>
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
        else if(!this.props.fetched){
            return(
                <ListGroup style={styles.resultListStyle}>
                        <h4>Loading</h4>
                </ListGroup>
            );
        }else{
            return(
                <ListGroup style={styles.resultListStyle} className="basic">
                    {this.renderPostList(this.props.results)}
                </ListGroup>
            );
        }
    }

}

const styles = {
    resultListStyle:{
        display: 'block',
        maxWidth: '700px',
        width: '100%'
    },
    resultItem: {
        paddingBottom: '0px'
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
        fontSize: '14px',
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
