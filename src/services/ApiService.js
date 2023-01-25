export default class ApiService {
  apiBase = 'https://api.themoviedb.org/3/search/movie';

  apiKey = '439a7710468ec69dc87797e7847da69b';

  query = 'return';

  async getItems() {
    const res = await fetch(`${this.apiBase}?api_key=${this.apiKey}&query=${this.query}`);
    if (!res.ok) {
      console.log('Server status: ', res.status);
      return new Error('Server is unavailable');
    }
    const body = await res.json();
    return body.results;
  }
}

// export default class ApiService {
//   rootPath = 'https://api.themoviedb.org/';

//   apiKey = '8936db45338f26fbdfd93025a7eada3c';

//   async getResources(fragment) {
//     const apiBase = `${this.rootPath}3/search/movie?api_key=${this.apiKey}`;
//     const response = await fetch(`${apiBase}${fragment}`);

//     if (!response.ok) {
//       throw new Error(`Could not fetch ${this.rootPath}, received ${response.status}`);
//     }

//     const body = await response.json();

//     if (body.results.length === 0) {
//       throw new Error();
//     }
//     console.log(body.results);
//     return body.results;
//   }
// }
