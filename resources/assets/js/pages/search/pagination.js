/**
 * Created by Rajesh on 1/14/18.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

import {getPaginationArray, convertNumberToBengali} from '../../libs/common';

class Pagination extends Component{

    constructor(props){
        super(props);
        this.state = {
            pageArray: []
        };
        this.renderPagesButton = this.renderPagesButton.bind(this);
    }

    componentDidMount(){
        this.updatePagination(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.updatePagination(nextProps);
    }

    updatePagination(propsVal){
        let paginationTotal = propsVal.onMobile ? 5 : 9;
        let pages = getPaginationArray(propsVal.total, propsVal.range, propsVal.page, paginationTotal);
        this.setState({pageArray: pages});
    }

    pushOnClick(value){
        this.props.onClick(value);
    }

    renderPagesButton(){
        let {pageArray} = this.state;
        let totalPage = Math.ceil(this.props.total/this.props.range);

        if(pageArray.length > 0){
            return pageArray.map((page, index) => {
                if(index == 0) {
                    return(<Button key={index} onClick={() => this.pushOnClick(page)} disabled={this.props.page == 1}>প্রথম</Button>)
                }else if(index == (pageArray.length-1)){
                    return(<Button key={index} onClick={() => this.pushOnClick(page)} disabled={this.props.page == totalPage}>শেষ</Button>)
                }else {
                    return (
                        <Button key={index}  onClick={() => this.pushOnClick(page)}
                                active={this.props.page == page}>{convertNumberToBengali(page)}</Button>
                    );
                }
            });
        }
    }

    render(){
        return(
            <div className="btn-group pagination-group">
                {this.renderPagesButton()}
            </div>
        );
    }
}

Pagination.defaultProps = {total: 0, range: 20, page: 1, onMobile: false};

Pagination.propTypes = {
    total: PropTypes.number,
    range: PropTypes.number,
    page: PropTypes.number,
    onMobile: PropTypes.boolean
};

export default Pagination;

