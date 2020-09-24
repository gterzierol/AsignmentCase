export class Request {
  constructor(url) {
    this.url = url;
  }

  //app.js içerisinde içerisine gönderdiğimiz URL ile gerkli isteği gerçekleitiriyoruz.
  async get() {
    const response = await fetch(this.url);
    const responseData = await response.json();
    return responseData
  }
}
