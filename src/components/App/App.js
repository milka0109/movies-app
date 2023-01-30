import React from 'react';
import { Spin, Alert } from 'antd';
import { Online, Offline } from 'react-detect-offline';

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
      error: false,
      errorMessage: null,
    };
  }

  componentDidMount() {
    this.createMovieList();
  }

  onError(err) {
    console.error('onError:', err);
    this.setState({
      loading: false,
      error: true,
      errorMessage: err.message,
    });
  }

  createMovieList() {
    this.apiService
      .getItems()
      .then((list) => {
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
                  description: item.overview,
                  filmRating: item.vote_average,
                  poster: `${this.urlPosters}${item.poster_path}`,
                },
              ],
              loading: false,
            };
          });
        });
      })
      .catch(this.onError);
  }

  render() {
    const { movieData, loading, error } = this.state;
    const loader = loading ? <Spin tip="Loading" size="large" className="loading" /> : null;
    const alertError = error ? (
      <Alert
        message="Error"
        description={this.state.errorMessage}
        type="error"
        showIcon="true"
        className="alert-error"
      />
    ) : null;
    return (
      <section className="movies-app">
        <Offline>You're currently offline. Please check your connection.</Offline>
        <Online>
          {loader}
          {alertError}
          <MovieList movieData={movieData} loading={loading} />
        </Online>
      </section>
    );
  }
}
