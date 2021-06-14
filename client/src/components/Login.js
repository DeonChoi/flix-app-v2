import React, {useContext} from 'react'
import { GoogleLogin } from 'react-google-login';
import {Context} from '../Context'
import '../styles/Login.css';

const Login = () => {
    const {GOOGLE_CLIENT_ID} = useContext(Context);
    console.log(GOOGLE_CLIENT_ID)
    const responseGoogle = response => {
        console.log(response);
    };

    return (
        <div className='login-container'>
            <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
            >
            </GoogleLogin>
        </div>
    )
}

export default Login
