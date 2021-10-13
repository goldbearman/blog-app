export default class BlogService {
  apiBase = 'https://conduit.productionready.io/api/';

  // eslint-disable-next-line consistent-return
  async getResources(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok) {
      throw new Error('Bad response from server');
    }
    return res.json();
  }

  // async getId() {
  //   const searchIdJson = await this.getResources('/search');
  //   const { searchId } = searchIdJson;
  //   return searchId;
  // }

  async getAllArticles() {
    const res = await this.getResources('articles');
    // eslint-disable-next-line no-console
    console.log(res.articles);
    return res.articles;
  }

  async registration(userData) {
    const res = await fetch(`${this.apiBase}users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userData }),
    });
    const responseBody = res.json();
    // eslint-disable-next-line no-console
    console.log(responseBody);
    return responseBody;
  }
}
