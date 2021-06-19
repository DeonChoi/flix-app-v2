import React, {useContext} from 'react'
import { GoogleLogin } from 'react-google-login';
import {Context} from '../Context'
import '../styles/Login.css';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const Login = ({text}) => {

    const {isLoggedIn, setLoggedIn} = useContext(Context);
    let history = useHistory();
    const {GOOGLE_CLIENT_ID} = useContext(Context);

    const handleSuccess = async (response) => {
        if (response.tokenId) {
            setLoggedIn(true)
            const userLogin = {
                email: response.profileObj.email,
            }
            console.log(response)
            await axios.post('http://localhost:5000/user/login', userLogin)
                .then( res => {
                    console.log('Logged In');
                    localStorage.setItem('google-auth-token', response.tokenId);
                    localStorage.setItem('google-email', response.profileObj.email);
                    history.push('..');
                })
                .catch( err => console.error(err));
        }
    }

    const handleFailure = response => {
        console.log(response);
        console.log('Failed to log in')
    }

    return (
        <div className='login-container'>
            {text 
            ?   <div className='registration-success-message'>
                    <h3>{text}</h3>
                    <h6>Login to start saving flix to your watchlist!</h6>
                </div>
            :   null
            }
            
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
