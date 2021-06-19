import React, {useState,useEffect} from 'react'
import './App.css';
import Logo from './images/pix-logo-2.png'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {Context} from "./Context";

import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail";
import Search from "./components/Search";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import RegisterSuccess from './components/RegisterSuccess';

// require('dotenv').config();

const App = () => {

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('google-auth-token') !== null && localStorage.getItem('google-email') !== null);
  const [lastSearch, setLastSearch] = useState();
  const API_KEY = process.env.REACT_APP_API_KEY
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

  const goToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  useEffect( () => {
    const topButton = document.getElementById("topButton");
    window.addEventListener('scroll', () => {
      // console.log(window.scrollY)
        if (window.scrollY > 1500) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    })
  }, [])

  return (
    <Context.Provider value={{
      lastSearch, setLastSearch,
      API_KEY, GOOGLE_CLIENT_ID,
      loggedIn, setLoggedIn
    }}>
      <Router basename={'/'}>
        <header>
          <nav>
            <div className='nav-left'>
              <Link to={'/'}>
                <img src={Logo} alt=''/>
                <span>flix</span>
              </Link>
            </div>
            <div className='nav-right'>
              <Link to={'/'}>Search</Link>
              <Link to={'/watchlist'}>Watchlist</Link>
              
              {loggedIn 
              ?<Link to={'/user/logout'}>Logout</Link>
              : <>
                  <Link to={'/user/register'}>Register</Link>
                  <Link to={'/user/login'}>Login</Link>
                </>
              }
            </div>
          </nav>
        </header>
        <main>
          <Route exact path='/' component={Home} />
          <Route path='/movie/:id' component={MovieDetail} />
          <Route path='/search/:searchTerm' component={Search} />
          <Route exact path='/user/register' component={Register} />
          <Route exact path='/user/login' component={Login} />
          <Route exact path='/user/logout' component={Logout} />
          <Route exact path='/user/register/success' component={RegisterSuccess} />
        </main>
      </Router>

      <button onClick={goToTop} id='topButton' className='btn btn-light' title='Go To Top'>
      <i className="bi bi-arrow-up-circle-fill"></i>
      </button>
    </Context.Provider>
  )
}

export default App