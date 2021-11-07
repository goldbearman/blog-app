export default class BlogService {
  apiBase = 'https://api.realworld.io/api/';

  // eslint-disable-next-line consistent-return,no-unused-vars
  async getResources(url, page = 1) {
    const res = await fetch(`${this.apiBase}${url}?limit=5&offset=${page * 5}`);
    if (!res.ok) {
      throw new Error('Bad response from server');
    }
    return res.json();
  }

  async getAllArticles(page) {
    const res = await this.getResources('articles', page);
    // eslint-disable-next-line no-console
    console.log(res);
    return res;
  }

  async getArticle(slug) {
    const res = await this.getResources(`articles/${slug}`);
    // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
    console.log(responseBody);
    return responseBody;
  }

  async editUser(userData, token) {
    const res = await fetch(`${this.apiBase}users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Autorizaton: `Token ${token}`,
      },
      body: JSON.stringify({ user: userData }),
    });
    if (!res.ok) {
      throw new Error(res.json().errors);
    }
    const responseBody = res.json();
    // eslint-disable-next-line no-console
    console.log(responseBody);
    return responseBody;
  }
}
