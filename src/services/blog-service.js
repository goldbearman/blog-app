export default class BlogService {
  constructor(token) {
    this.token = token;
  }


  apiBase = 'https://api.realworld.io/api/';

  async getResources(url, page = 1) {
    const res = await fetch(`${this.apiBase}${url}?limit=5&offset=${page * 5}`);
    if (!res.ok) {
      throw new Error('Bad response from server');
    }
    const response = await res.json();
    return response;
  }

  async getUserArticles(page = 1) {
    let res;
    if (this.token) {
      res = await fetch(`${this.apiBase}articles?limit=5&offset=${(page - 1) * 5}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset = utf-8',
          Authorization: `Token ${this.token}`,
        },
      });
    } else res = await fetch(`${this.apiBase}articles?limit=5&offset=${(page - 1) * 5}`);
    const responseBody = await res.json();
    return responseBody;
  }

  async registration(userData) {
    const res = await fetch(`${this.apiBase}users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userData }),
    });
    const responseBody = res.json();
    return responseBody;
  }

  async authentication(userData) {
    const res = await fetch(`${this.apiBase}users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userData }),
    });
    if (!res.ok) {
      throw new Error('Email or password is invalid');
    }
    const responseBody = res.json();
    return responseBody;
  }


  async fetchUpdateArticle(slug, articleData) {
    const res = await fetch(`${this.apiBase}articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${this.token}`,
      },
      body: JSON.stringify({ article: articleData }),
    });
    return res;
  }

  async createArticle(articleData) {
    console.log(this.token);
    const res = await fetch(`${this.apiBase}articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset = utf-8',
        Authorization: `Token ${this.token}`,
      },
      body: JSON.stringify({ article: articleData }),
    });
    const responseBody = await res.json();
    return responseBody.article;
  }

  async editUser(userData) {
    const res = await fetch(`${this.apiBase}user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${this.token}`,
      },
      body: JSON.stringify({ user: userData }),
    });
    if (!res.ok) {
      throw new Error('Bad response from server');
    }
    const responseBody = await res.json();
    return responseBody;
  }


  async fetchDeleteArticle(slug) {
    const res = await fetch(`${this.apiBase}articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${this.token}`,
      },
    });
    return res;
  }

  async fetchTemplateSlugToken(slug, token, url, methodBlog) {
    let objToken;
    if (token) {
      objToken = {
        method: methodBlog,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${token}`,
        },
      };
    }
    const res = await fetch(`${this.apiBase}${url}`, objToken);
    const responseBody = await res.json();
    return responseBody;
  }

  async getArticle(slug) {
    return this.fetchTemplateSlugToken(slug, this.token, `articles/${slug}`, 'GET');
  }

  async setFavorite(slug) {
    return this.fetchTemplateSlugToken(slug, this.token, `articles/${slug}/favorite`, 'POST');
  }

  async setUnFavorite(slug) {
    return this.fetchTemplateSlugToken(slug, this.token, `articles/${slug}/favorite`, 'DELETE');
  }
}
