import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'
import '../styles/Home.css';
import Logo from '../images/pix-logo-2.png'
import {Context} from '../Context'
import { useHistory } from 'react-router-dom';

const Home = () => {
    const [homeMovies, setHomeMovies] = useState([])
    const [search, setSearch] = useState('')
    const {lastSearch, setLastSearch} = useContext(Context);
    const {API_KEY} = useContext(Context);

    let history = useHistory();

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    // const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect( () => {
        getDefault();
        // window.addEventListener('scroll', function() {
        //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        //         loadMore();
        //         console.log("you're at the bottom of the page!!");
               
        //     }
        //  });
    }, [])


    // const handleSearch = (e) => {
    //     // setSearch(e.target.value);
    //     setLastSearch(e.target.value)
    // };
    const getSearch = async (e) => {
        
        e.preventDefault();
        history.push(`/search/${lastSearch}`)
    };

    

    
    const getDefault = async (e) => {

        // await axios.all([
        //     await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`),
        //     await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=2`)
        // ])
        //     .then(
        //         axios.spread((...responses) => {
        //             console.log([...responses[0].data.results, ...responses[1].data.results])
        //             setHomeMovies([...responses[0].data.results, ...responses[1].data.results])
        //         })
        //     )
        //     .catch(err => console.log(err))

        await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${currentPage}`)
            .then(
                data => {
                    console.log(data.data)
                    setTotalPages(data.data.total_pages)
                    setHomeMovies([...homeMovies,...data.data.results])
                }
            )
            .catch(err => console.log(err))
    }
    const loadMore = async (e) => {
        if (currentPage <= totalPages) {
            setCurrentPage(currentPage + 1)
            await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${currentPage+1}`)
            .then(
                data => {
                    console.log(data.data)
                    // setTotalPages(data.data.total_pages)
                    setHomeMovies([...homeMovies,...data.data.results])
                }
            )
            .catch(err => console.log(err))
        }

    }

    const handleScroll = (e) => {
        const target = e.target
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
            alert('bottom!')
        }

    }

    return (
        <>
            <div className='home-header'>
                <div className=''>
                    <img src={Logo} alt='Site Logo' className='siteLogo' />
                </div>
                <div className=''>
                    <h1 className=''>flix</h1>
                    <p className=''>find the latest flix</p>
                </div>
            </div>
            <form className='search-form' onSubmit={getSearch}>
                {/* <button type="filter" className="btn btn-light">
                    <i className="bi bi-filter"></i>
                </button> */}
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search" onChange={e => setLastSearch(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-light">
                    <i className="bi bi-search"></i>
                </button>
                
            </form>
            
            <div className='movie-info-card-container' onScroll={handleScroll}>
                {homeMovies 
                ? homeMovies.map( homeMovie => 
                    <MovieCard homeMovie={homeMovie} key={homeMovie.id}></MovieCard>    
                )
                : <div>No Results Found</div>   
                }
            </div>

            { currentPage < totalPages
            ? <div className="load-more-container"><button className='load-more' onClick={loadMore}>Load More</button></div>
            : null
            }
        </>
    )
}

export default Home
