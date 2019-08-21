import React, { Component } from 'react'
import {register} from '../../../store/actions/';
import {connect} from 'react-redux'

export class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            register : {
                name: '',
                email: '',
                password: ''
            }
        }
    }
    handleChange = (e) => {
        let register = this.state.register;
        register[[e.target.id]] = e.target.value;
        this.setState({
            register
        });
    } 

    submitUserInfo = (e) => {
        e.preventDefault();
        const user = {...this.state.register}
        this.props.register(user);
        const register = {...user}
        for(const key of Object.keys(register)){
            register[key] = ''
        }
        this.setState({
            register:register
        });
    }

    render() {
        const {register} = this.state;
        const {registerMessage,status} = this.props;
        
        return (
            <div id="register" className="tab-pane fade show" role="tabpanel">
                <h4 className="card-title mt-3 text-center">Create Account</h4>
                <h6 className = {status ? 'text-success' : 'text-danger'}>{registerMessage}</h6>
        	    <form onSubmit={this.submitUserInfo}>
        	        <div className="form-group input-group">
        		        <div className="input-group-prepend">
        		            <span className="input-group-text"> <i className="fa fa-user"></i> </span>
        		        </div>
                        <input className="form-control" id="name" placeholder="Full name" type="text" value={register.name} onChange = {this.handleChange}/>
                    </div>
                    
                    <div className="form-group input-group">
            	        <div className="input-group-prepend">
        		            <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
        		        </div>
                        <input name="" className="form-control" id="email" placeholder="Email address" type="email" value={register.email} onChange = {this.handleChange}/>
                    </div>
                    
                    <div className="form-group input-group">
            	        <div className="input-group-prepend">
        		            <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
        		        </div>
                        <input className="form-control" id="password" placeholder="Create password" type="password" value={register.password} onChange = {this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block"> Create Account  </button>
                    </div>
                    <p className="text-center">Have an account? <a href="#login" data-toggle="tab">Log In</a> </p>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    registerMessage: state.auth.registerMessage,
    status: state.auth.registerStatus
});

export default connect(mapStateToProps,{register})(Register)
