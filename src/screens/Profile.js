import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import '../styles/font/flaticon.css'
import '../styles/main.css'
import Navbar from '../components/Navbar';
import CartModal from '../components/CartModal';
import Header from '../components/Header';
import OrderRow from '../components/OrderRow'
import Footer from '../components/Footer';
import toPersianNum from '../utils/PersianNumber';
import axios from 'axios';
import calcFoodCount from '../utils/OrderCounter';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        
        this.setCredit  = this.setCredit.bind(this);
        this.handleIncreaseCredit = this.handleIncreaseCredit.bind(this)
        this.showOrders = this.showOrders.bind(this);
        this.showCredit = this.showCredit.bind(this);
        this.showFactor = this.showFactor.bind(this); 
        this.hideFactor = this.hideFactor.bind(this);
        this.increaseFood = this.increaseFood.bind(this)
        this.decreaseFood = this.decreaseFood.bind(this)
        this.finalizeOrder = this.finalizeOrder.bind(this)
        this.showCart = this.showCart.bind(this)
        this.hideCart = this.hideCart.bind(this)

        this.orderRef = React.createRef();
        this.creditRef = React.createRef();
        this.creditInputRef = React.createRef();

        this.state = {
            inOrders: true,
            credit: 0,
            userCredit: localStorage.getItem('credit'),
            showCartModal: false,
            wrongCredit: false,
            currentOrder: [],
            orders: [],
            dialogShow: false,
            orderInCart: [],
            foodCountInOrder: 0
        }
    }
    fetchCurrentOrder = () => {
        axios.get('http://localhost:8080/currentOrder')
        .then((response) => {
            this.setState({
                orderInCart: response.data,
                foodCountInOrder: calcFoodCount(response.data)
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }
    setCredit(event) {
        this.setState({credit: event.target.value});
        this.setState({wrongCredit: false})
        this.creditInputRef.current.style.borderColor = 'gray';
        this.creditInputRef.current.placeholder = "میزان افزایش اعتبار"
    }
    handleIncreaseCredit(event) {
        if (this.state.credit == null || this.state.credit === '' || isNaN(this.state.credit)) {
            this.setState({wrongCredit: true})
            this.setState({credit: ""})
            this.creditInputRef.current.style.borderColor = 'red';
            if (isNaN(this.state.credit))
                this.creditInputRef.current.placeholder = 'اعتبار باید یک عدد باشد!';
            else
                this.creditInputRef.current.placeholder = 'میزان افزایش اعتبار را مشخص کنید!';
        }
        
        axios({
            method: 'post',
            url: 'http://localhost:8080/credit',
            data: {
                credit: this.state.credit
            }
            })
            .then((response) => {
                localStorage.setItem('credit', response.data);
                this.setState({userCredit: localStorage.getItem('credit')});
            })
            .catch((error) => {
                console.log(error)
            });

        this.setState({credit: 0});
    }
    showOrders() {
        this.setState({inOrders: true})
        this.orderRef.current.style.visibility = 'visible';
        this.orderRef.current.style.display = 'block';
        this.creditRef.current.style.visibility = 'hidden';
        this.creditRef.current.style.display = 'none';
        this.forceUpdate();
    }
    showCredit() {
        this.setState({inOrders: false})
        this.creditRef.current.style.visibility = 'visible';
        this.creditRef.current.style.display = 'block';
        this.orderRef.current.style.visibility = 'hidden';
        this.orderRef.current.style.display = 'none';
        this.forceUpdate();
    }
    showFactor(order) {
        this.setState({currentOrder: order})
        this.setState({dialogShow: true})
    }
    hideFactor(){
        this.setState({dialogShow: false})
    }
    showOrder = (order, i) => {
        return  <OrderRow id = {i+1} restaurantName = {order.restaurantName} status = {order.status} onButtonClick = {(e) => this.showFactor(order)} />
    }
    hideCart() {
        this.setState({showCartModal: false})
    }
    renderOrders(){
        if (this.state.orders)
        return (
            <div className="container">
            {   
                this.state.orders.map(this.showOrder, this)
            }
            </div>
        )
    }
    renderCurrentOrder() {
        if (this.state.currentOrder != null && this.state.currentOrder.foods != null){
            return (
                this.state.currentOrder.foods.map(function(food, i){
                    return (
                        <tr>
                            <th scope="row">{toPersianNum(i + 1)}</th>
                            <td>{food.name}</td>
                            <td>{toPersianNum(food.count)}</td>
                            <td>{toPersianNum(food.price)}</td>
                        </tr>
                    )
                })
            )}
    }
    calculateTotalPrice() {
        var totalPrice = 0;
        var foods = this.state.currentOrder.foods;
        
        if (foods != null && foods.length != 0){
            foods.forEach(function (food) {
                totalPrice += food.count * food.price
            });
        }
        return totalPrice;
    }
    componentDidMount() {
        this.fetchCurrentOrder();
        axios.get('http://localhost:8080/order')
            .then((response) => {
                this.setState({orders: response.data});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    showCart() {
        this.setState({showCartModal: true})
    }
    increaseFood = (index) => {
        let tempOrder = this.state.orderInCart.slice()
        tempOrder[index].count += 1
        this.setState({orderInCart: tempOrder})
        
        Axios.put('http://localhost:8080/food/' + this.state.restaurantId, null, {params: {
            foodName: this.state.orderInCart[index].name,
            count: 1
        }})
        .then((response) => {
            this.setState({orderInCart: response.data})
            this.setState({foodCountInOrder: calcFoodCount(response.data)});
        })
        .catch((error) => {
            console.log(error);
        });
    }
    decreaseFood = (index) => {
        let tempOrder = this.state.orderInCart.slice()
        tempOrder[index].count -= 1
        if (tempOrder[index].count < 0) {
            return;
        }
        this.setState({orderInCart: tempOrder})
        
        Axios.delete('http://localhost:8080/food/' + this.state.restaurantId, {params: {
            foodName: this.state.orderInCart[index].name,
            count: 1
        }})
        .then((response) => {
            this.setState({orderInCart: response.data})
            this.setState({foodCountInOrder: calcFoodCount(response.data)});
        })
        .catch((error) => {
            console.log(error);
        });
    }
    finalizeOrder() {
        Axios.put('http://localhost:8080/order')
        .then((response) => {
            this.setState({orderInCart: null})
        })
        .catch((error) => {
            console.log(error);
            toast.error('موجودی حساب شما کافی نیست.', {containerId: 'notEnoughCredit'});
        });
        this.setState({foodCountInOrder: 0});
        this.setState({showCartModal: false})
        this.forceUpdate();
    }


    render() {
        let rightButton = 'btn myRightTabButton';
        let leftButton = 'btn myLeftTabButton';
        if (this.state.inOrders) {
            rightButton += ' myActiveTab';
            leftButton += ' myNotActiveTab';
        }
        else {
            rightButton += ' myNotActiveTab';
            leftButton += ' myActiveTab';
        }
        let creditPlaceholder = ''
        if (this.state.wrongCredit) {
            creditPlaceholder = ' warningInput'
        }
        return (
            <div>
                <ToastContainer enableMultiContainer containerId={'differentRestaurant'} type = {toast.TYPE.ERROR} position={toast.POSITION.TOP_CENTER} />
                <ToastContainer enableMultiContainer containerId={'notEnoughCredit'} type = {toast.TYPE.ERROR} position={toast.POSITION.TOP_CENTER} />
                <Navbar reservedFoods = {this.state.foodCountInOrder} showCart = {this.showCart}/>
                <CartModal currentOrder = {this.state.orderInCart} show = {this.state.showCartModal} hideModal = {this.hideCart} finalize = {this.finalizeOrder} increaseButton = {this.increaseFood} decreaseButton = {this.decreaseFood}/>    
                <Header name = {localStorage.getItem('name')} phoneNumber = {localStorage.getItem('phoneNumber')} email = {localStorage.getItem('email')} credit={this.state.userCredit} />
                <div className="myTabs">
                    <div className="d-flex justify-content-center mb-n2">
                        <button type="button" className={rightButton} onClick = {this.showOrders}>سفارش ها</button>
                        <button type="button" className={leftButton} onClick = {this.showCredit}>افزایش اعتبار</button>
                    </div>
                    <div ref={this.orderRef} className="card myMiddleCard myCardBorder">
                        <div className="card-body">
                            {this.renderOrders()}
                        </div>
                    </div>
                    <div ref={this.creditRef} className="card myMiddleCard myCardBorder myHiddenDiv">
                        <div className="card-body">
                            <div className="container">
                                <div className="row justify-content-center myCreditRow">
                                    <div className="col-6">
                                        <input type="text" className={"form-control myCreditInp" + creditPlaceholder}  id="credit" placeholder="میزان افزایش اعتبار" value={this.state.credit} onChange={this.setCredit} ref={this.creditInputRef}/>
                                    </div>
                                    <div className="col-4">
                                        <button type="button" className="btn myCreditBtn" onClick={this.handleIncreaseCredit}>افزایش</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal 
                    show={this.state.dialogShow} 
                    onHide={this.hideFactor}
                    size = "lg"
                    centered 
                >
                    <Modal.Body class = "normalModal">
                        <div class = "profileModalTitle col">
                            <p class="text-center">{this.state.currentOrder.restaurantName}</p>
                        </div>
                        <hr class="profileModalHr"/>
                        <div class = "profileModalBody">
                            <table class="orderTable">
                                <thead class="pTHeadModal">
                                <tr>
                                    <th>ردیف</th>
                                    <th>نام غذا</th>
                                    <th>تعداد</th>
                                    <th>قیمت</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.renderCurrentOrder()}
                                </tbody>
                            </table>
                        </div>
                        <div class = "profileModalFooter">
                        <p class = "modalTotalPrice"><b>جمع کل: {toPersianNum(this.calculateTotalPrice())} تومان</b></p>
                        </div>
                    </Modal.Body>
                </Modal>
                <Footer />
            </div>
        )
    }
}

export default Profile;