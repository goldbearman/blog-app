export default class BlogService {
  apiBase = 'https://api.realworld.io/api/';

  async getResources(url, page = 1) {
    const res = await fetch(`${this.apiBase}${url}?limit=5&offset=${page * 5}`);
    if (!res.ok) {
      throw new Error('Bad response from server');
    }
    const response = await res.json();
    return response;
  }

  async getArticle(slug) {
    const res = await this.getResources(`articles/${slug}`);
    return res;
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

  async fetchDeleteArticle(slug, token) {
    const res = await fetch(`${this.apiBase}articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
    return res;
  }

  async fetchUpdateArticle(slug, token, articleData) {
    const res = await fetch(`${this.apiBase}articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: articleData }),
    });
    return res;
  }

  async createArticle(articleData, token) {
    const res = await fetch(`${this.apiBase}articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset = utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: articleData }),
    });
    const responseBody = await res.json();
    return responseBody.article;
  }


  async getUserArticles(page = 1, token) {
    let res;
    if (token) {
      res = await fetch(`${this.apiBase}articles?limit=5&offset=${(page - 1) * 5}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset = utf-8',
          Authorization: `Token ${token}`,
        },
      });
    } else res = await fetch(`${this.apiBase}articles?limit=5&offset=${(page - 1) * 5}`);
    const responseBody = await res.json();
    return responseBody;
  }

  async editUser(userData, token) {
    const res = await fetch(`${this.apiBase}user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ user: userData }),
    });
    if (!res.ok) {
      throw new Error(res.json().errors);
    }
    const responseBody = await res.json();
    return responseBody;
  }

  async setFavorite(slug, token) {
    const res = await fetch(`${this.apiBase}articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error('Bad response from server');
    }
    return res;
  }

  async setUnFavorite(slug, token) {
    const res = await fetch(`${this.apiBase}articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error('Bad response from server');
    }
    return res;
  }
}
