class API {
  constructor(){
    this.api = "https://hacker-news.firebaseio.com/v0/"
    this.getHeader = {
      method: 'GET',
        // headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    }
  }

  async get(path){
    const response = await fetch(this.api + path, this.getHeader)
    return await response.json();
  }
}

export default new API()