import React from 'react'
import GoogleLogin from 'react-google-login';
import {googleLogin,loginFail} from '../../../store/actions';
import {connect} from 'react-redux';

const GoogleButton = ({googleLogin,loginFail}) => {
    const responseGoogle = (response) => {
        if(response.error){
            alert("Google OAuth (Open Authorization) will not work for this url")
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
                clientId= {process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login via Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            /> 
        </>
    )
}

export default connect(null,{googleLogin,loginFail})(GoogleButton);
