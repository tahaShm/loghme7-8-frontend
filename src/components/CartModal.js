import React, { Component } from 'react';
import toPersianNum from '../utils/PersianNumber';
import { Modal } from 'react-bootstrap';
import FoodCart from './FoodCart';

class CartModal extends Component {
    constructor(props) {
        super(props);

        this.hideModal = this.hideModal.bind(this)

        this.state = {
            show: false,
        }
    }
    componentDidMount() {
        this.setState({show : this.props.show})
        this.setState({currentOrder : this.props.currentOrder})
    }
    componentWillReceiveProps(nextProps) {
        this.setState({show: nextProps.show});
        this.setState({currentOrder : this.props.currentOrder})
    }

    hideModal() {
        this.setState({show: false})
    }

    render() {
        return (
            <Modal 
                show={this.state.show} 
                onHide={this.props.hideModal}
                size="sm"
                centered 
            >
            <div className = "bg-success">    
                <FoodCart cartModal = {"mt-0"} order = {this.state.currentOrder} finalize = {this.props.finalize} increaseButton = {this.props.increaseButton} decreaseButton = {this.props.decreaseButton} />   
            </div>
            </Modal>
        )
    }
}

export default CartModal;