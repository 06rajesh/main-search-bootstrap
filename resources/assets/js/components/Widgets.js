/**
 * Created by talha on 10/16/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import {InputGroup, Glyphicon, Button} from 'react-bootstrap';
import ReactAutocomplete from 'react-autocomplete';

import jquery from 'jquery';
window.$ = window.jQuery = jquery;

import '../libs/ime/jquery.ime.css';
require('../libs/ime/jquery.ime');
require('../libs/ime/jquery.ime.selector.js');
require('../libs/ime/jquery.ime.inputmethods');
require('../libs/ime/jquery.ime.preferences');



export class ImeInput extends Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: '',
        }
    }

    componentDidMount() {
        this.$node = $(this.refs.imeInput);
        this.$node.ime({
            languages: ['bn']
        });

        this.ime = this.$node.data('ime');

        this.ime.setLanguage('bn');
        this.ime.load('bn-avro');

        setTimeout(() => {
            this.ime.setIM( 'bn-avro' );
            this.ime.enable();

        }, 500);

        //console.log(this.input.$node[0]);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.value == '' && nextProps.value != ''){
            this.$node.get(0).value = nextProps.value;
        }
    }

    handleChange(event){
        this.setState({value: event.target.value});
        this.props.onChange(event.target.value);
    }

    handleSelect(selectedVal){
        this.setState({value: selectedVal});
        this.props.onChange(selectedVal);
    }

    componentWillUnmount() {
        this.ime.destroy();
    }

    render() {
        // Array of objects with default `labelKey`.
        const myData = [
            { id: 'সিলেট', label: 'সিলেট' },
            { id: 'ঢাকা', label: 'ঢাকা' },
            { id: 'বাংলাদেশ', label: 'বাংলাদেশ' }
        ];

        let _props = this.props;

        return (
            <div>
                <InputGroup className={_props.className} bsSize={this.props.size}>
                    <input type="text" placeholder={_props.placeholder} defaultValue={_props.value} onChange={this.handleChange} className="ime-input form-control" name="ime" ref="imeInput"/>

                    <InputGroup.Button>
                        <Button><Glyphicon glyph="search" /></Button>
                    </InputGroup.Button>
                </InputGroup>

                {/*<AutocompleteExtend

                    items={myData}
                    ref={el => this.input = el}
                    shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => item.label}
                    renderInput={(props) => {
                        //console.log(props);
                        return <input {...props} defaultValue={_props.value} className="ime-input form-control"/>;
                    }}
                    renderItem={(item, highlighted) =>
                        <div
                            key={item.id}
                            style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                        >
                            {item.label}
                        </div>
                    }
                    value={this.state.value}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect.bind(this)}
                />*/}

            </div>
        );
    }

}

ImeInput.defaultProps = { icon: 'search', size: 'lg', placeholder: 'search', value: '', className: ''};

ImeInput.propTypes = {
    icon: React.PropTypes.string,
    size: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
};

// export class Chosen extends React.Component {
//     componentDidMount() {
//         this.$el = $(this.el);
//         this.$el.chosen();
//     }
//
//     componentWillUnmount() {
//         this.$el.chosen('destroy');
//     }
//
//     render() {
//         return (
//             <div>
//                 <select className="Chosen-select" ref={el => this.el = el}>
//                     {this.props.children}
//                 </select>
//             </div>
//         );
//     }
// }


export class AutocompleteExtend extends ReactAutocomplete{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.$node = $(this.refs.input);
        this.$node.ime({
            languages: ['bn']
        });

        this.ime = this.$node.data('ime');

        this.ime.setLanguage('bn');
        this.ime.load('bn-avro');

        setTimeout(() => {
            this.ime.setIM( 'bn-avro' );
            this.ime.enable();
        }, 500);
    }

    componentWillUnmount() {
        this.ime.destroy();
    }

}

