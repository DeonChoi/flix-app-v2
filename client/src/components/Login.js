import React, {useContext} from 'react'
import { GoogleLogin } from 'react-google-login';
import {Context} from '../Context'
import '../styles/Login.css';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const Login = () => {

    let history = useHistory();
    const {GOOGLE_CLIENT_ID} = useContext(Context);
    // console.log(GOOGLE_CLIENT_ID)

    const handleSuccess = async (response) => {
        if (response.tokenId) {
            const userLogin = {
                email: response.profileObj.email,
            }
            console.log(response)
            await axios.post('/google/login', userLogin)
                .then( res => {
                    // console.log(res);
                    console.log('Logged In');
                    localStorage.setItem('google-auth-token', response.tokenId);
                    localStorage.setItem('google-email', response.profileObj.email);
                    history.push('..');
                    // window.location.reload();
                })
                .catch( err => console.error(err));

            console.log('logging in')
            // console.log(response.profileObj.email)
            history.push('..')
        }
        // console.log(response)
    }

    const handleFailure = response => {
        console.log(response);
        console.log('Failed to log in')
    }

    return (
        <div className='login-container'>
            <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                cookiePolicy="single_host_origin"
            >
            </GoogleLogin>
        </div>
    )
}

export default Login
