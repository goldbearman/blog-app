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
    //   headers: {
    //     'Content-Type': 'application/json; charset = utf-8',
    //     Authorization: `Token ${this.token}`,
    //   },
    // if (!res.ok) {
    //   throw new Error('Bad response from server');
    // }
    return res;
  }

  async getUserArticles(page = 1) {
    console.log('getUserArticles');
    const res = await this.getResourcesTemplate(`articles?limit=5&offset=${(page - 1) * 5}`, 'GET');
    const response = await res.json();
    return response;


    // let res;
    // if (this.token) {
    //   res = await fetch(`${this.apiBase}articles?limit=5&offset=${(page - 1) * 5}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json; charset = utf-8',
    //       Authorization: `Token ${this.token}`,
    //     },
    //   });
    // } else res = await fetch(`${this.apiBase}articles?limit=5&offset=${(page - 1) * 5}`);
    // const responseBody = await res.json();
    // return responseBody;
  }

  async registration(userData) {
    console.log('registration');
    const res = await this.getResourcesTemplate('users', 'POST', { user: userData });
    console.log(res);
    const response = await res.json();
    return response;
    // const res = await fetch(`${this.apiBase}users`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ user: userData }),
    // });
    // const responseBody = res.json();
    // return responseBody;
  }

  async authentication(userData) {
    console.log('authentication');
    const res = await this.getResourcesTemplate('users/login', 'POST', { user: userData });
    const response = await res.json();
    console.log(response);
    return response;
    // const res = await fetch(`${this.apiBase}users/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ user: userData }),
    // });
    // if (!res.ok) {
    //   throw new Error('Email or password is invalid');
    // }
    // const responseBody = res.json();
    // return responseBody;
  }


  async fetchUpdateArticle(slug, articleData) {
    console.log('authentication');
    const res = await this.getResourcesTemplate(`articles/${slug}`, 'POST', { article: articleData });
    const response = await res.json();
    return response;
    // const res = await fetch(`${this.apiBase}articles/${slug}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json; charset=utf-8',
    //     Authorization: `Token ${this.token}`,
    //   },
    //   body: JSON.stringify({ article: articleData }),
    // });
    // return res;
  }

  async createArticle(articleData) {
    console.log('createArticle');
    // eslint-disable-next-line max-len
    const res = await this.getResourcesTemplate('articles', 'POST', { article: articleData });
    const response = await res.json();
    return response.article;
    // console.log(this.token);
    // const res = await fetch(`${this.apiBase}articles`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json; charset = utf-8',
    //     Authorization: `Token ${this.token}`,
    //   },
    //   body: JSON.stringify({ article: articleData }),
    // });
    // const responseBody = await res.json();
    // return responseBody.article;
  }

  async editUser(userData) {
    const res = await this.getResourcesTemplate('user', 'PUT', { user: userData });
    const response = await res.json();
    return response;
    // const res = await fetch(`${this.apiBase}user`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json; charset=utf-8',
    //     Authorization: `Token ${this.token}`,
    //   },
    //   body: JSON.stringify({ user: userData }),
    // });
    // if (!res.ok) {
    //   throw new Error('Bad response from server');
    // }
    // const responseBody = await res.json();
    // return responseBody;
  }


  async fetchDeleteArticle(slug) {
    const res = await this.getResourcesTemplate(`articles/${slug}`, 'DELETE');
    // const response = await res.json();
    return res;
    // const res = await fetch(`${this.apiBase}articles/${slug}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json; charset=utf-8',
    //     Authorization: `Token ${this.token}`,
    //   },
    // });
    // return res;
  }

  // async fetchTemplateSlugToken(slug, token, url, methodBlog) {
  //   let objToken;
  //   if (token) {
  //     objToken = {
  //       method: methodBlog,
  //       headers: {
  //         'Content-Type': 'application/json; charset=utf-8',
  //         Authorization: `Token ${token}`,
  //       },
  //     };
  //   }
  //   const res = await fetch(`${this.apiBase}${url}`, objToken);
  //   const responseBody = await res.json();
  //   return responseBody;
  // }

  async getArticle(slug) {
    const res = await this.getResourcesTemplate(`articles/${slug}`, 'GET');
    const response = await res.json();
    return response;
    // return this.fetchTemplateSlugToken(slug, this.token, `articles/${slug}`, 'GET');
  }

  async setFavorite(slug) {
    // return this.fetchTemplateSlugToken(slug, this.token, `articles/${slug}/favorite`, 'POST');
    const res = await this.getResourcesTemplate(`articles/${slug}/favorite`, 'POST');
    const response = await res.json();
    return response;
  }

  async setUnFavorite(slug) {
    // return this.fetchTemplateSlugToken(slug, this.token, `articles/${slug}/favorite`, 'DELETE');
    const res = await this.getResourcesTemplate(`articles/${slug}/favorite`, 'DELETE');
    const response = await res.json();
    return response;
  }
}
