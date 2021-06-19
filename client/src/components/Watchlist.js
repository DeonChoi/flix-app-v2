import React, {useEffect, useContext} from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'
import '../styles/Search.css';
import {Context} from '../Context'

const Watchlist = () => {

    const {watchlist, setWatchlist} = useContext(Context);

    useEffect( () => {
        getWatchlist();
    }, [])

    
    const getWatchlist = async (e) => {
        // setFetching(true);
        let headers;
        if (localStorage.getItem('google-auth-token')) {
            headers = {
                headers: {
                    'google-auth-token': localStorage.getItem('google-auth-token'),
                    'email' : localStorage.getItem('google-email')
                }
            };
        };
        await axios.get(`http://localhost:5000/watchlist/get`, headers)
            .then(res => {
                console.log(res)
                console.log('Flix Retrieved')
                const restructuredData = res.data.map(
                    ({ 
                        backdropPath, date, flixID, homepage, overview, posterPath, releaseDate, runtime, title, userID, voteAverage, voteCount, __v, _id
                    }) => ({
                        backdrop_path: backdropPath, date, id: flixID, homepage, overview, poster_path: posterPath, release_date: releaseDate, runtime, title, userID, vote_average: voteAverage, vote_count: voteCount, __v, _id
                     })
                  );
                console.log(restructuredData)
                setWatchlist(restructuredData)
                // setFetching(false)
            })
            .catch(err => console.log(err))

    }

    return (
        <>            
            <div style={{'marginTop':'10vh'}}></div>
            <div className='movie-info-card-container'>
                
                {watchlist.length > 0
                ? watchlist.map( flix => 
                    <MovieCard homeMovie={flix} key={flix.id}></MovieCard>    
                )
                : <h3>No Results Found</h3>   
                }
            </div>
        </>
    )
}

export default Watchlist
