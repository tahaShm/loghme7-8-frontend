import React, { Component } from 'react';
import toPersianNum from '../utils/PersianNumber'

class FoodCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            order: []
        }
    }
    componentDidMount() {
        this.setState({order : this.props.order})
    }
    componentWillReceiveProps(nextProps) {
        this.setState({order: nextProps.order});
    }
    showOrderRow = (food, i) => {
        return (
            <div>
                <div className="d-flex ml-2 myNotFirstFood">
                    <div className="ml-auto p-2">{food.name}</div>
                    <div className="mt-2">
                        <div className="d-flex flex-row">
                            <a className="plusButton" onClick={() => this.props.increaseButton(i)}>
                                <i className="flaticon-plus"></i>
                            </a>
                            <p className="pl-3">{toPersianNum(food.count)}</p>
                            <a className="minusButton" onClick={() => this.props.decreaseButton(i)}>
                                <i className="flaticon-minus"></i>
                            </a>
                        </div>
                        <p className="pl-2 myFoodPrice">{toPersianNum(food.price)} تومان</p>
                    </div>
                </div>
                <hr className="myCartFoodHr"/>
            </div>
        )
    }
    renderOrderRows() {
        if (this.state.order != null && this.state.order.length != 0){
            return (
                <div>
                {   
                    this.state.order.map(this.showOrderRow, this)
                }
                </div>
            )
        }
    }
    getTotalPrice() {
        var totalPrice = 0;
        var orderList = this.state.order;
        
        if (orderList != null && orderList !== ""){
            orderList.forEach(function (food) {
                totalPrice += food.count * food.price
            });
        }
        return totalPrice;
    }
    render() {
        return (
            <div className={"card myRestaurantCard " + this.props.cartModal}>
                <div className="card-body p-2">
                    <h5 className="card-title centerText">سبد خرید</h5>
                    <hr className="myCartHr"/>
                    <div className="myCartBorder">
                        {this.renderOrderRows()}
                    </div>
                    <p className="myTotalPrice">جمع کل:‌ <strong>{toPersianNum(this.getTotalPrice())} تومان</strong></p>
                    <button type="button" className="btn myConfirmBtn" onClick = {this.props.finalize}>تایید نهایی</button>
                </div>
            </div>
        )
    }
}

export default FoodCart;