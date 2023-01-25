import React from 'react';

import ApiService from '../../services/ApiService';
import './App.css';
import MovieList from '../MovieList';

export default class App extends React.Component {
  urlPosters = 'https://image.tmdb.org/t/p/original/';

  apiService = new ApiService();

  constructor() {
    super();
    this.state = {
      movieData: [],
    };
  }

  componentDidMount() {
    this.createMovieList();
  }

  createMovieList() {
    this.apiService.getItems().then((list) => {
      list.forEach((item) => {
        this.setState((state) => {
          const { movieData } = state;
          return {
            movieData: [
              ...movieData,
              {
                id: item.id,
                title: item.original_title,
                releaseDate: item.release_date,
                tags: 'tags',
                description: 'Some description',
                filmRating: item.vote_average,
                poster: `${this.urlPosters}${item.poster_path}`,
              },
            ],
            loading: false,
          };
        });
      });
    });
  }

  render() {
    const { movieData } = this.state;
    console.log(movieData);
    return (
      <section className="movies-app">
        <MovieList movieData={movieData} />
      </section>
    );
  }
}
