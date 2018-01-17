/**
 * Created by Rajesh on 1/1/18.
 */

import React, { Component } from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import {Fade} from './Animations';

const services = [
    {
        name: 'Pipilika Product Search',
        icon: 'shopping-cart',
        url: 'https://product.pipilika.com',
        caption: 'খুঁজে নিন আপনার প্রয়োজনীয় সকল পণ্য এক সাইটেই'
    },
    {
        name: 'Pipilika Job Search',
        icon: 'suitcase',
        url: 'https://jobs.pipilika.com',
        caption: 'দেশের এবং বিদেশের হাজার চাকরি এর মাঝে খুঁজে নিন আপনারটি'
    },
    {
        name: 'Pipilika Latest News',
        icon: 'news',
        url: 'https://news.pipilika.com',
        caption: 'খুঁজে নিন আপনার প্রয়োজনীয় সকল পণ্য এক সাইটেই'
    },
    {
        name: 'Pipilika Library Search',
        icon: 'library',
        url: 'https://product.pipilika.com',
        caption: 'খুঁজে নিন আপনার প্রয়োজনীয় সকল পণ্য এক সাইটেই'
    },
    {
        name: 'Pipilika A2I Search',
        icon: 'check-list',
        url: 'https://a2i.pipilika.com',
        caption: 'খুঁজে নিন আপনার প্রয়োজনীয় সকল পণ্য এক সাইটেই'
    }
];

const tooltips = services.map((service, index) => {
    return (
        <Tooltip id={'tooltip_' + index} style={{marginTop: '10px'}}>
            <h6 style={{marginBottom: '3px'}}>{service.name}</h6>
            <p style={{marginBottom: '2px'}}>{service.url}</p>
            <p>{service.caption}</p>
        </Tooltip>
    );
});

class IconList extends Component {

    constructor() {
        super();
    }

    render(){
        return(
            <div className="icon-list" style={styles.iconsList}>
            {
                services.map((service, index) => {
                    return(
                        <a href={service.url} target="_blank" key={index} style={styles.iconListLink}>
                            <FlatIcons iconName={service.icon} item={index} delay={index}/>
                        </a>
                    );
                })
            }
            </div>
        );
    }
}

const styles = {
    iconsList: {
        margin: '15px auto',
        textAlign: 'center'
    },
    iconListLink: {
        display: 'inline-block'
    }
};


class FlatIcons extends Component{

    constructor(props){
        super(props);
        this.state = {
            url : 'images/icons/svg/' + this.props.iconName + '.svg',
            mounted: false,
            imageLoaded: false
        };
    }

    componentDidMount(){
        this.setState({
            mounted: true
        });
    }

    render(){

        return(
            <Fade in={this.state.mounted && this.state.imageLoaded} delay={this.props.delay*50}>
                <OverlayTrigger placement="bottom" overlay={tooltips[this.props.item]}>
                    <img src={this.state.url} alt="Clipboard" className="icons" onLoad={() => this.setState({imageLoaded: true})}/>
                </OverlayTrigger>
            </Fade>
        );
    }

}

export default IconList;
