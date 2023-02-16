export default class ApiService {
  apiBase = 'https://api.themoviedb.org/3/';

  apiKey = '439a7710468ec69dc87797e7847da69b';

  async getItems(query, page) {
    if (query === '') {
      return Error('Поле для ввода пустое');
    }
    try {
      const res = await fetch(`${this.apiBase}search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`);
      if (!res.ok) {
        return new Error('Server is unavailable');
      }
      return await res.json();
    } catch (err) {
      throw Error(err);
    }
  }

  async newGuestSession() {
    try {
      const res = await fetch(`${this.apiBase}authentication/guest_session/new?api_key=${this.apiKey}`);
      if (!res.ok) {
        return new Error('Server is unavailable');
      }
      return await res.json();
    } catch (err) {
      throw Error(err);
    }
  }

  async getGenres() {
    try {
      const res = await fetch(`${this.apiBase}genre/movie/list?api_key=${this.apiKey}&language=en-US`);
      if (!res.ok) {
        throw Error('Server is unavailable');
      }
      return await res.json();
    } catch (err) {
      throw Error(err);
    }
  }
}
