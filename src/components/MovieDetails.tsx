import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMovieDetails } from "../services/movieService";
import '../styles/MovieDetails.css';
import { IoChevronBackCircle } from "react-icons/io5";
import { FaCalendar, FaClock, FaSpinner } from "react-icons/fa";

type Props = {};

interface MovieDetails {
    id: string;
    title: string;
    description: string;
    genres: string[];
    duration: number;
    releaseDate: string;
    releaseYear: number;
    topCast: Cast[];
    moods: string[];
}

interface Cast {
    name: string;
    characterName: string;
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

    // Get image by id
    const [imageUrl, setImageUrl] = useState<string>();
    useEffect(() => {
        try {
            setImageUrl(require(`../images/${id}.jpeg`));
        } catch (error) {
            setImageUrl(require('../images/defaultImage.jpeg'));
        }
    }, [id]);

    return (
        <>
            <Link to="/" className="back-button">
                <IoChevronBackCircle />
            </Link>

            <div className="movie-details">
                <div className="movie-details__info" >
                    <img src={imageUrl} alt={movie.title} className="movie-details__image" />
                    {
                        movie.title && (
                            <div className="movie-details__content">
                                <h1 className="movie-details__title">{movie.title}</h1>

                                <div className="movie-details__genres">
                                    {movie.genres?.map(genre => (
                                        <span key={genre} className="movie-details__genre">{genre}</span>
                                    ))}

                                    <div className="movie-details__flex-wrapper">
                                        <div className="movie-details__duration">
                                            <FaClock />
                                            <span className="movie-details__duration-text">{movie.duration / 60} min</span>
                                        </div>
                                        <div className="movie-details__release-date">
                                            <FaCalendar />
                                            <span className="movie-details__release-date-text">{movie.releaseYear}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </>
    );
}