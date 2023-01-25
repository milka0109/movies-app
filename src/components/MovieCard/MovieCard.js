import React from 'react';
// import format from 'date-fns/format';

import './MovieCard.css';
// import poster from '../../img/DefaultPoster.jpg';

export default class MovieCard extends React.Component {
  render() {
    const { itemProps } = this.props;

    return (
      <div className="movie-card">
        <div className="movie-poster">
          <img src={itemProps.poster} alt="Movie Poster" className="movie-poster__img" />
        </div>
        <div className="movie-data">
          <h2 className="movie-data__title">{itemProps.title}</h2>
          <span className="movie-data__realese-date">{itemProps.releaseDate}</span>
          <ul className="movie-data__tags">
            <li className="movie-data__tag">Action</li>
            <li className="movie-data__tag">Drama</li>
          </ul>
          <p className="movie-data__description">{itemProps.description}</p>
        </div>
      </div>
    );
  }
}