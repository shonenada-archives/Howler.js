import Vue from 'vue';

const urls = {
  accountInfo: 'https://api.dropboxapi.com/1/account/info',
  listFiles: 'https://api.dropboxapi.com/1/metadata/auto/',
  loadFile: 'https://content.dropboxapi.com/1/files/auto/Howler.md',
  uploadContent: 'https://content.dropboxapi.com/1/files_put/auto/Howler.md',
};

let defaultSuccess = function(resp) {
  console.log('Query success:', resp);
}

let defaultError = function(resp) {
  console.log('Query Fail:', resp);
}

class APIService {

  constructor() {
    this.access_token = 'fake';
  }

  getAccountInfo(success=defaultSuccess, error=defaultError) {
    Vue.http.get(urls.accountInfo, {}, {
      headers: { 'Authorization': `Bearer ${this.access_token}` }, 
    }).then(success, error);
  }

  listFiles(success=defaultSuccess, error=defaultError) {
    Vue.http.get(urls.listFiles, {}, {
      headers: { 'Authorization': `Bearer ${this.access_token}` }, 
    }).then(success, error);
  }

  loadFile(success=defaultSuccess, error=defaultError) {
    Vue.http.get(urls.loadFile, {}, {
      headers: { 'Authorization': `Bearer ${this.access_token}` },
    }).then(success, error);
  }

  uploadFile(data, success=defaultSuccess, error=defaultError) {
    Vue.http.post(urls.uploadContent, data, {
      headers: { 'Authorization': `Bearer ${this.access_token}` }, 
      params: {
        overwrite: true,
      },
    }).then(success, error);
  }

}

let API = new APIService();

export default API;
