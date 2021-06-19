import React, {useContext} from 'react'
import '../styles/MovieCard.css';
import {Link} from 'react-router-dom'
import stockPoster from '../images/stock_poster_path2.jpg'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import {Context} from '../Context'

const MovieCard = ({homeMovie}) => {
    const {watchlist, setWatchlist} = useContext(Context);

    let location = useLocation();
    let isWatchlist = location.pathname==='/watchlist'

    const deleteFlix = async (id) => {
        let headers;
        if (localStorage.getItem('google-auth-token')) {
            headers = {
                headers: {
                    'google-auth-token': localStorage.getItem('google-auth-token'),
                    'email' : localStorage.getItem('google-email')
                }
            };
        };
        await axios.delete('http://localhost:5000/watchlist/' + id, headers)
            .then(res => {
                // console.log(res)
                console.log('Flix Deleted')
                setWatchlist( watchlist.filter( flix => flix.id !== id));
                // showDeleteImageModal()
            })
            .catch(err => console.log(err))
    };

    return (
        <div className="movie-info-card">
            <Link to={`/movie/${homeMovie.id}`}>
                <img src={homeMovie.poster_path ? 'https://image.tmdb.org/t/p/original' + homeMovie.poster_path : stockPoster} alt={homeMovie.title} />
                
            </Link>
            {
                    isWatchlist
                    ? <button onClick={() => deleteFlix(homeMovie.id)}><i class="bi bi-x-circle-fill"></i></button>
                    : null
                }
        </div>
    )
}

export default MovieCard