import React from 'react'
import GoogleLogin from 'react-google-login';
import {googleLogin,loginFail} from '../../../store/actions';
import {connect} from 'react-redux';

const GoogleButton = ({googleLogin,loginFail}) => {
    const responseGoogle = (response) => {
        if(response.error){
            loginFail('Error occoured !!! Please try again....');
        } else {
            const loginData = {
                access_token : response.accessToken
            }
            googleLogin(loginData);
        }
        
    }
    return (
        <>
            <GoogleLogin className="btn btn-block btn-google"
                clientId="11017181439-leav6t8hv5ckhg5b2dkd483o4kr9s6oo.apps.googleusercontent.com"
                buttonText="Login via Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            /> 
        </>
    )
}

export default connect(null,{googleLogin,loginFail})(GoogleButton);
