import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud.service';
import { User } from '../../models/core.models';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends CrudService<User> {
  constructor(protected override http: HttpClient) {
    super(http, 'users');
  }
}
