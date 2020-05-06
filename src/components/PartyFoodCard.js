import React, { Component } from 'react';
import toPersianNum from '../utils/PersianNumber'

class PartyFoodCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            partyFood: {}
        }
    }
    componentWillMount() {
        this.setState({partyFood : this.props.partyFood})
    }
    
    render() {
        return (
            <div class="col-3 partyCardWidth">
                <div class="card myPartyCard">
                    <div class="row mt-2 justify-content-center myPartyCardInfoRow">
                        <div class="col-6 mr-2">
                            <img class = "menuFoodImage w-100" src = {this.state.partyFood.food.imageUrl} alt="food-pic"/>
                        </div>
                        <div class="col-5 ml-1 padding-r-0">
                            <div class = "foodName">
                                <p class = "foodNameLabel d-flex"><strong>{this.state.partyFood.food.name}</strong></p>
                                <div class = "d-flex margin-t-15">
                                    <p class = "menuStarLabel">{toPersianNum(this.state.partyFood.food.popularity)}</p>
                                    <i class="flaticon-star menuStarIcon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row mt-1 justify-content-around">
                            <div class="col-6 pl-0">
                                <p class = "menuFoodPrice myRedLineThrough">{toPersianNum(this.state.partyFood.food.price)}</p>
                            </div>
                            <div class="col-6 pr-0">
                                <p class = "menuFoodPrice">{toPersianNum(this.state.partyFood.food.newPrice)}</p>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row justify-content-around">
                            <div class="col-6 pl-1">
                                <p class="myRemainingFood">موجودی:‌ {toPersianNum(this.state.partyFood.food.count)}</p>
                            </div>
                            <div class="col-6 pr-1">
                                <button type="button" class="btn myPartyBuyBtn" onClick = {this.props.onButtonClick}>خرید</button>
                            </div>
                        </div>
                    </div>
                    <hr class="myDashedGreenLine"/>
                    <div class="text-center myPartyRestaurant">
                        <p>{this.state.partyFood.restaurantName}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default PartyFoodCard;