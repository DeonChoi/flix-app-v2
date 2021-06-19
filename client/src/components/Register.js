import React, {useContext} from 'react'
import { GoogleLogin } from 'react-google-login';
import {Context} from '../Context'
import '../styles/Login.css';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const Register = () => {
    let history = useHistory();
    const {GOOGLE_CLIENT_ID} = useContext(Context);

    const register = async (response) => {
        if (response.tokenId) {
            const newUser = {
                firstName: response.profileObj.givenName,
                lastName: response.profileObj.familyName,
                email: response.profileObj.email,
            }
            await axios.post('http://localhost:5000/user/register', newUser)
                .then(res => {
                    console.log(res)
                    console.log('Logged in')
                    history.push('../user/register/success')
                })
                .catch(err => console.log(err))
        }
    }

    const handleRegisterFailure = response => {
        console.log('Failed to register')
    }

    return (
        <div className='login-container'>
            <GoogleLogin
                clientId={ GOOGLE_CLIENT_ID }
                buttonText='Sign up with Google'
                onSuccess={ register }
                onFailure={ handleRegisterFailure }
                cookiePolicy={ 'single_host_origin' }
                responseType='code,token'
            />
        </div>
    )
}

export default Register
