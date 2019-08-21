import React,{Component} from 'react';
import {withRouter} from 'react-router-dom'
class RazorpayButton extends Component{
    componentDidMount(){
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }

    placeOrder = (paymentId) => {
        this.props.placeOrder(paymentId).then((res) =>{
            this.props.history.push('/')
        });
    }
    
    paymentHandler = (e) => {
        e.preventDefault();
        let options = {
            "key": process.env.REACT_APP_RAZORPAY_CLIENT_ID,
            "amount": this.props.total, 
            "name": "E-Mobile",
            "description": "Order Mobile",
            "image": "/image/logo.png",
            "handler": (response) => {
                this.placeOrder(response.razorpay_payment_id);
            },
            "theme": {
                "color": "#F37254"
            }
        };
        
        let rzp = new window.Razorpay(options);
        rzp.open();
    }
    render(){
        const {readyForPay} = this.props;
        return(
            <button className="btn btn-warning btn-lg my-5"
                onClick={this.paymentHandler} disabled={!readyForPay?'disabled':''}
            >Click Here To Pay</button>
        )
    }
}

export default withRouter(RazorpayButton);
