import React, { Component } from 'react';
import {login} from '../../../store/actions/';
import {connect} from 'react-redux';
import GoogleButton from '../../presentational/auth/GoogleLoginButton';
//import FaceBookButton from '../../presentational/auth/FaceBookLoginButton';

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            login:{
                username:'',
                password:''
            }
        }
    }
    
    handleChange = e => {
        let login = this.state.login;
        login[[e.target.id]] = e.target.value;
        this.setState({
            login
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const user = {...this.state.login}
        this.props.login(user);
        const login = {...user}
        for(const key of Object.keys(login)){
            login[key] = ''
        }
        this.setState({
            login
        });
    }

    render() {
        const {login} = this.state
        const {loginError} = this.props;

        return (
            <div id="login" className="tab-pane fade show active" role="tabpanel">
                <h4 className="card-title mt-3 text-center">Login Account</h4>
                <div className="text-danger text-center my-2">{loginError}</div>
                <div>
                    <GoogleButton/>
                    {/* <FaceBookButton/> */}

                    {/* <button className="btn btn-block btn-google" onClick={this.gClick}> <i className="fab fa-google"></i>   Login via Google</button>
                    <a href="" className="btn btn-block btn-facebook"> <i className="fab fa-facebook-f"></i>   Login via facebook</a> */}
                    
                </div>

                <p className="divider-text">
                    <span className="bg-light">OR</span>
                </p>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                        </div>
                        <input className="form-control" placeholder="Email" type="text" id = "username" 
                            value={login.username} onChange = {this.handleChange} required
                        />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                        </div>
                        <input className="form-control" placeholder="Password" type="password" id="password"
                            value={login.password} onChange = {this.handleChange} required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block"> Login  </button>
                    </div>
                    <p className="text-center">New User? <a data-toggle="tab" href="#register">Sign Up</a> </p>
                </form>
            </div> 
        )
    }
}

const mapStateToProps = state => ({
    loginError: state.auth.loginErrorMessage
});

export default connect(mapStateToProps,{login})(Login);
