import React from 'react';
import { Spin } from 'antd';
import format from 'date-fns/format';

import './MovieCard.css';
import shortenDescription from '../../services/shortenDescription';

export default class MovieCard extends React.Component {
  render() {
    const { itemProps, loading } = this.props;
    const loader = loading ? <Spin tip="Loading" size="large" className="loading" /> : null;

    return (
      <div className="movie-card">
        {loader}
        <div className="movie-poster">
          <img src={itemProps.poster} alt="Movie Poster" className="movie-poster__img" />
        </div>
        <div className="movie-data">
          <h2 className="movie-data__title">{itemProps.title}</h2>
          <span className="movie-data__realese-date">
            {format(new Date(Date.parse(itemProps.releaseDate)), 'MMMM d, yyyy')}
          </span>
          <ul className="movie-data__tags">
            <li className="movie-data__tag">Action</li>
            <li className="movie-data__tag">Drama</li>
          </ul>
          <p className="movie-data__description">{shortenDescription(itemProps.description)}</p>
        </div>
      </div>
    );
  }
}
