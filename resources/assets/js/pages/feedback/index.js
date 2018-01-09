/**
 * Created by Rajesh on 1/9/18.
 */

import React, { Component } from 'react';
import {Panel, FormGroup, Form, Row, Col, Button} from 'react-bootstrap';
import ReactStars from 'react-stars'

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
                            <p>পিঁপড়া বা পিঁপড়ে বা পিপীলিকা হল ফর্মিসিডি (Formicidae) গোত্রের অন্তর্গত সামাজিক কীট বা পোকা। পিঁপড়া এদের ঘনিষ্ঠ প্রজাতি বোলতা ও মৌমাছির মত একই বর্গ হাইমেনপ্টেরার (Hymenoptera) অন্তর্গত। এরা মধ্য-ক্রেটাশাস
                                পর্যায়ে ১১ থেকে ১৩ কোটি বছর পূর্বে বোলতা জাতীয় প্রাণী হতে বিবর্তিত হয় এবং সপুষ্পক উদ্ভিদের উদ্ভবের পর বহুমুখী বিকাশ লাভ করে। এখন পর্যন্ত জানা প্রায় ২২,০০০ পিঁপড়া প্রজাতির মধ্যে ১২,৫০০ টির শ্রেণিবিন্যাস করা হয়েছে।
                                [২][৩] কনুই-সদৃশ শুঙ্গ এবং গ্রন্থির মত যে কাঠামো দিয়ে তার সরু কোমড় গঠিত হয় তার মাধ্যমে
                            </p>
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
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            name: '',
            email: '',
            message: ''
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    render(){
        return(
            <Panel header="আপনার মতামত" bsStyle="success">
                <Form>
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
                        <Col sm={6}>
                            <FormGroup>
                                <label>Website Rating</label>
                                <ReactStars count={5} size={36} color2={'#ffd700'} name='site' value={0}/>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <label>Search Result Rating</label>
                                <ReactStars count={5} size={36} color2={'#ffd700'} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <FormGroup>
                                <label>Message</label>
                                <textarea className="form-control" name = "message" rows='8'
                                          placeholder="Write Your Opinion Here"
                                          onChange={this.handleInputChange} value={this.state.message}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <Button className="pull-right" bsStyle="success" bsSize='large'>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Panel>
        );
    }
}

export default Feedback;



