import React, { Component } from 'react';
import toPersianNum from '../utils/PersianNumber'

class FoodCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            food: []
        }
    }
    componentWillMount() {
        this.setState({food : this.props.food})
    }
    renderButton() {
        // if (this.state.food.status === "valid") {
        return <button type="button" className="btn addToCartButton" onClick = {this.props.onButtonClick}>افزودن به سبد خرید</button>
        // }
        // else if (this.state.food.status === "invalid") {
        //     return <button type="button" className="btn outOfOrderButton" disabled>ناموجود</button>
        // }
    }
    render() {
        return (
            <div className = "col-4 mb-4">
                <div className="card p-2 menuFoodCard">
                    <img className = "menuFoodImage" src = {this.state.food.imageUrl} alt="food-pic"/>
                    <div className = "row justify-content-center mt-2 mb-n2">
                        <div className = "foodName">
                            <p className = "foodNameLabel"><strong>{this.state.food.name}</strong></p>
                        </div>
                        <div className = "d-flex flex-row col-1 foodStar">
                            <p className = "menuStarLabel">{toPersianNum(this.state.food.popularity)}</p>
                            <i className="flaticon-star menuStarIcon"></i>
                        </div>
                    </div>
                    <p className = "menuFoodPrice">{toPersianNum(this.state.food.price)} تومان</p>
                    <div className="text-center mb-2">
                        {this.renderButton()}
                    </div>
                </div>
            </div>
        )
    }
}

export default FoodCard;