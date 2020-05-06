import React, { Component } from 'react';
import Logo from '../images/LOGO.png'
import toPersianNum from '../utils/PersianNumber'

class Navbar extends Component {
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
    componentWillReceiveProps(nextProps) {
        this.setState({reservedFoods: nextProps.reservedFoods});
    }
    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-light fixed-top">
                <div className="mx-3">
                    <a className="navbar-brand" href="http://localhost:3000/home">
                        <img className = "myNav-logo" src={Logo} alt="logo"/>
                    </a>
                </div>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className = "myNav-cartLink" onClick = {this.props.showCart}>
                            <i className="flaticon-smart-cart myNav-cart"></i>
                            <span className = "myNav-badgeLabel">
                                <span className=" myNav-badge">{toPersianNum(this.state.reservedFoods)}</span>
                            </span>
                        </a>
                    </li>
                    {this.state.userAccountField &&
                        <li className="nav-item">
                            <a className="nav-link myNav-account" href="http://localhost:3000/profile">حساب کاربری</a>
                        </li>
                    }
                    <li className="nav-item mx-3">
                        <a className="nav-link myNav-exit" href="">خروج</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;