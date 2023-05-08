import React from 'react';
import { Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";

import './App.css';

function App() {
  return (
    <Routes>
      <Route index element={<MovieList />} />
    </Routes >
  );
}

export default App;
