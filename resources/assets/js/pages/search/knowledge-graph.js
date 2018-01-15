/**
 * Created by Rajesh on 1/13/18.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

import {Row, Col} from 'react-bootstrap';
import {KnowledgeThumb, Loader} from '../../components/Utilites';
import {Fade} from '../../components/Animations';

class KnowledgeGraph extends Component{

    constructor(props){
        super(props);
        this.state = {
            query: '',
            fetching: false,
            fetched: false,
            items: []
        };

        this.fetchItems = this.fetchItems.bind(this);
        this.renderKnowledgeItems = this.renderKnowledgeItems.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.hasKnowledgeGraph && nextProps.query != this.state.query){
            this.setState({query: nextProps.query, fetched: false});
            this.fetchItems(nextProps.query);
        }
    }

    fetchItems(query){
        this.setState({fetching: true});
        axios.get(`/api/knowledge?title=${query}`)
            .then((response) => {
                this.setState({
                    items: response.data.results,
                    fetching: false
                }, () => this.setState({fetched: true}));
            })
            .catch((err) => {
                console.log("Error On Fetching");
                this.setState({fetching: false, fetched: false, items: []});
            })
    };

    renderKnowledgeItems(){
        let{items} = this.state;

        if(items && items.length > 0){
            return items.map((item, index) => {
                if(index < 8){
                    return(
                        <Col sm={3} xs={4} style={{paddingRight: '0'}} key={index}>
                            <KnowledgeThumb src={item.image} alt="No Image Found">
                                <p style={{marginBottom: '0px'}}>{item.title}</p>
                            </KnowledgeThumb>
                        </Col>
                    );
                }
            })
        }
    }

    render(){
        if(this.props.hasKnowledgeGraph){
            if(this.state.fetching){
                return(
                    <Loader elementType='p'/>
                );
            }else if(!this.state.fetching){
                return(
                    <Fade in={this.state.fetched}>
                        <Row style={{maxWidth: '480px', paddingRight: '15px'}}>
                            {this.renderKnowledgeItems()}
                        </Row>
                    </Fade>
                );
            }
        }else{
            return (<span/>);
        }

    }
}

function mapStateToProps(store) {
    return {
        query: store.results.query,
        hasKnowledgeGraph: store.infoBox.has_knowledge_graph
    };
}

export default connect(mapStateToProps)(KnowledgeGraph);