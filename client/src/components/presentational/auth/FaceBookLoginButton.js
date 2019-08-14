import React from 'react'
import FacebookLogin from 'react-facebook-login';
import {facebookLogin,loginFail} from '../../../store/actions';
import {connect} from 'react-redux';

const FaceBookButton = ({facebookLogin,loginFail}) => {
    const responseFacebook = (response) => {
        if(response.accessToken){
            const loginData = {
                access_token : response.accessToken
            }
            facebookLogin(loginData);
        } else {
            loginFail('Error occoured !!! Please try again....');
        }
    }
    
    return (
        <div>
            <FacebookLogin
                appId= {REACT_APP_FACEBOOK_CLIENT_ID}
                autoLoad={false}
                fields="name,email,picture"
                cssClass= "btn btn-block btn-facebook"
                icon="fa-facebook"
                callback={responseFacebook} />
        </div>
    )
}

export default connect(null,{facebookLogin,loginFail})(FaceBookButton)
