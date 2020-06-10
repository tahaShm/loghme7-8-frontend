import React, { Component } from 'react';
import logo from '../images/LOGO.png';
import isStringFarsi from '../utils/PersianText';
import isFarsiNumber from '../utils/PersianNumber';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/font/flaticon.css'
import '../styles/main.css'
import Footer from '../components/Footer';
import axios from 'axios';
import GoogleBtn from '../components/GoogleBtn';
import { ToastContainer, toast } from 'react-toastify';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.showSignup = this.showSignup.bind(this);
        this.showLogin  = this.showLogin.bind(this);
        this.setEmailLogin  = this.setEmailLogin.bind(this);
        this.setPasswordLogin  = this.setPasswordLogin.bind(this);
        this.fetchProfile  = this.fetchProfile.bind(this);
        this.authenticateWithGoogle  = this.authenticateWithGoogle.bind(this);
        this.clearFields  = this.clearFields.bind(this);

        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.signupRef = React.createRef();
        this.loginRef = React.createRef();
        this.emailLoginRef = React.createRef();
        this.passwordLoginRef = React.createRef();

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            emailLogin: '',
            passwordLogin: '',
            inSignup: true
        }
    }

    componentWillMount() {
        this.checkAuthentication();
    }

    async checkAuthentication() {
        if (localStorage.getItem('token') !== '') {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };
            axios.get('http://ie.etuts.ir:32100/checkAuth', config)
            .then((response) => {
                this.fetchProfile();
                window.location.href = '/home';
            })
            .catch((error) => {
                console.log(error)
            });
        }
    }

    setFirstName(event) {
        this.setState({firstName: event.target.value});
        this.firstNameRef.current.style.borderColor = 'gray';
    }
    setLastName(event) {
        this.setState({lastName: event.target.value});
        this.lastNameRef.current.style.borderColor = 'gray';
    }
    setEmail(event) {
        this.setState({email: event.target.value});
        this.emailRef.current.style.borderColor = 'gray';
    }
    setPassword(event) {
        this.setState({password: event.target.value});
        this.passwordRef.current.style.borderColor = 'gray';
    }

    clearFields() {
        this.setState({
            firstName : '',
            lastName : '',
            email : '',
            password : '',
            emailLogin : '',
            passwordLogin : ''
        });
    }

    handleSignup(event) {
        var validInput = true;
        // First Name
        if (this.state.firstName == null || this.state.firstName === "") {
            this.firstNameRef.current.style.borderColor = 'red';
            this.firstNameRef.current.placeholder = 'پر کردن این قسمت الزامی است!';
            validInput = false;
        }
        else if (!isStringFarsi(this.state.firstName)) {
            this.setState({firstName : ''});
            this.firstNameRef.current.style.borderColor = 'red';
            this.firstNameRef.current.placeholder = 'از حروف فارسی استفاده کنید!';
            validInput = false;
        }
        // Last Name
        if (this.state.lastName == null || this.state.lastName === "") {
            this.lastNameRef.current.style.borderColor = 'red';
            this.lastNameRef.current.placeholder = 'پر کردن این قسمت الزامی است!';
            validInput = false;
        }
        else if (!isStringFarsi(this.state.lastName)) {
            this.setState({lastName : ''});
            this.lastNameRef.current.style.borderColor = 'red';
            this.lastNameRef.current.placeholder = 'از حروف فارسی استفاده کنید!';
            validInput = false;
        }
        // Email
        if (this.state.email == null || this.state.email === "") {
            this.emailRef.current.style.borderColor = 'red';
            this.emailRef.current.placeholder = 'پر کردن این قسمت الزامی است!';
            validInput = false;
        }
        else if (!this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            this.setState({email : ''});
            this.emailRef.current.style.borderColor = 'red';
            this.emailRef.current.placeholder = 'ایمیل وارد شده معتبر نیست!';
            validInput = false;
        }
        // Password
        if (this.state.password == null || this.state.password === "") {
            this.passwordRef.current.style.borderColor = 'red';
            this.passwordRef.current.placeholder = 'پر کردن این قسمت الزامی است!';
            validInput = false;
        }

        // Signup
        if (validInput) {
            axios({
                method: 'post',
                url: 'http://ie.etuts.ir:32100/signup',
                data: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                    issuer: "ie.etuts.ir:32000"
                }
                })
                .then((response) => {
                    localStorage.setItem('token', response.data);
                    this.fetchProfile();
                    window.location.href = '/home';
                })
                .catch((error) => {
                    toast.error('ایمیل وارد شده قبلا استفاده شده است', {containerId: 'wrongSignup'});
                    this.clearFields();
                    console.log(error)
                });
        }
    }

    setEmailLogin(event) {
        this.setState({emailLogin: event.target.value});
        this.emailLoginRef.current.style.borderColor = 'gray';
    }
    setPasswordLogin(event) {
        this.setState({passwordLogin: event.target.value});
        this.passwordLoginRef.current.style.borderColor = 'gray';
    }
    handleLogin(event) {
        var validInput = true;
        // Email
        if (this.state.emailLogin == null || this.state.emailLogin === "") {
            this.emailLoginRef.current.style.borderColor = 'red';
            this.emailLoginRef.current.placeholder = 'پر کردن این قسمت الزامی است!';
            validInput = false;
        }
        else if (!this.state.emailLogin.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            this.setState({emailLogin : ''});
            this.emailLoginRef.current.style.borderColor = 'red';
            this.emailLoginRef.current.placeholder = 'ایمیل وارد شده معتبر نیست!';
            validInput = false;
        }
        // Password
        if (this.state.passwordLogin == null || this.state.passwordLogin === "") {
            this.passwordLoginRef.current.style.borderColor = 'red';
            this.passwordLoginRef.current.placeholder = 'پر کردن این قسمت الزامی است!';
            validInput = false;
        }
        // Login
        if (validInput) {
            axios({
                method: 'post',
                url: 'http://ie.etuts.ir:32100/login',
                data: {
                    email: this.state.emailLogin,
                    password: this.state.passwordLogin,
                    authWithGoogle: false,
                    issuer: "ie.etuts.ir:32000"
                }
                })
                .then((response) => {
                    localStorage.setItem('token', response.data);
                    this.fetchProfile();
                    window.location.href = '/home';
                })
                .catch((error) => {
                    toast.error('نام کاربری یا رمز عبور اشتباه است', {containerId: 'wrongLogin'});
                    this.clearFields();
                    console.log(error)
                });
        }
    }
    showSignup(event) {
        this.setState({inSignup: true})
        this.signupRef.current.style.visibility = 'visible';
        this.signupRef.current.style.display = 'block';
        this.loginRef.current.style.visibility = 'hidden';
        this.loginRef.current.style.display = 'none';
        this.forceUpdate();
    }
    showLogin(event) {
        this.setState({inSignup: false})
        this.loginRef.current.style.visibility = 'visible';
        this.loginRef.current.style.display = 'block';
        this.signupRef.current.style.visibility = 'hidden';
        this.signupRef.current.style.display = 'none';
        this.forceUpdate();
    }

    authenticateWithGoogle(email) {
        axios({
            method: 'post',
            url: 'http://ie.etuts.ir:32100/login',
            data: {
                email: email,
                authWithGoogle: true,
                issuer: "ie.etuts.ir:32000"
            }
            })
            .then((response) => {
                localStorage.setItem('token', response.data);
                this.fetchProfile();
                window.location.href = '/home';
            })
            .catch((error) => {
                toast.error('این نام کاربری وجود ندارد!', {containerId: 'wrongLogin'});
                console.log(error)
            });
    }

    fetchProfile() {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        axios.get('http://ie.etuts.ir:32100/profile', config)
            .then(function(response) {
                localStorage.setItem('firstName', response.data.firstName)
                localStorage.setItem('lastName', response.data.lastName)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('credit', response.data.credit)
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    render() {
        let rightButton = 'btn myRightTabButton';
        let leftButton = 'btn myLeftTabButton';
        if (this.state.inSignup) {
            rightButton += ' myActiveTab';
            leftButton += ' myNotActiveTab';
        }
        else {
            rightButton += ' myNotActiveTab';
            leftButton += ' myActiveTab';
        }
        document.body.classList.add('mySignupBody');
        return (
            <div>
                <ToastContainer enableMultiContainer containerId={'wrongLogin'} type = {toast.TYPE.ERROR} position={toast.POSITION.TOP_CENTER} />
                <ToastContainer enableMultiContainer containerId={'wrongSignup'} type = {toast.TYPE.ERROR} position={toast.POSITION.TOP_CENTER} />
                <div>
                    <header>         
                        <img className="mySignupLogo" src={logo} alt="logo"/>
                        <p className ="myGreetingMsg">اولین و بزرگترین وب سایت سفارش آنلاین غذا در دانشگاه تهران</p>
                    </header>

                    <div className="mySignupTab">
                        <div className="d-flex justify-content-center">
                            <button type="button" className={rightButton} onClick={this.showSignup}>ثبت نام</button>
                            <button type="button" className={leftButton} onClick={this.showLogin}>ورود</button>
                        </div>
                        <div ref={this.signupRef} className="active card myMiddleCard myCardBorder mySignupCard">
                            <div className="card-body">
                                <div className="container">
                                    <div className="row justify-content-center signUpRow">
                                        <div className="col-4 signUpCol ">نام</div>
                                        <div className="col-6">
                                            <input type="text" className="form-control mySignUpInput" value={this.state.firstName} onChange={this.setFirstName} ref={this.firstNameRef}/>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className = "col-9 separatorLine"></div>
                                    </div>

                                    <div className="row justify-content-center signUpRow">
                                        <div className="col-4 signUpCol ">نام خانوادگی</div>
                                        <div className="col-6">
                                            <input type="text" className="form-control mySignUpInput" value={this.state.lastName} onChange={this.setLastName} ref={this.lastNameRef}/>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className = "col-9 separatorLine"></div>
                                    </div>

                                    <div className="row justify-content-center signUpRow">
                                        <div className="col-4 signUpCol ">ایمیل</div>
                                        <div className="col-6">
                                            <input type="email" className="form-control mySignUpInput" value={this.state.email} onChange={this.setEmail} ref={this.emailRef}/>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className = "col-9 separatorLine"></div>
                                    </div>

                                    <div className="row justify-content-center signUpRow">
                                        <div className="col-4 signUpCol ">رمز عبور</div>
                                        <div className="col-6">
                                            <input type="password" className="form-control mySignUpInput" value={this.state.password} onChange={this.setPassword} ref={this.passwordRef}/>
                                        </div>
                                    </div>

                                    <div className="row justify-content-center">
                                        <div className="col-4">
                                            <button type="button" className="btn myCreditBtn" onClick={this.handleSignup}>ثبت نام</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div ref={this.loginRef} className="active card myMiddleCard myCardBorder mySignupCard myHiddenDiv">
                            <div className="card-body">
                                <div className="container">
                                    <div className="row justify-content-center signUpRow">
                                        <div className="col-4 signUpCol">ایمیل</div>
                                        <div className="col-6">
                                            <input type="text" className="form-control mySignUpInput" value={this.state.emailLogin} onChange={this.setEmailLogin} ref={this.emailLoginRef}/>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className = "col-9 separatorLine"></div>
                                    </div>

                                    <div className="row justify-content-center signUpRow">
                                        <div className="col-4 signUpCol ">رمز عبور</div>
                                        <div className="col-6">
                                            <input type="password" className="form-control mySignUpInput" value={this.state.passwordLogin} onChange={this.setPasswordLogin} ref={this.passwordLoginRef}/>
                                        </div>
                                    </div>

                                    <div className="row justify-content-center">
                                        <div className="col-4">
                                            <button type="button" className="btn myCreditBtn" onClick={this.handleLogin}>ورود</button>
                                        </div>
                                        <GoogleBtn onClick={this.authenticateWithGoogle}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
} 

export default Signup;