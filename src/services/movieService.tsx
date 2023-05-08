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
        const response = await axios.get('https://movies-api1.herokuapp.com/api/movies' || '', {
            headers: {
                'Authorization': 'Api-Key q3MNxtfep8Gt'
            }
        });

        return response.data.data;
    } catch (error) {
        return [];
    }
}

async function getMovieDetails(id: String): Promise<MovieDetails> {
    try {
        const response = await axios.get("https://movies-api1.herokuapp.com/api/movies" + `/${id}` || '', {
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