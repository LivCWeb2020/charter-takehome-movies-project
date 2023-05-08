import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { getMovies } from '../services/movieService';
import MovieList from './MovieList';
import { act } from "react-dom/test-utils";

// Mock the getMovieDetails function
jest.mock('../services/movieService');

const mockedGetMovies = getMovies as jest.MockedFunction<typeof getMovies>;

const movies = [
    {
        id: "1",
        title: 'The Flinstones',
        genres: ['Comedy', 'Family']
    },
    {
        id: "2",
        title: 'The Lion King',
        genres: ['Animation', 'Adventure', 'Drama']
    }
];

describe('MovieList', () => {
    beforeEach(() => {
        mockedGetMovies.mockResolvedValue(movies);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', async () => {
        await act(async () => {
            render(<Router><MovieList /></Router>);
        });
    });

    test('renders movies correctly', async () => {
        await act(async () => {
            render(<Router><MovieList /></Router>);
        });

        // Wait for the movies to be fetched
        await waitFor(() => expect(mockedGetMovies).toHaveBeenCalledTimes(1));

        // Assert that the movies are rendered correctly
        expect(screen.getByText(movies[0].title)).toBeInTheDocument();
        expect(screen.getByText(movies[1].title)).toBeInTheDocument();
    });


    test('displays an error message if there are no movies', async () => {
        await act(async () => {
            render(<Router><MovieList /></Router>);
            await mockedGetMovies.mockResolvedValue([]);
        });

        await waitFor(() => {
            expect(screen.getByText('Sorry, something went wrong. Please try again later.')).toBeInTheDocument();
        });
    });
});