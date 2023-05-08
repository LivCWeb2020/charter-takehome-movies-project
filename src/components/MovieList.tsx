import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from "react-router-dom";
import { getMovies } from '../services/movieService';
import '../styles/MovieList.css';
import { AiFillCloseCircle, AiOutlineSearch } from 'react-icons/ai';
import { FaSpinner } from "react-icons/fa";
import { getHeroImage } from "../utils/getImageUrl";


export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const movies = await getMovies();
            if (movies.length === 0) {
                setError('Sorry, something went wrong. Please try again later.');
            }
            setMovies(movies);
        };
        fetchData();
    }, []);

    // Set genre
    const [genre, setGenre] = useState<string>('All');
    const genres = Array.from(
        new Set(movies.flatMap(movie => movie.genres))
    );

    // Memoize filteredMovies
    const [search, setSearch] = useState<string>('');
    const filteredMovies = useMemo(() => {
        return movies.filter(movie => {
            if (genre === 'All') {
                return movie.title.toLowerCase().includes(search.trim().toLowerCase());
            } else {
                return movie.genres.includes(genre) && movie.title.toLowerCase().includes(search.trim().toLowerCase());
            }
        });
    }, [movies, genre, search]);

    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [moviesPerPage] = useState<number>(15);

    // Get current movies
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    // Change page
    const paginate = useCallback((pageNumber: number) => setCurrentPage(pageNumber), []);

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
                            onChange={e => {
                                paginate(1);
                                setSearch(e.target.value);
                            }}
                        />

                        {/* Clear search */}
                        {search.length > 0 ?
                            <AiFillCloseCircle className="search__clear" onClick={() => {
                                paginate(1);
                                setSearch('');
                            }} />
                            :
                            <AiOutlineSearch className="search__icon" />
                        }
                    </div>

                    {/* Genre dropdown */}
                    <select className="dropdown" value={genre} onChange={e => {
                        paginate(1);
                        setGenre(e.target.value);
                    }}>
                        <option value="All">All</option>
                        {genres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid">
                {filteredMovies.length > 0 ?
                    currentMovies.map(movie => (
                        <Link to={`/${movie.id}`} key={movie.id} className="card">
                            <img src={getHeroImage(movie.id)} alt={movie.title} className="card__image" />
                            <p className="card__title" >{movie.title}</p>
                        </Link>
                    ))
                    :
                    (<p className="message">
                        {/* Display errors or loading spinner */}
                        {movies.length ? "No results found.."
                            : error ? error : <FaSpinner className="animate-spin" />}
                    </p>
                    )
                }
            </div>

            {/* Pagination */}
            <div className="pagination">
                {movies.length > 0 && (
                    <ul className="pagination__list">
                        {Array.from({ length: Math.ceil(filteredMovies.length / moviesPerPage) }, (_, i) => i + 1).map(number => (
                            <li key={number} className="pagination__item"
                            >
                                <button
                                    className={
                                        `pagination__link ${number === currentPage ? 'selected' : ''}`
                                    }
                                    onClick={() => paginate(number)}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div >

    );
}