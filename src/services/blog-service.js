export default class BlogService {
  apiBase = 'https://api.realworld.io/api/';

  // eslint-disable-next-line consistent-return,no-unused-vars
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
    console.log(res);
    return res;
  }

  async registration(userData) {
    const res = await fetch(`${this.apiBase}users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userData }),
    });
    const responseBody = res.json();
    console.log(responseBody);
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
    console.log(responseBody);
    return responseBody;
  }

  async fetchDeleteArticle(slug, token) {
    console.log(token);
    console.log(slug);
    const res = await fetch(`${this.apiBase}articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
    // if (!res.ok) {
    //   throw new Error(res.json().errors);
    // }
    // eslint-disable-next-line no-console
    console.log(res);
    return res;
  }

  async fetchUpdateArticle(slug, token, articleData) {
    console.log(token);
    console.log(slug);
    const res = await fetch(`${this.apiBase}articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: articleData }),
    });
    // if (!res.ok) {
    //   throw new Error(res.json().errors);
    // }
    // eslint-disable-next-line no-console
    console.log(res);
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
    // eslint-disable-next-line no-console
    console.log(responseBody.article);
    return responseBody.article;
  }


  async getUserArticles(page = 1, token) {
    console.log(token);
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
    // eslint-disable-next-line no-console
    console.log(responseBody);
    return responseBody;
  }

  async editUser(userData, token) {
    console.log(userData);
    console.log(token);
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
    // eslint-disable-next-line no-console
    console.log(responseBody);
    return responseBody;
  }
}
