/**
 * Created by Rajesh on 1/28/18.
 */

import React, { Component } from 'react';
import {Panel, FormGroup, Form, Row, Col, Button, Alert} from 'react-bootstrap';

import {sendUserContact} from '../../actions/analyticsActions';

import {Segment, PageHeader, Container} from '../../components/Utilites';
import {Fade} from '../../components/Animations';
import Footer from '../../components/Footer';

class Contact extends Component{

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
                    <PageHeader title='যোগাযোগ' subtitle='পিপীলিকা সম্পর্কিত যেকোনো তথ্যের জন্য যোগাযোগ করুন'/>
                    <Segment basic>
                        <Container text>
                            <p>পিঁপড়া বা পিঁপড়ে বা পিপীলিকা হল ফর্মিসিডি (Formicidae) গোত্রের অন্তর্গত সামাজিক কীট বা পোকা। পিঁপড়া এদের ঘনিষ্ঠ প্রজাতি বোলতা ও মৌমাছির মত একই বর্গ হাইমেনপ্টেরার (Hymenoptera) অন্তর্গত। এরা মধ্য-ক্রেটাশাস
                                পর্যায়ে ১১ থেকে ১৩ কোটি বছর পূর্বে বোলতা জাতীয় প্রাণী হতে বিবর্তিত হয় এবং সপুষ্পক উদ্ভিদের উদ্ভবের পর বহুমুখী বিকাশ লাভ করে। এখন পর্যন্ত জানা প্রায় ২২,০০০ পিঁপড়া প্রজাতির মধ্যে ১২,৫০০ টির শ্রেণিবিন্যাস করা হয়েছে।
                                [২][৩] কনুই-সদৃশ শুঙ্গ এবং গ্রন্থির মত যে কাঠামো দিয়ে তার সরু কোমড় গঠিত হয় তার মাধ্যমে
                            </p>
                            <br/>
                            <ContactForm/>
                        </Container>
                    </Segment>
                </Fade>
                <Footer/>
            </div>
        );
    }
}

class ContactForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            site: '',
            message: '',
            alertMessage: null,
            submitting: false,
            alertType: 'danger'
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

    clearAlert(){
        this.setState({
            alertMessage: null
        });
    }

    handleSubmit(event){
        event.preventDefault();
        if(!this.state.submitting){
            let validation = ContactForm.validateUserInput(this.state);
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

                sendUserContact(this.state).then((response) => {
                    if(response.success){
                        this.setState({
                            name: '',
                            email: '',
                            message: '',
                            site: '',
                            alertMessage: response.message,
                            alertType: 'success',
                            submitting: false
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
            <Panel header="যোগাযোগ করুন" bsStyle="success">

                {this.renderErrorMessage()}
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <label>Name</label>
                                <input className="form-control" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Name"/>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <label>Email</label>
                                <input className="form-control" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="Email"/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12}>
                            <FormGroup>
                                <label>Domain</label>
                                <input className="form-control" name="site" value={this.state.site} onChange={this.handleInputChange} placeholder="Enter your Site"/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <FormGroup>
                                <label>Message</label>
                                <textarea className="form-control" name = "message" rows='8'
                                          placeholder="Write Additional Information"
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

export default Contact;




