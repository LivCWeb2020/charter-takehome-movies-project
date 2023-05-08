import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import { getMovieDetails } from '../services/movieService';

// Mock the getMovieDetails function
jest.mock('../services/movieService');

const mockedGetMovieDetails = getMovieDetails as jest.MockedFunction<typeof getMovieDetails>;

const movieDetails: MovieDetails = {
    id: "1",
    title: "Test Movie",
    description: "Test Description",
    genres: ["Action", "Adventure"],
    duration: 120,
    releaseDate: "2021-01-01",
    releaseYear: 2021,
    topCast: [{ name: "Test Actor", characterName: "Test Character" }],
    moods: ["Test Mood"],
};

describe('MovieDetails', () => {
    beforeEach(() => {
        mockedGetMovieDetails.mockResolvedValue(movieDetails);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(<Router><MovieDetails /></Router>);
    });

    test('displays movie details correctly', async () => {
        render(<Router><MovieDetails /></Router>);

        // Wait for the loading spinner to be removed
        await waitForElementToBeRemoved(screen.getByTestId('spinner'));

        // Wait for the movie details to be fetched
        await waitFor(() => expect(mockedGetMovieDetails).toHaveBeenCalledTimes(1));

        // Assert that the movie details are rendered correctly
        expect(screen.getByText(movieDetails.title)).toBeInTheDocument();
        expect(screen.getByText(movieDetails.description)).toBeInTheDocument();
    });
});