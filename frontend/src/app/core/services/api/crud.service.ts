import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CrudService<T> {
  protected baseUrl = environment.apiUrl;

  constructor(
    protected http: HttpClient,
    @Inject('ENDPOINT') protected endpoint: string
  ) {}

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}`);
  }

  findOne(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${this.endpoint}/${id}`);
  }

  create(data: Partial<T>): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${this.endpoint}`, data);
  }

  update(id: number | string, data: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${this.endpoint}/${id}`, data);
  }

  remove(id: number | string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${this.endpoint}/${id}`);
  }
}
