export default class BlogService {
  apiBase = 'https://api.realworld.io/api/';

  async getResourcesTemplate(url, methodUrl = 'GET', bodyUrl) {
    const localUser = localStorage.getItem('user');
    let tokenBlog = '';
    if (localUser) {
      const { token } = JSON.parse(localUser);
      tokenBlog = token;
    }
    const res = await fetch(`${this.apiBase}${url}`, {
      method: methodUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${tokenBlog}`,
      },
      body: JSON.stringify(bodyUrl),
    });
    return res;
  }

  async getUserArticles(page = 1) {
    const res = await this.getResourcesTemplate(`articles?limit=5&offset=${(page - 1) * 5}`, 'GET');
    const response = await res.json();
    return response;
  }

  async registration(userData) {
    const res = await this.getResourcesTemplate('users', 'POST', { user: userData });
    const response = await res.json();
    return response;
  }

  async authentication(userData) {
    const res = await this.getResourcesTemplate('users/login', 'POST', { user: userData });
    const response = await res.json();
    return response;
  }


  async fetchUpdateArticle(slug, articleData) {
    const res = await this.getResourcesTemplate(`articles/${slug}`, 'POST', { article: articleData });
    const response = await res.json();
    return response;
  }

  async createArticle(articleData) {
    const res = await this.getResourcesTemplate('articles', 'POST', { article: articleData });
    const response = await res.json();
    return response.article;
  }

  async editUser(userData) {
    const res = await this.getResourcesTemplate('user', 'PUT', { user: userData });
    const response = await res.json();
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
