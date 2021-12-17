export default class BlogService {
  apiBase = 'https://api.realworld.io/api/';

  async getResourcesTemplateJson(url, methodUrl = 'GET', bodyUrl) {
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
    const response = await res.json();
    return response;
  }

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

  // async getUserArticles(page = 1) {
  // eslint-disable-next-line max-len
  //   const res = await this.getResourcesTemplateJson(`articles?limit=5&offset=${(page - 1) * 5}`, 'GET');
  //   const response = await res.json();
  //   return response;
  // }

  // async registration(userData) {
  //   const res = await this.getResourcesTemplateJson('users', 'POST', { user: userData });
  //   const response = await res.json();
  //   return response;
  // }

  // async authentication(userData) {
  //   const res = await this.getResourcesTemplateJson('users/login', 'POST', { user: userData });
  //   const response = await res.json();
  //   return response;
  // }

  // async editUser(userData) {
  //   const res = await this.getResourcesTemplateJson('user', 'PUT', { user: userData });
  //   const response = await res.json();
  //   return response;
  // }
  //
  // async fetchUpdateArticle(slug, articleData) {
  // eslint-disable-next-line max-len
  //   const res = await this.getResourcesTemplateJson(`articles/${slug}`, 'POST', { article: articleData });
  //   const response = await res.json();
  //   return response;
  // }

  // async createArticle(articleData) {
  // eslint-disable-next-line max-len
  //   const res = await this.getResourcesTemplateJson('articles', 'POST', { article: articleData });
  //   const response = await res.json();
  //   return response.article;
  // }

  // async fetchDeleteArticle(slug) {
  //   const res = await this.getResourcesTemplateJson(`articles/${slug}`, 'DELETE');
  //   return res;
  // }

  // async getArticle(slug) {
  //   const res = await this.getResourcesTemplateJson(`articles/${slug}`, 'GET');
  //   const response = await res.json();
  //   return response;
  // }

  // async setFavorite(slug) {
  //   const res = await this.getResourcesTemplateJson(`articles/${slug}/favorite`, 'POST');
  //   const response = await res.json();
  //   return response;
  // }
  //
  // async setUnFavorite(slug) {
  //   const res = await this.getResourcesTemplateJson(`articles/${slug}/favorite`, 'DELETE');
  //   const response = await res.json();
  //   return response;
  // }
}
