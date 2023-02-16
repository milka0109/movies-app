import React from 'react';
import './Genres.css';

export default class Genres extends React.Component {
  state = {};

  componentDidMount() {
    this.updateGenreList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.genresId !== prevProps.genresId) {
      this.updateGenreList();
    }
  }

  updateGenreList = () => {
    const { genresId } = this.props;
    const genreNames = this.getGenreNames(genresId);
    const genreList = genreNames.map((el) => (
      <ul className="movie-data__genres" key={el.id}>
        <li className="movie-data__genre">{el.name}</li>
      </ul>
    ));
    this.setState({
      genreList,
    });
  };

  getGenreNames = (genresId) => {
    const genreNames = genresId.map((id) => this.getGenreName(id));
    return genreNames;
  };

  getGenreName = (id) => {
    const { genres } = this.props;
    let name;
    genres.forEach((genre) => {
      if (genre.id === id) {
        name = {
          name: genre.name,
          id: genre.id,
        };
      }
    });
    return name;
  };

  render() {
    return <div>{this.state.genreList}</div>;
  }
}
