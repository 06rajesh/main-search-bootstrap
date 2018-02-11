/**
 * Created by Rajesh on 1/9/18.
 */

import React, { Component } from 'react';
import {Panel, FormGroup, Form, Row, Col, Button, Alert} from 'react-bootstrap';
import ReactStars from 'react-stars'

import {sendUserFeedback} from '../../actions/analyticsActions';

import {Segment, PageHeader, Container} from '../../components/Utilites';
import {Fade} from '../../components/Animations';
import Footer from '../../components/Footer';

class Feedback extends Component{

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

        return(
            <div className="result-page page">
                <Fade in={this.state.mounted}>
                    <PageHeader title='মতামত' subtitle=' পিপীলিকা সম্পর্কে আপনার মূল্যবান মতামত জানান'/>
                    <Segment basic>
                        <Container text>
                            <br/>
                            <FeedbackForm/>
                        </Container>
                    </Segment>
                </Fade>
                <Footer/>
            </div>
        );
    }
}

class FeedbackForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            message: '',
            alertMessage: null,
            submitting: false,
            alertType: 'danger',
            site_star: 0,
            search_star: 0
        };

        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSiteRating(newRating){
        this.setState({
            site_star: newRating
        });
    }

    handleSearchRating(newRating){
        this.setState({
            search_star: newRating
        });
    }

    clearAlert(){
        this.setState({
            alertMessage: null
        });
    }

    handleSubmit(event){
        event.preventDefault();
        if(!this.state.submitting){
            let validation = FeedbackForm.validateUserInput(this.state);
            if(!validation.valid){
                this.setState({
                    alertMessage: validation.message,
                    alertType: 'danger'
                });
            }else{
                this.setState({
                    alertMessage: null,
                    submitting: true
                });

                sendUserFeedback(this.state).then((response) => {
                    if(response.success){
                        this.setState({
                            name: '',
                            email: '',
                            message: '',
                            alertMessage: response.message,
                            alertType: 'success',
                            submitting: false,
                            site_star: 0,
                            search_star: 0
                        });
                    }else{
                        this.setState({
                            alertMessage: response.message,
                            alertType: 'danger',
                            submitting: false
                        });
                    }
                });
            }
        }
    }

    static validateUserInput(inputs){
        let validation = {
            valid : true,
            message: ''
        };

        if(!inputs.name || inputs.name.length < 0){
            return validation = {
                valid: false,
                message: 'ইউজারের নাম অবশ্যই থাকতে হবে'
            };
        }else if(!inputs.email ||inputs.email.length < 0){
            return validation = {
                valid: false,
                message: 'ইউজারের ইমেইল অবশ্যই থাকতে হবে'
            };
        }else if(!inputs.message || inputs.message.length < 10){
            return validation = {
                valid: false,
                message: 'আপনার ম্যাসেজটি অবশ্যই ১০ অক্ষরের বড় হতে হবে'
            };
        }

        return validation;
    }

    renderErrorMessage(){
        if(this.state.alertMessage){
            return(
                <Alert bsStyle={this.state.alertType} onDismiss={this.clearAlert.bind(this)}>
                    <p>{this.state.alertMessage}</p>
                </Alert>
            );
        }
    }


    render(){
        return(
            <Panel header="আপনার মতামত" bsStyle="success">

                {this.renderErrorMessage()}
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <label>আপনার নাম</label>
                                <input className="form-control" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="নাম"/>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <label>আপনার ইমেইল</label>
                                <input className="form-control" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="ইমেইল"/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <label>ওয়েবসাইট রেটিং</label>
                                <ReactStars count={5} size={36} color2={'#ffd700'} name='site_star' value={this.state.site_star} onChange={this.handleSiteRating.bind(this)}/>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <label>সার্চ রেজাল্ট রেটিং</label>
                                <ReactStars count={5} size={36} color2={'#ffd700'} name="search_star" value={this.state.search_star} onChange={this.handleSearchRating.bind(this)}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <FormGroup>
                                <label>ম্যাসেজ</label>
                                <textarea className="form-control" name = "message" rows='8'
                                          placeholder="আপনার মূল্যবান মতামত জানান"
                                          onChange={this.handleInputChange} value={this.state.message}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <Button type='submit' className="pull-right" bsStyle="success" bsSize='large'>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Panel>
        );
    }
}

export default Feedback;



