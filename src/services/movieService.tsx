import axios from 'axios';

export interface Movie {
  id: string;
  title: string;
  genres: string[];
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

export { getMovies };