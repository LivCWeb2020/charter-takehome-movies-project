import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/movieService';

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
        <div>
            <h1>Movie List</h1>
            {movies.map(movie => (
                <div key={movie.id}>
                    <h2>{movie.title}</h2>
                    <ul>
                        {movie.genres.map(genre => (
                            <li key={genre}>{genre}</li>
                        ))}
                    </ul>
                    <img src={getImageUrl(movie.id)} alt={movie.title} />
                </div>
            ))
            }
        </div>
    );
}