
export default class BlogService {
  apiBase = 'https://api.realworld.io/api/';

  async getResourcesTemplate(url, methodUrl = 'GET', bodyUrl) {
    const localUser = localStorage.getItem('user');
    let token = '';
    if (localUser) {
      // eslint-disable-next-line prefer-destructuring
      token = JSON.parse(localUser).token;
    }
    console.log(token);
    const res = await fetch(`${this.apiBase}${url}`, {
      method: methodUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(bodyUrl),
    });
    return res;
  }

  async getUserArticles(page = 1) {
    console.log('getUserArticles');
    const res = await this.getResourcesTemplate(`articles?limit=5&offset=${(page - 1) * 5}`, 'GET');
    const response = await res.json();
    return response;
  }

  async registration(userData) {
    console.log('registration');
    const res = await this.getResourcesTemplate('users', 'POST', { user: userData });
    console.log(res);
    const response = await res.json();
    return response;
  }

  async authentication(userData) {
    console.log('authentication');
    const res = await this.getResourcesTemplate('users/login', 'POST', { user: userData });
    const response = await res.json();
    console.log(response);
    return response;
  }


  async fetchUpdateArticle(slug, articleData) {
    console.log('authentication');
    const res = await this.getResourcesTemplate(`articles/${slug}`, 'POST', { article: articleData });
    const response = await res.json();
    return response;
  }

  async createArticle(articleData) {
    console.log('createArticle');
    // eslint-disable-next-line max-len
    const res = await this.getResourcesTemplate('articles', 'POST', { article: articleData });
    const response = await res.json();
    return response.article;
  }

  async editUser(userData) {
    const res = await this.getResourcesTemplate('user', 'PUT', { user: userData });
    console.log(res);
    const response = await res.json();
    console.log(response);
    return response;
  }


  async fetchDeleteArticle(slug) {
    const res = await this.getResourcesTemplate(`articles/${slug}`, 'DELETE');
    return res;
  }

  async getArticle(slug) {
    const res = await this.getResourcesTemplate(`articles/${slug}`, 'GET');
    const response = await res.json();
    return response;
  }

  async setFavorite(slug) {
    const res = await this.getResourcesTemplate(`articles/${slug}/favorite`, 'POST');
    const response = await res.json();
    return response;
  }

  async setUnFavorite(slug) {
    const res = await this.getResourcesTemplate(`articles/${slug}/favorite`, 'DELETE');
    const response = await res.json();
    return response;
  }
}
