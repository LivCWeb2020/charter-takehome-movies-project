import React from 'react';
import { Link, useParams } from 'react-router-dom';

type Props = {};

export default function MovieDetails({ }: Props) {
    // Get movie ID from React Router params
    const { id } = useParams();

    return (
        <div>
            <h2>
                Movie ID: {id}
            </h2>
            <button>
                <Link to="/">Go Back</Link>
            </button>
        </div>
    );
}