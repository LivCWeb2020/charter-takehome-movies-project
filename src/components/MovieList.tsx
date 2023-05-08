import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/movieService';
import '../styles/MovieList.css';

export interface Movie {
    id: string;
    title: string;
    genres: string[];
}

export default function MovieList() {
    const [movies, setMovies] = useState([] as Movie[]);
    useEffect(() => {
        const fetchData = async () => {
            const movies = await getMovies();
            console.log(movies)
            setMovies(movies);
        };
        fetchData();
    }, []);

    function getImageUrl(id: string): string {
        try {
            return require(`../images/${id}.jpeg`);
        } catch (error) {
            return require('../images/defaultImage.jpeg');
        }
    }

    return (
        <div className="container">
            <h1 className="title">Movie List</h1>
            <div className="grid">
                {movies.map(movie => (
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