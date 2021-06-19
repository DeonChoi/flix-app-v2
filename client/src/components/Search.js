import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'
import '../styles/Search.css';
import Logo from '../images/pix-logo-2.png'
import {Context} from '../Context'
import { useHistory,useParams } from 'react-router-dom';

const Search = () => {
    let { searchTerm } = useParams();
    const [searchResults, setSearchResults] = useState([])
    const {lastSearch, setLastSearch} = useContext(Context);
    const {API_KEY} = useContext(Context);


    let history = useHistory();
 //pagination
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState();
    useEffect( () => {
        getDefault();
    }, [history.location])


    // const handleSearch = (e) => {
    //     setSearch(e.target.value);
    //     setLastSearch(search)
    // };
    const getSearch = async (e) => {
        
        // e.preventDefault();
        history.push(`/search/${lastSearch}`)
        // window.location.refresh()
    };


    
    const getDefault = async (e) => {

        // await axios.all([
            await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage}`)
        //     await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=2`)
        // ])
            .then(
                // axios.spread((...responses) => {
                //     console.log([...responses[0].data.results, ...responses[1].data.results])
                    // setSearchResults([...responses[0].data.results, ...responses[1].data.results])
                // })
                data => {
                    console.log(data.data)
                    setTotalPages(data.data.total_pages)
                    setSearchResults([...searchResults,...data.data.results])
                }
            )
            .catch(err => console.log(err))

    }
    const loadMore = async (e) => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
            await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage+1}`)
            .then(
                data => {
                    console.log(data.data)
                    setTotalPages(data.data.total_pages)
                    setSearchResults([...searchResults,...data.data.results])
                }
            )
            .catch(err => console.log(err))
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
                {/* <button type="filter" class="btn btn-light">
                    <i class="bi bi-filter"></i>
                </button> */}
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search"  onChange={e => setLastSearch(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-light">
                    <i className="bi bi-search"></i>
                </button>
                
            </form>
            
            <div className='movie-info-card-container'>
                {searchResults.length > 0
                ? searchResults.map( searchMovie => 
                    <MovieCard homeMovie={searchMovie} key={searchMovie.id}></MovieCard>    
                )
                : <h3>No Results Found</h3>   
                }
            </div>
            { currentPage < totalPages
            ? <div className="load-more-container"><button className='load-more' onClick={loadMore}>Load More</button></div>
            : null
            }
            
        </>
    )
}

export default Search
