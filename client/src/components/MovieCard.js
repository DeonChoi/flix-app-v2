import React, {useContext, useEffect, useState} from 'react'
import '../styles/MovieCard.css';
import {Link} from 'react-router-dom'
import stockPoster from '../images/stock_poster_path2.jpg'

const MovieCard = ({homeMovie}) => {
    return (
        <Link to={`/movie/${homeMovie.id}`} className="movie-info-card">
            <img src={homeMovie.poster_path ? 'https://image.tmdb.org/t/p/original' + homeMovie.poster_path : stockPoster} alt={homeMovie.title} />
            {/* <div>{homeMovie.title}</div> */}
        </Link>
    )
}

export default MovieCard