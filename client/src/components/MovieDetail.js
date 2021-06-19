import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import '../styles/MovieDetail.css';
import {Context} from '../Context'
import stockPoster from '../images/stock_poster_path2.jpg'
import stockBackdrop from '../images/stock_backdrop_path.jpg'

const MovieDetail = () => {
    let { id } = useParams();
    const [currentMovie, setCurrentMovie] = useState()
    const [movieBackgroundImage, setMovieBackgroundImage] = useState('')
    const [moviePosterImage, setMoviePosterImage] = useState('')

    const movieDetailStyles = {
        backgroundImage: `url(${movieBackgroundImage})`,
    }

    useEffect( () => {
        getMovieInfo()
    },[])
    const {API_KEY} = useContext(Context);

    const getMovieInfo = async () => {
        await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
            .then(data => {
                console.log(data.data)
                setCurrentMovie(data.data)
                setMovieBackgroundImage(data.data.backdrop_path ? 'https://image.tmdb.org/t/p/original' + data.data.backdrop_path : stockBackdrop)
                // setMoviePosterImage('https://image.tmdb.org/t/p/original' + data.data.poster_path)
            })
            .catch(err => console.log(err))
    }

    const saveFlix = async (e) => {
        e.preventDefault();

        if (localStorage.getItem('google-auth-token') === null) {
            // setSaveModalMessage('Login to save flix to watchlist')
            // showImageSaveModal();
            return;
        } else {
            const newFlix = {
                    flixID: currentMovie.id,
                    // userID: userID //server will search for userID based on email in request header and add to the object being saved
                    overview: currentMovie.overview,
                    title: currentMovie.title,
                    voteAverage: currentMovie.vote_average,
                    voteCount: currentMovie.vote_count,
                    runtime: currentMovie.runtime,
                    releaseDate: currentMovie.release_date,
                    homepage: currentMovie.homepage,
                    posterPath: currentMovie.poster_path,
                    backdropPath: currentMovie.backdrop_path,
                    date: new Date()
            };

            let headers;
            if (localStorage.getItem('google-auth-token')) {
                headers = {
                    headers: {
                        'google-auth-token': localStorage.getItem('google-auth-token'),
                        'email' : localStorage.getItem('google-email')
                    }
                };
            };

            await axios.post(`http://localhost:5000/watchlist/add`, newFlix, headers)
                .then(res => {
                    console.log(res)
                    console.log('Flix Saved')
                    // setSaveModalMessage(res.data)
                    // showImageSaveModal()
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            {currentMovie
            ?<div className='movie-detail-container'>
                <div className='movie-detail-background' style={movieDetailStyles}></div>
                <div className='movie-details'>
                    <img className='movie-detail-poster' src={currentMovie.poster_path ? 'https://image.tmdb.org/t/p/original' +currentMovie.poster_path : stockPoster} alt={currentMovie.title}></img>
                    <div className='movie-detail-info'>
                        <h1>{currentMovie.title}</h1>
                        <h4>{currentMovie.overview}</h4>
                        <div style={{'display':'flex', 'alignItems':'center'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 20 20">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            &nbsp;
                            {currentMovie.vote_average}
                        </div>
                        <div style={{'display':'flex', 'alignItems':'center'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 20 20">
                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                            </svg>
                            &nbsp;
                            {currentMovie.vote_count}
                        </div>
                        <div style={{'display':'flex', 'alignItems':'center'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-clock-fill" viewBox="0 0 20 20">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            </svg>
                            &nbsp;
                            {currentMovie.runtime} min
                        </div>
                        <div style={{'display':'flex', 'alignItems':'center'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-calendar3-event-fill" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2h16a2 2 0 0 0-2-2H2zM0 14V3h16v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm12-8a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"/>
                            </svg>
                            &nbsp;
                            {currentMovie.release_date}
                        </div>
                        <div className='movie-detail-buttons'>
                            {currentMovie.homePage !== null
                            ? <a target="_blank" rel="noreferrer" href={currentMovie.homepage}><button type="button" className="btn btn-light">Learn More</button></a>
                            : null
                            }
                            <button type="button" className="btn btn-light" onClick={saveFlix}>Add to Watchlist</button>
                        </div>
                    </div>
                </div>
            </div>
            : null
            }
        
        </>
        
    )
}

export default MovieDetail
