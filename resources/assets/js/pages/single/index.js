/**
 * Created by Rajesh on 1/7/18.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Segment, PageHeader, Container} from '../../components/Utilites';
import {Fade} from '../../components/Animations';
import Footer from '../../components/Footer';


class Single extends Component{

    constructor(props){
        super(props);
        this.state = {
            mounted: false
        };
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
        let {title, subtitle, content} = this.props;

        return(
            <div className="result-page page">
                <Fade in={this.state.mounted}>
                    <PageHeader title={title} subtitle={subtitle}/>
                    <Segment basic>
                        <Container text>
                            <div dangerouslySetInnerHTML={{ __html: content}}/>
                        </Container>
                    </Segment>
                </Fade>
                <Footer/>
            </div>
        );
    }
}

Single.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string
};

Single.defaultProps = {
    image: null
};

export default Single;


