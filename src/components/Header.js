import React, { Component } from 'react';
import toPersianNum from '../utils/PersianNumber'

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: '',
            name: '',
            phoneNumber: '',
            email: '',
            credit: '',
        }
    }
    componentDidMount() {
        this.setState({imageUrl : this.props.imageUrl ? this.props.imageUrl : ''})
        this.setState({name : this.props.name})
        this.setState({phoneNumber : this.props.phoneNumber})
        this.setState({email : this.props.email})
        this.setState({credit : this.props.credit})
    }
    componentWillReceiveProps(nextProps) {
        this.setState({credit: nextProps.credit});
    }
    render() {
        if (this.props.empty === "" || this.props.empty == null || this.props.empty === false)
            return (
                <header className = "myHeader">
                    <div className="d-flex align-items-center h-100">
                        <div className="d-flex align-items-center h-50 flex-fill text-right myHeader-right">
                            <i className="flaticon-account myHeader-accountIcon"></i>
                            <label className ="myHeader-name">{this.state.name}</label>
                        </div>
                        <div className="flex-fill text-right myHeader-left">
                            <div className = "d-flex align-items-center">
                                <i className="flaticon-phone myHeader-leftIcon"></i>
                                <label className = "myHeader-info">{toPersianNum(this.state.phoneNumber)}</label>  
                            </div>
                            <div className = "d-flex align-items-center">
                                <i className="flaticon-mail myHeader-leftIcon"></i>
                                <label className = "myHeader-info">{this.state.email}</label>  
                            </div>
                            <div className = "d-flex align-items-center">
                                <i className="flaticon-card myHeader-leftIcon"></i>
                                <label className = "myHeader-info">{toPersianNum(this.state.credit)} تومان</label>  
                            </div>
                        </div>
                    </div>
                </header>
            )
        else if (this.props.empty === true)
            return(
                <header className = "myHeader">
                </header>
            )
    }
}

export default Header;