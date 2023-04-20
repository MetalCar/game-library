import axios from 'axios';
import config from '../../config';

export type AccessToken = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

const options = config;

class Api {
  static instance: Api | null = null;
  private hasValidAccessToken: boolean = false;
  private accessToken: string | null = null;
  private apicalypseOptions: object | null = null;

  constructor() {
    this.init();
  }

  static getInstance(): Api {
    if (Api.instance === null) {
      Api.instance = new Api();
    }

    return Api.instance;
  }

  public async init() {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', options);

    if (response.status === 200) {
      this.hasValidAccessToken = true;
      this.accessToken = response.data.access_token;
      this.apicalypseOptions = {
        method: 'post',
        baseURL: 'https://api.igdb.com/v4',
        headers: {
          'Client-ID': options.client_id,
          Authorization: 'Bearer ' + this.accessToken,
        },
        responseType: 'json',
      };
    } else {
      this.accessToken = null;
      this.hasValidAccessToken = false;
    }
  }

  get Options(): object | null {
    if (this.hasValidAccessToken) {
      return this.apicalypseOptions;
    } else {
      return null;
    }
  }
}

export default Api;
