import React from 'react';
import './MovieList.css';

import MovieCard from '../MovieCard';

function MovieList({ movieData, loading }) {
  const elements = movieData.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="movie-card">
        <MovieCard itemProps={itemProps} loading={loading} />
      </li>
    );
  });
  return <ul className="movie-list">{elements}</ul>;
}

export default MovieList;
