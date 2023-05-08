import React from 'react';
import { Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";

import './App.css';

function App() {
  return (
    <Routes>
      <Route index element={<MovieList />} />
      <Route path=":id" element={<MovieDetails />} />
    </Routes >
  );
}

export default App;
