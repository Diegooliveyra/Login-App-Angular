import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly url: string = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user);
  }

  credentials(credential: {
    name: string;
    password: string;
  }): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, credential);
  }
}
