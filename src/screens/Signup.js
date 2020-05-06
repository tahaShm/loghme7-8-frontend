import React, { Component } from 'react';
import logo from '../images/LOGO.png';
import isStringFarsi from '../utils/PersianText';
import isFarsiNumber from '../utils/PersianNumber';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/font/flaticon.css'
import '../styles/main.css'
import Footer from '../components/Footer';
import axios from 'axios'

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

    handleSignup(event) {
        // First Name
        if (this.state.firstName == null || this.state.firstName === "") {
            this.firstNameRef.current.style.borderColor = 'red';
            this.firstNameRef.current.placeholder = 'پر کردن این قسمت الزامی است!';
        }
        else if (!isStringFarsi(this.state.firstName)) {
            this.setState({firstName : ''});
            this.firstNameRef.current.style.borderColor = 'red';
            this.firstNameRef.current.placeholder = 'از حروف فارسی استفاده کنید!';
        }
        // Last Name
        if (this.state.lastName == null || this.state.lastName === "") {
            this.lastNameRef.current.style.borderColor = 'red';
            this.lastNameRef.current.placeholder = 'پر کردن این قسمت الزامی است!';
        }
        else if (!isStringFarsi(this.state.lastName)) {
            this.setState({lastName : ''});
            this.lastNameRef.current.style.borderColor = 'red';
            this.lastNameRef.current.placeholder = 'از حروف فارسی استفاده کنید!';
        }
        // Email
        if (this.state.email == null || this.state.email === "") {
            this.emailRef.current.style.borderColor = 'red';
            this.emailRef.current.placeholder = 'پر کردن این قسمت الزامی است!';
        }
        else if (!this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            this.setState({email : ''});
            this.emailRef.current.style.borderColor = 'red';
            this.emailRef.current.placeholder = 'ایمیل وارد شده معتبر نیست!';
        }
        // Password
        if (this.state.password == null || this.state.password === "") {
            this.passwordRef.current.style.borderColor = 'red';
            this.passwordRef.current.placeholder = 'پر کردن این قسمت الزامی است!';
        }

        // Signup
        if (this.state.firstName != '' && this.state.lastName != '' && this.state.email != '' && this.state.password != '') {
            axios({
                method: 'put',
                url: 'http://localhost:8080/profile',
                data: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                    issuer: "localhost:8080"
                }
                })
                .then((response) => {
                    localStorage.setItem('token', response.data);
                })
                .catch((error) => {
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
        // Email
        if (this.state.emailLogin == null || this.state.emailLogin === "") {
            this.emailLoginRef.current.style.borderColor = 'red';
            this.emailLoginRef.current.placeholder = 'پر کردن این قسمت الزامی است!';
        }
        else if (!this.state.emailLogin.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            this.setState({emailLogin : ''});
            this.emailLoginRef.current.style.borderColor = 'red';
            this.emailLoginRef.current.placeholder = 'ایمیل وارد شده معتبر نیست!';
        }
        // Password
        if (this.state.passwordLogin == null || this.state.passwordLogin === "") {
            this.passwordLoginRef.current.style.borderColor = 'red';
            this.passwordLoginRef.current.placeholder = 'پر کردن این قسمت الزامی است!';
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