import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly http: HttpClient
  ) { }

  async exitByToken(token: string) {
    const url = `${environment.apiBaseUrl}/api/users/exit/${token}`;
    const result = await this.http.post(url, {}).toPromise();
    return result;
  }

  async getTokenByCode(code: string) {
    // Посылаем на сервер vk-code, в ответ придёт токен
    const url = `${environment.apiBaseUrl}/api/login/${code}`;
    const token = await this.http.get(url).toPromise();
    return token;
  }

  async getGraphBySmth(depth: number, graph: object) {
    const token = localStorage.getItem('token');
    const url = `${environment.apiBaseUrl}/api/graph/${depth}/${token}`;
    const result = await this.http.post(url, graph).toPromise();
    return result;
  }

  async loadUserByToken(token: string) {
    const url = `${environment.apiBaseUrl}/api/users/${token}`;
    const user = await this.http.get(url).toPromise();
    return user;
  }

  async sendToServer(token: string, userJson: object) {
    const url = `${environment.apiBaseUrl}/api/users/${token}`;
    const resp = await this.http.post(url, userJson).toPromise();
    return resp;
  }
}
