import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Person } from '../models/person';
import { Product } from '../models/product';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  readonly url: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.url}/peoples`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
