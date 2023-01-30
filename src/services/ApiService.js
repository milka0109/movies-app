export default class ApiService {
  apiBase = 'https://api.themoviedb.org/3/search/movie';

  apiKey = '439a7710468ec69dc87797e7847da69b';

  query = 'return';

  async getItems() {
    const res = await fetch(`${this.apiBase}?api_key=${this.apiKey}&query=${this.query}`);
    if (!res.ok) {
      return new Error('Server is unavailable');
    }
    const body = await res.json();
    return body.results;
  }
}
