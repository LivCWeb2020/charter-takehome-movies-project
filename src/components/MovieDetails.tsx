import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMovieDetails } from "../services/movieService";

type Props = {};

interface MovieDetails {
    id: string;
    title: string;
    genres: string[];
    duration: number;
    releaseDate: string;
    releaseYear: number;
    topCast: string[];
    moods: string[];
}

export default function MovieDetails({ }: Props) {
    // Get movie ID from React Router params
    const { id } = useParams();

    // Fetch movie details from API
    const [movie, setMovie] = useState<MovieDetails>({} as MovieDetails);
    useEffect(() => {
        const fetchData = async () => {
            const movie = await getMovieDetails(id || '');
            setMovie(movie);
            console.log(movie)
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>
                Movie ID: {movie.id}
            </h2>
            <button>
                <Link to="/">Go Back</Link>
            </button>
        </div>
    );
}