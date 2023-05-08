import axios from 'axios';

export interface Movie {
    id: string;
    title: string;
    genres: string[];
}

export interface MovieDetails {
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


async function getMovies(): Promise<Movie[]> {
    try {
        const response = await axios.get('https://code-challenge.spectrumtoolbox.com/api/movies' || '', {
            headers: {
                'Authorization': 'Api-Key q3MNxtfep8Gt'

            }
        });
        return response.data.data;
    } catch (error) {
        return [];
    }
}
// async function getMovies(): Promise<Movie[]> {
//     try {
//         const response = await axios.get(process.env.REACT_APP_API_URL as string, {
//             headers: {
//                 'Authorization': process.env.REACT_APP_API_KEY
//             }
//         });
//         return response.data.data;
//     } catch (error) {
//         return [];
//     }
// }

// async function getMovieDetails(id: String): Promise<MovieDetails> {
//     try {
//         const response = await axios.get(process.env.REACT_APP_API_URL + `/${id}`, {
//             headers: {
//                 'Authorization': process.env.REACT_APP_API_KEY
//             }
//         });
//         return response.data.data;
//     } catch (error) {
//         return {} as MovieDetails;
//     }
// }

async function getMovieDetails(id: String): Promise<MovieDetails> {
    try {
        const response = await axios.get("https://code-challenge.spectrumtoolbox.com/api/movies" + `/${id}` || '', {
            headers: {
                'Authorization': 'Api-Key q3MNxtfep8Gt'
            }
        });
        return response.data.data;
    } catch (error) {
        return {} as MovieDetails;
    }
}






export { getMovies, getMovieDetails };