import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Image, Spinner } from 'react-bootstrap';
import '../styles/font/flaticon.css'
import '../styles/main.css'
import Navbar from '../components/Navbar';
import CartModal from '../components/CartModal';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toPersianNum from '../utils/PersianNumber';
import axios from 'axios'
import FoodCart from '../components/FoodCart';
import FoodCard from '../components/FoodCard';
import calcFoodCount from '../utils/OrderCounter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Restaurant extends Component {
    constructor(props) {
        super(props);

        this.increaseFood = this.increaseFood.bind(this)
        this.decreaseFood = this.decreaseFood.bind(this)
        this.showFoodModal = this.showFoodModal.bind(this)
        this.hideFoodModal = this.hideFoodModal.bind(this)
        this.increaseCurrentFood = this.increaseCurrentFood.bind(this)
        this.decreaseCurrentFood = this.decreaseCurrentFood.bind(this)
        this.addFoodFromModal = this.addFoodFromModal.bind(this)
        this.finalizeOrder = this.finalizeOrder.bind(this)
        this.showCart = this.showCart.bind(this)
        this.hideCart = this.hideCart.bind(this)
        this.enableMessage = this.enableMessage.bind(this)

        this.timer = setTimeout(this.enableMessage, 1000);

        this.state = {
            loading: true,
            restaurantId : 0,
            restaurantName: "",
            currentFood: {},
            restaurantImageUrl: "",
            curIdx : 0,
            curFoodCount: 0,
            dialogShow: false,
            showCartModal: false,
            currentOrder : [],
            menu : [],
            displayMessage: false,
            foodCountInOrder: 0
        }
    }

    enableMessage () {
        this.setState({displayMessage: true});
    }

    componentDidMount() {
        let param = this.props.location.pathname;
        let index = param.indexOf("/", 1) + 1;
        let restaurantId = param.substr(index);
        this.setState({restaurantId: restaurantId}, function() {
            axios.get('http://localhost:8080/restaurant/' + this.state.restaurantId)
            .then((response) => {
                this.setState({
                    restaurantName: response.data.name,
                    restaurantId: response.data.id,
                    restaurantImageUrl: response.data.logo,
                    menu: response.data.menu,
                    loading: false
                })
            })
            .catch((error) => {
                console.log(error);
                this.props.history.push('/home');
            });
        });

        axios.get("http://localhost:8080/currentOrder")
        .then((response) => {
            this.setState({
                currentOrder: response.data,
                foodCountInOrder: calcFoodCount(response.data)
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }
    showFoodModal(index) {
        this.setState({curIdx: index})
        this.setState({curFoodCount: 0})
        this.setState({dialogShow: true})
    }
    hideFoodModal(){
        this.setState({dialogShow: false})
    }

    renderFoodCards() {
        if (this.state.menu != null && this.state.menu.length != 0){
            let menu = this.state.menu;
            let content = [];
            
            for (let index = 0; index < menu.length / 3; index++) { 
                content.push(
                    <div class = "row justify-content-center menuRow">
                        <FoodCard food = {menu[index*3]} onButtonClick = {(e) => this.showFoodModal(index*3)}/>
                        {index*3 + 1 < menu.length ?
                            <FoodCard food = {menu[index*3+1]} onButtonClick = {(e) => this.showFoodModal(index*3 + 1)} /> :
                            <div class = "col-4 mb-4"></div>
                        }
                        {index*3 + 2 < menu.length ?
                            <FoodCard food = {menu[index*3+2]} onButtonClick = {(e) => this.showFoodModal(index*3 + 2)} /> :
                            <div class = "col-4 mb-4"></div>
                        }
                    </div>
                )
            } 
            return (
                <div>
                {content}
                </div>
            )
        }
    }
    increaseFood = (index) => {
        let tempOrder = this.state.currentOrder.slice()
        tempOrder[index].count += 1
        this.setState({currentOrder: tempOrder})
        
        axios.put('http://localhost:8080/food/' + this.state.restaurantId, null, {params: {
            foodName: this.state.currentOrder[index].name,
            count: 1
        }})
        .then((response) => {
            this.setState({currentOrder: response.data})
            this.setState({foodCountInOrder: calcFoodCount(response.data)});
        })
        .catch((error) => {
            console.log(error);
        });
    }
    decreaseFood(index) {
        let tempOrder = this.state.currentOrder.slice()
        tempOrder[index].count -= 1
        if (tempOrder[index].count < 0) {
            return;
        }
        this.setState({currentOrder: tempOrder})
        
        axios.delete('http://localhost:8080/food/' + this.state.restaurantId, {params: {
            foodName: this.state.currentOrder[index].name,
            count: 1
        }})
        .then((response) => {
            this.setState({currentOrder: response.data})
            this.setState({foodCountInOrder: calcFoodCount(response.data)});
        })
        .catch((error) => {
            console.log(error);
        });
    }
    increaseCurrentFood() {
        this.setState({curFoodCount: this.state.curFoodCount + 1})
    }
    decreaseCurrentFood() {
        if (this.state.curFoodCount < 0)
            return;
        this.setState({curFoodCount: this.state.curFoodCount - 1})
    }
    addFoodFromModal() {
        var curIdx = this.state.curIdx
        var curFoodCount = this.state.curFoodCount
        axios.put('http://localhost:8080/food/' + this.state.restaurantId, null, {params: {
            foodName: this.state.menu[curIdx].name,
            count: curFoodCount
        }})
        .then((response) => {
            this.setState({currentOrder: response.data})
            this.setState({foodCountInOrder: calcFoodCount(response.data)});
        })
        .catch((error) => {
            console.log(error);
            toast.error('همه ی غذا ها باید از یک رستوران باشند', {containerId: 'differentRestaurant'});
        });
        this.hideFoodModal();
    }
    finalizeOrder() {
        axios.put('http://localhost:8080/order')
        .then((response) => {
            this.setState({currentOrder: null})
        })
        .catch((error) => {
            console.log(error);
            toast.error('موجودی حساب شما کافی نیست.', {containerId: 'notEnoughCredit'});
        });
        this.setState({foodCountInOrder: 0});
        this.setState({showCartModal: false})
        this.forceUpdate();
    }
    showCart() {
        this.setState({showCartModal: true})
    }
    hideCart() {
        this.setState({showCartModal: false})
    }

    render() {
        if (this.state.loading === true || this.state.displayMessage === false)
            return (
                <div id ="center" className="spinnerDiv">
                    <Spinner animation="border" variant="success" />
                </div>
                
            )
        return (
            <div>
                <ToastContainer enableMultiContainer containerId={'differentRestaurant'} type = {toast.TYPE.ERROR} position={toast.POSITION.TOP_CENTER} />
                <ToastContainer enableMultiContainer containerId={'notEnoughCredit'} type = {toast.TYPE.ERROR} position={toast.POSITION.TOP_CENTER} />
                
                <Navbar reservedFoods = {this.state.foodCountInOrder} showCart = {this.showCart}  userAccountField = {true}/>
                <CartModal currentOrder = {this.state.currentOrder} show = {this.state.showCartModal} hideModal = {this.hideCart} finalize = {this.finalizeOrder} increaseButton = {this.increaseFood} decreaseButton = {this.decreaseFood}/>
                
                <Header empty = {true}/>
                <div>
                    <img src={this.state.restaurantImageUrl} alt="restaurant logo" class="myRestaurantLogo"/>
                    <p class="myRestaurantName">{this.state.restaurantName}</p>
                </div>

                <div class="myRestaurantContainer">
                    <div class="row">
                        <div class="col-4">
                            <FoodCart order = {this.state.currentOrder} finalize = {this.finalizeOrder} increaseButton = {this.increaseFood} decreaseButton = {this.decreaseFood} />
                        </div>
                        <div class="order-2 menu">
                            <div class = "menuTitle">
                                <h3 class="card-title centerText menuTitleLabel">منوی غذا</h3>
                                <hr class="myMenuTitleHr"/>
                            </div>
                            {this.renderFoodCards()}
                        </div>

                        <div class="order-1 divisorDiv">
                            <div class="d-flex myCartMenuDivisor">
                                <div class="myCartMenuDivisorBorder">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal 
                    show={this.state.dialogShow} 
                    onHide={this.hideFoodModal}
                    centered 
                >
                    <Modal.Body class = "normalModal">
                        <div class = "foodModalTitle col">
                            <p class="text-center">{this.state.restaurantName}</p>
                        </div>
                        <div class = "foodModalBody row">
                            <div class = "col-5">
                                <img className = "modalFoodImage" src = {this.state.menu[this.state.curIdx].imageUrl} alt="food-pic"/>
                            </div>
                            <div class = "col-7">
                                <div className = "modalFoodName row height-30">
                                    <p className = "modalFoodNameLabel"><strong>{this.state.menu[this.state.curIdx].name}</strong></p>
                                    <i className="flaticon-star modalStar"></i>
                                    <p className = "modalFoodScore">{toPersianNum(this.state.menu[this.state.curIdx].popularity)}</p>
                                </div>
                                <div className = "row height-30 myDescriptionDiv">
                                    <p className = "modalFoodDescriptionLabel">{this.state.menu[this.state.curIdx].description}</p>
                                </div>
                                <div className = "row height-30">
                                    <p className = "modalFoodPriceLabel">{toPersianNum(this.state.menu[this.state.curIdx].price)} تومان</p>
                                </div>
                           </div>
                        </div>
                        <hr class="modalFoodHr"/>
                        <div class = "row foodModalFooter">
                            <div class = "col-7">          
                                <div className="d-flex ml-2 myNotFirstFood">
                                    <div className="ml-auto p-2"></div>
                                    <div className="mt-2 incDecDiv">
                                        <div className="d-flex flex-row">
                                            <a className="plusButton" onClick={this.increaseCurrentFood}>
                                                <i className="flaticon-plus"></i>
                                            </a>
                                            <p className="pl-3">{toPersianNum(this.state.curFoodCount)}</p>
                                            <a className="minusButton" onClick={this.decreaseCurrentFood}>
                                                <i className="flaticon-minus"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = "col-5">
                                <button  type="button" className="btn modalConfirmBtn" onClick = {this.addFoodFromModal}>افزودن به سبد خرید</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                <Footer />
            </div>
        )
    }
}

export default Restaurant;
