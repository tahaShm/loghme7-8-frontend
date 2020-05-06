import React, { Component } from 'react';
import toPersianNum from '../utils/PersianNumber'

class OrderRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userAccountField: false, 
            reservedFoods: 0
        }
    }
    componentDidMount() {
        this.setState({reservedFoods : this.props.reservedFoods})
        this.setState({userAccountField: this.props.userAccountField ? this.props.userAccountField : false})
    }
    renderStatusButton() {
        if (this.props.status === "searching") {
            return (
                <button type="button" className="btn btn-sm mySearching" onClick = {this.props.onButtonClick}>در جستوجوی پیک</button>
            )
        }
        else if (this.props.status === "delivering"){
            return (
                <button type="button" className="btn btn-sm myDelivering" onClick = {this.props.onButtonClick}>پیک در مسیر</button>
            )
        }
        else if (this.props.status === "done") {
            return (
                <button type="button" className="btn btn-sm mySeeBill" onClick = {this.props.onButtonClick}>مشاهده فاکتور</button>
            )
        }
        else {
            return (
                <button type="button" className="btn btn-sm mySeeBill" onClick = {this.props.onButtonClick}>مشاهده فاکتور</button>
            )
        }
    }
    render() {
        return (
            <div className="row justify-content-center myOrderRow">
                <div className="col-1 myOrderCol">{toPersianNum(this.props.id)}</div>
                <div className="col-6 myOrderCol myMiddleCol">{this.props.restaurantName}</div>
                <div className="col">
                    {this.renderStatusButton()}
                </div>
            </div>
        )
    }
}

export default OrderRow;