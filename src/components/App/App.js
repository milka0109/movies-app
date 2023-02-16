import React from 'react';
import { Spin, Pagination, Tabs } from 'antd';
import { Online, Offline } from 'react-detect-offline';
import { debounce } from 'lodash';

import ApiService from '../../services/ApiService';
import { GenresProvider } from '../GenresContext/GenresContext';
import './App.css';
import MovieList from '../MovieList';
import SearchBar from '../SearchBar';
import AlertError from '../AlertError/AlertError';

export default class App extends React.Component {
  urlPosters = 'https://image.tmdb.org/t/p/original/';

  apiService = new ApiService();

  constructor() {
    super();
    this.state = {
      movieData: [],
      error: false,
      errorMessage: null,
      sessionId: null,
      currentPage: 1,
      totalMovies: null,
      genres: [],
    };
  }

  debouncedSearch = debounce((query, page) => {
    this.createMovieList(query, page);
  }, 1000);

  componentDidMount() {
    this.apiService
      .newGuestSession()
      .then((object) => {
        this.setState({ sessionId: object.guest_session_id });
      })
      .catch((error) => this.onError(error));
    this.apiService
      .getGenres()
      .then((genres) => {
        this.setState({
          genres: genres.genres,
        });
        console.log(genres.genres);
      })
      .catch((e) => this.onError(e));
    const { query, currentPage } = this.state;
    this.debouncedSearch(query, currentPage);
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, currentPage } = this.state;
    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      this.clearList();
      this.debouncedSearch(query, currentPage);
    }
  }

  clearList = () => {
    this.setState({ movieData: [] });
  };

  onLabelChange = (evt) => {
    const { value } = evt.target;
    this.setState({
      query: value,
      loading: true,
      error: false,
    });
  };

  onError(error) {
    this.setState({
      loading: false,
      error: true,
      errorMessage: error.message,
    });
  }

  onPagination = (page) => {
    this.setState({
      currentPage: page,
      loading: true,
    });
  };

  createMovieList(query, page) {
    this.apiService
      .getItems(query, page)
      .then((list) => {
        this.setState({
          totalMovies: list.total_results,
        });
        list.results.forEach((item) => {
          this.setState(({ movieData }) => ({
            movieData: [
              ...movieData,
              {
                id: item.id,
                title: item.original_title,
                releaseDate: item.release_date,
                genresId: item.genre_ids,
                description: item.overview,
                filmRating: item.vote_average,
                poster: `${this.urlPosters}${item.poster_path}`,
              },
            ],
            loading: false,
            error: false,
          }));
          console.log(item.genre_ids);
        });
      })
      .catch(this.onError);
  }

  render() {
    const { movieData, loading, error, query, errorMessage, totalMovies } = this.state;
    const hadData = !(loading || error);
    const loader = loading ? <Spin tip="Loading" size="large" className="loading" /> : null;
    const pagination = hadData ? (
      <Pagination
        defaultCurrent={1}
        pageSize={20}
        showSizeChanger={false}
        total={totalMovies}
        onChange={this.onPagination}
        totalMovies={totalMovies}
      />
    ) : null;
    const items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <div className="container">
            <SearchBar query={query} onLabelChange={this.onLabelChange} />
            <main className="main">
              {loader}
              {error ? <AlertError errorMessage={errorMessage} /> : null}
              <MovieList movieData={movieData} loading={loading} />
              {pagination}
            </main>
          </div>
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: <MovieList movieData={movieData} loading={loading} />,
      },
    ];
    return (
      <section className="movies-app">
        <GenresProvider value={this.state.genres}>
          <Offline>You're currently offline. Please check your connection.</Offline>
          <Online>
            <Tabs defaultActiveKey="1" items={items} centered="true" />
          </Online>
        </GenresProvider>
      </section>
    );
  }
}
