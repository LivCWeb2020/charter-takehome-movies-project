import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/movieService';
import '../styles/MovieList.css';

export interface Movie {
    id: string;
    title: string;
    genres: string[];
}

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

    // Filter movies by either 'All' or specific genre
    const [genre, setGenre] = useState<string>('All');
    const filteredMovies = genre === 'All' ? movies : movies.filter(movie => movie.genres.includes(genre));
    const genres = Array.from(
        new Set(movies.flatMap(movie => movie.genres))
    );

    return (
        <div className="container">
            <div className="menu">
                <h1 className="title">Movie List</h1>
                <select className="dropdown" value={genre} onChange={e => setGenre(e.target.value)}>
                    <option value="All">All</option>
                    {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>
            </div>
            <div className="grid">
                {filteredMovies.map(movie => (
                    <div key={movie.id} className="card">
                        <img src={getImageUrl(movie.id)} alt={movie.title} className="card__image" />
                        <p className="card__title" >{movie.title}</p>
                    </div>
                ))
                }
            </div>
        </div>
    );
}