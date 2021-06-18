import React, {useContext, useEffect} from 'react';
import {GoogleLogout} from "react-google-login";
import {Context} from '../Context'
import { useHistory } from 'react-router-dom';

const Logout = (props) => {

    const {GOOGLE_CLIENT_ID} = useContext(Context)
    const {isLoggedIn, setLoggedIn} = useContext(Context);
    let history = useHistory();

    useEffect( () => {
        console.log('logging out')
        logout()
    })

    const logout = response => {
        history.push('..')
        localStorage.clear();
        setLoggedIn(false)
        // window.location.reload();
    }

    const handleLogoutFailure = response => {
        console.log('Failed to log out')
    }
    return(
        <GoogleLogout
            clientId={ GOOGLE_CLIENT_ID }
            // buttonText='Logout'
            onLogoutSuccess={logout}
            onFailure={handleLogoutFailure}
        />
    )
}

export default Logout;