import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getMovies } from '../services/movieService';
import '../styles/MovieList.css';
import { AiFillCloseCircle, AiOutlineSearch } from 'react-icons/ai';
import { FaSpinner } from "react-icons/fa";


export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const movies = await getMovies();
            console.log(movies)
            setMovies(movies);
        };
        fetchData();
    }, []);

    //Get image by ID
    function getImageUrl(id: string): string {
        try {
            return require(`../images/${id}.jpeg`);
        } catch (error) {
            return require('../images/defaultImage.jpeg');
        }
    }

    // Set genre
    const [genre, setGenre] = useState<string>('All');
    const genres = Array.from(
        new Set(movies.flatMap(movie => movie.genres))
    );

    // Filter movies by search
    const [search, setSearch] = useState<string>('');
    const filteredMovies = movies.filter(movie => {
        if (genre === 'All') {
            return movie.title.toLowerCase().includes(search.trim().toLowerCase());
        } else {
            return movie.genres.includes(genre) && movie.title.toLowerCase().includes(search.trim().toLowerCase());
        }
    });

    return (
        <div className="container">
            <div className="menu">
                <h1 className="title">Movie List</h1>
                <div className="menu__utils">
                    {/* Search bar */}
                    <div className="search">
                        <input
                            type="text"
                            className="search__input"
                            placeholder="Search..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />

                        {/* Clear search */}
                        {search.length > 0 ?
                            <AiFillCloseCircle className="search__clear" onClick={() => setSearch('')} />
                            :
                            <AiOutlineSearch className="search__icon" />
                        }
                    </div>


                    {/* Genre dropdown */}
                    <select className="dropdown" value={genre} onChange={e => setGenre(e.target.value)}>
                        <option value="All">All</option>
                        {genres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid">
                {filteredMovies.length > 0 ?
                    filteredMovies.map(movie => (
                        <Link to={`/${movie.id}`} key={movie.id} className="card">
                            <img src={getImageUrl(movie.id)} alt={movie.title} className="card__image" />
                            <p className="card__title" >{movie.title}</p>
                        </Link>
                    )) : movies.length ? <p>No results found..</p> : <FaSpinner className="animate-spin" />
                }
            </div>
        </div>
    );
}